"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <div>Not signed in</div>
        <button onClick={() => signIn()}>Login</button>
      </>
    );
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Protected content</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
