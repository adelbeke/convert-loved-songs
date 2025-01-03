import { Session } from "next-auth";
import {
  addTracksToPlaylist,
  createPlaylist,
  getLovedSongs,
} from "@/lib/provider/actions";
import { useState } from "react";
import { Icon, ICONS } from "@/design-system/components/Icon";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/design-system/components/Button";
import Image from "next/image";
import { signOut } from "next-auth/react";

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

  if (!session.user) {
    return null;
  }

  return (
    <section className={"flex flex-col p-4"}>
      <header className={"flex flex-row items-center justify-between"}>
        <div className={"flex flex-row items-center gap-4"}>
          {session.user?.image && (
            <Image
              src={session.user?.image}
              alt={"User image"}
              height={50}
              width={50}
              className={"rounded-full"}
            />
          )}

          <h1 className={"text-xl font-black"}>{session.user?.name}</h1>
        </div>

        <Button
          className={"w-10 justify-center items-center"}
          onClick={signOut}
        >
          <Icon icon={ICONS.signOut} color={"#1ed760"} />
        </Button>
      </header>
    </section>
  );
}
