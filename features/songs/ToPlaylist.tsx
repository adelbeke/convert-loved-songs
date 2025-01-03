import { Session } from "next-auth";
import { getLovedSongs } from "@/lib/provider/actions";
import { useState } from "react";

type Props = {
  session: Session;
};

export function ToPlaylist({ session }: Props) {
  const [totalOfLovedSongs, setTotalOfLovedSongs] = useState<number | null>(
    null,
  );

  const handleGetLovedSongs = async () => {
    const response = await getLovedSongs(session);
    setTotalOfLovedSongs(response.total);
  };

  return (
    <div className={"flex flex-col"}>
      <h1>Home</h1>
      <p>Protected content</p>
      {totalOfLovedSongs !== null && (
        <p>You have {totalOfLovedSongs} loved songs</p>
      )}
      <button onClick={handleGetLovedSongs}>Get loved songs</button>
    </div>
  );
}
