"use client";
import { useSession, signOut } from "next-auth/react";
import { ToPlaylist } from "@/features/songs/ToPlaylist";
import { LoginPage } from "@/features/auth/LoginPage";

export default function Home() {
  const { data, status } = useSession();

  if (status !== "authenticated") {
    return <LoginPage />;
  }

  return (
    <>
      <ToPlaylist session={data} />
      <button onClick={() => signOut()}>SIGNOUT</button>
    </>
  );
}
