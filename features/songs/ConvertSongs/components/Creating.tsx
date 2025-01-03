type Props = {
  state: "playlist" | "fill";
};

export const Creating = ({ state }: Props) => {
  return (
    <p>
      {state === "playlist"
        ? "Creating playlist..."
        : "Adding songs to playlist..."}
    </p>
  );
};
