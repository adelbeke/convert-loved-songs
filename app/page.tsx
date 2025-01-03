"use client";
import { useSession, signIn } from "next-auth/react";
import { ToPlaylist } from "@/features/songs/ToPlaylist";

export default function Home() {
  const { data, status } = useSession();

  if (status !== "authenticated") {
    return (
      <>
        <div>Not signed in</div>
        <button onClick={() => signIn()}>Login</button>
      </>
    );
  }

  return <ToPlaylist session={data} />;
}
