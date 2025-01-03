import { Session } from "next-auth";
import {
  addTracksToPlaylist,
  createPlaylist,
  getLovedSongs,
} from "@/lib/provider/actions";
import { useState } from "react";

type Props = {
  session: Session;
};

export function ToPlaylist({ session }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [totalOfLovedSongs, setTotalOfLovedSongs] = useState<number | null>(
    null,
  );

  const handleGetLovedSongs = async () => {
    try {
      setError(null);
      const response = await getLovedSongs({ session, offset: 0 });
      setTotalOfLovedSongs(response.total);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleCreatePlaylist = async () => {
    try {
      setError(null);
      const { id } = await createPlaylist(session);
      await addTracksToPlaylist({ session, playlistId: id });

      alert("Playlist created");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className={"flex flex-col"}>
      <h1>Home</h1>
      <p>Protected content</p>
      {totalOfLovedSongs !== null && (
        <p>You have {totalOfLovedSongs} loved songs</p>
      )}
      {error && <p className={"text-red-500"}>{error}</p>}
      <button onClick={handleGetLovedSongs}>Get loved songs</button>
      <button onClick={handleCreatePlaylist}>Create playlist</button>
    </div>
  );
}
