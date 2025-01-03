"use client";
import { useSession } from "next-auth/react";
import { ConvertSongs } from "@/features/songs/ConvertSongs/ConvertSongs";
import { LoginPage } from "@/features/auth/LoginPage";
import { LoadingPage } from "@/features/auth/LoadingPage";

export default function Home() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status !== "authenticated") {
    return <LoginPage />;
  }

  return <ConvertSongs session={data} />;
}
