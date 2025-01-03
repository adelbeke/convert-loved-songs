import { Session } from "next-auth";
import { Icon, ICONS } from "@/design-system/components/Icon";
import { Button } from "@/design-system/components/Button";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useCountLovedSongs } from "@/lib/provider/hooks";

type Props = {
  session: Session;
};

export function ToPlaylist({ session }: Props) {
  const totalLovedSongs = useCountLovedSongs({ session });

  if (!session.user) {
    return null;
  }

  return (
    <main className={"flex flex-col p-4 min-h-screen"}>
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

      <section
        className={"flex-1 p-4 flex flex-col justify-center items-center"}
      >
        <p>
          You currently have{" "}
          <span className={"text-primary font-black"}>{totalLovedSongs}</span>{" "}
          loved songs.
        </p>
        <p>Let&#39;s create a playlist from them!</p>
        <Button
          className={"my-4 font-semibold bg-primary text-background"}
          onClick={() => {}}
        >
          Create playlist
        </Button>
      </section>
    </main>
  );
}
