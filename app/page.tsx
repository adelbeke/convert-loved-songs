"use client";
import { useSession } from "next-auth/react";
import { ToPlaylist } from "@/features/songs/ToPlaylist";
import { LoginPage } from "@/features/auth/LoginPage";

export default function Home() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status !== "authenticated") {
    return <LoginPage />;
  }

  return <ToPlaylist session={data} />;
}
