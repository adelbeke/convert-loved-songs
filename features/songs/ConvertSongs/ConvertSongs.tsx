import { Session } from "next-auth";
import { ReactElement, useState } from "react";
import { addTracksToPlaylist, createPlaylist } from "@/lib/provider/actions";
import { Header } from "@/features/songs/ConvertSongs/components/Header";
import { CreatePlaylist } from "@/features/songs/ConvertSongs/components/CreatePlaylist";
import { Creating } from "@/features/songs/ConvertSongs/components/Creating";
import { Created } from "@/features/songs/ConvertSongs/components/Created";
import { Icon, ICONS } from "@/design-system/components/Icon";

type Props = {
  session: Session;
};

export function ConvertSongs({ session }: Props) {
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);
  const [creatingState, setCreatingState] = useState<
    "idle" | "playlist" | "fill" | "done"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleCreatePlaylist = async () => {
    try {
      setCreatingState("playlist");
      const playlist = await createPlaylist({ session });
      setPlaylistUrl(playlist.external_urls.spotify);
      setCreatingState("fill");
      await addTracksToPlaylist({ session, playlistId: playlist.id });

      setCreatingState("done");
    } catch (error) {
      setError((error as Error).message);
      setCreatingState("idle");
    }
  };

  const StateComponent: Record<typeof creatingState, ReactElement | null> = {
    idle: (
      <CreatePlaylist
        session={session}
        error={error}
        onCreate={handleCreatePlaylist}
      />
    ),
    playlist: <Creating state={"playlist"} />,
    fill: <Creating state={"fill"} />,
    done: <Created playlistUrl={playlistUrl} />,
  };

  if (!session.user) {
    return null;
  }

  return (
    <main className={"flex flex-col p-4 min-h-screen"}>
      <Header image={session.user.image} name={session.user.name} />
      <section className={"flex-1 flex flex-col justify-center items-center"}>
        {["playlist", "fill"].includes(creatingState) && (
          <Icon
            icon={ICONS.loading}
            className={"animate-spin mb-4"}
            color={"#1ED760"}
            size={"2xl"}
          />
        )}
        {StateComponent[creatingState]}
      </section>
    </main>
  );
}
