import { Icon, ICONS } from "@/design-system/components/Icon";
import { Button } from "@/design-system/components/Button";
import { useCountLovedSongs } from "@/lib/provider/hooks";
import { Session } from "next-auth";
import { Input } from "@/design-system/components/Input";
import { useState } from "react";

type Props = {
  session: Session;
  error: string | null;
  onCreate: (name: string) => void;
};

export const CreatePlaylist = ({ session, error, onCreate }: Props) => {
  const { total, isLoading } = useCountLovedSongs({ session });
  const [nameError, setNameError] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState<string>("Loved songs - CLS");

  const handlePlaylistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (nameError) {
      setNameError(null);
    }
    setPlaylistName(e.target.value);
  };

  const handleCreate = () => {
    setNameError(null);
    if (!playlistName) {
      setNameError("Playlist name is required.");
      return;
    }
    onCreate(playlistName);
  };

  return (
    <>
      <p>
        You currently have{" "}
        {isLoading ? (
          <Icon
            icon={ICONS.loading}
            color={"#1ed760"}
            className={"animate-spin"}
          />
        ) : (
          <span className={"text-base text-primary font-black mb-2"}>
            {total}
          </span>
        )}{" "}
        loved songs.
      </p>
      <p className={"text-sm"}>Let&#39;s create a playlist from them!</p>
      <div className={"p-4 rounded-lg my-4 w-full lg:w-6/12"}>
        <Input
          error={nameError}
          label={"Playlist name (optional)"}
          defaultValue={playlistName}
          onChange={handlePlaylistNameChange}
        />
        <Button
          disabled={isLoading || !playlistName}
          className={
            "my-4 font-semibold bg-primary text-background mx-auto disabled:bg-background disabled:text-white transition-colors"
          }
          onClick={handleCreate}
        >
          Create playlist
        </Button>
        {error && <p className={"text-red-500"}>{error}</p>}
      </div>
    </>
  );
};
