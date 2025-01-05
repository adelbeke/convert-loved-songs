"use server";

import { http } from "@/lib/http";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

type RefreshTokenOptions = {
  token: JWT;
};

type RefreshToken = (options: RefreshTokenOptions) => Promise<JWT>;

export const refreshAccessToken: RefreshToken = async ({ token }) => {
  try {
    const basicAuth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
    ).toString("base64");

    console.log("token", {
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    });

    const response = await http.post<{
      access_token: string;
      expires_in: number;
    }>({
      url: "https://accounts.spotify.com/api/token",
      body: {
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      },
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      session: {} as Session,
      error: "Failed to refresh access token",
    });

    return {
      ...token,
      access_token: response.access_token,
      access_token_expires: Date.now() + response.expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
    };
  }
};

type GetLovedSongsOptions = {
  session: Session;
  offset: number;
  limit?: number;
};

type GetLovedSongsResponse = {
  total: number;
  items: Array<{
    track: {
      uri: string;
    };
  }>;
};

type GetLovedSongs = (
  options: GetLovedSongsOptions,
) => Promise<GetLovedSongsResponse>;

export const getLovedSongs: GetLovedSongs = async ({
  session,
  offset,
  limit = 50,
}) => {
  return await http.get<GetLovedSongsResponse>({
    url: `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`,
    session,
    error: "Failed to fetch loved songs",
  });
};

type GetUserResponse = {
  id: string;
};

type GetUser = (session: Session) => Promise<GetUserResponse>;

const getUser: GetUser = async (session) => {
  return await http.get<GetUserResponse>({
    url: `https://api.spotify.com/v1/me`,
    session,
    error: "Failed to fetch user",
  });
};

type CreatePlaylistOptions = {
  session: Session;
  name: string;
};

type CreatePlaylistResponse = {
  id: string;
  external_urls: {
    spotify: string;
  };
};

type CreatePlaylist = (
  options: CreatePlaylistOptions,
) => Promise<CreatePlaylistResponse>;

export const createPlaylist: CreatePlaylist = async ({ session, name }) => {
  const { id } = await getUser(session);

  return await http.post({
    url: `https://api.spotify.com/v1/users/${id}/playlists`,
    session,
    error: "Failed to create playlist",
    body: {
      name,
      description: "A playlist with all your loved songs generated with CLS",
    },
  });
};

type AddTracksToPlaylistOptions = {
  session: Session;
  playlistId: string;
};

type AddTracksToPlaylist = (
  options: AddTracksToPlaylistOptions,
) => Promise<void>;

export const addTracksToPlaylist: AddTracksToPlaylist = async ({
  playlistId,
  session,
}) => {
  const uris = [];
  const { items, total } = await getLovedSongs({ session, offset: 0 });

  for (const { track } of items) {
    uris.push(track.uri);
  }

  for (let offset = 50; offset < total; offset += 50) {
    const { items } = await getLovedSongs({ session, offset });

    for (const { track } of items) {
      uris.push(track.uri);
    }
  }

  const chunks = [];
  for (let i = 0; i < uris.length; i += 100) {
    chunks.push(uris.slice(i, i + 100));
  }

  for (const chunk of chunks) {
    await http.post({
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      session,
      error: "Failed to add tracks to playlist",
      body: { uris: chunk },
    });
  }
};
