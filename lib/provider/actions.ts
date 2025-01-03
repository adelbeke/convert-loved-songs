"use server";

import { HttpSession } from "@/types/session";
import { http } from "@/lib/http";
import { Session } from "next-auth";

type GetLovedSongsOptions = {
  session: Session;
  offset: number;
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

export const getLovedSongs: GetLovedSongs = async ({ session, offset }) => {
  return await http.get<GetLovedSongsResponse>({
    url: `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=50`,
    session: session as HttpSession,
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

type CreatePlaylistResponse = {
  id: string;
};

type CreatePlaylist = (session: Session) => Promise<CreatePlaylistResponse>;

export const createPlaylist: CreatePlaylist = async (session) => {
  const { id } = await getUser(session);

  return await http.post({
    url: `https://api.spotify.com/v1/users/${id}/playlists`,
    session,
    error: "Failed to create playlist",
    body: {
      name: `Loved songs (CLS - ${Intl.DateTimeFormat("fr-FR").format(new Date())})`,
      description: "A playlist with all your loved songs",
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
