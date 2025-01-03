"use server";

import { HttpSession } from "@/types/session";
import { http } from "@/lib/http";
import { Session } from "next-auth";

type GetLovedSongsResponse = {
  total: number;
};

type GetLovedSongs = (session: Session) => Promise<GetLovedSongsResponse>;

export const getLovedSongs: GetLovedSongs = async (session) => {
  return await http.get<GetLovedSongsResponse>(
    `https://api.spotify.com/v1/me/tracks`,
    session as HttpSession,
  );
};
