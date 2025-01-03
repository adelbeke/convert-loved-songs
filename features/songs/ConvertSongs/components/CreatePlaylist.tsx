import { Icon, ICONS } from "@/design-system/components/Icon";
import { Button } from "@/design-system/components/Button";
import { useCountLovedSongs } from "@/lib/provider/hooks";
import { Session } from "next-auth";

type Props = {
  session: Session;
  onCreate: () => void;
};

export const CreatePlaylist = ({ session, onCreate }: Props) => {
  const { total, isLoading } = useCountLovedSongs({ session });

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
          <span className={"text-primary font-black"}>{total}</span>
        )}{" "}
        loved songs.
      </p>
      <p>Let&#39;s create a playlist from them!</p>
      <Button
        className={"my-4 font-semibold bg-primary text-background"}
        onClick={onCreate}
      >
        Create playlist
      </Button>
    </>
  );
};
