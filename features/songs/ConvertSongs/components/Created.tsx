type Props = {
  playlistUrl: string | null;
};

export const Created = ({ playlistUrl }: Props) => {
  if (!playlistUrl) return null;

  const url = new URL(playlistUrl);
  url.pathname = url.pathname.replace(/\/intl-\w+\//, "/");

  return (
    <section>
      <p className={"text-xl text-primary font-bold text-center"}>
        Your playlist is ready!
      </p>
      <iframe
        className={"my-4"}
        title="Spotify Web Player"
        src={`https://open.spotify.com/embed${url.pathname}`}
        width={"100%"}
        height={400}
        allow={"encrypted-media"}
        style={{
          borderRadius: 8,
        }}
      />

      <div>
        <p className={"text-sm text-center"}>
          If you can&#39;t see the playlist above, you can access it{" "}
          <a
            href={playlistUrl}
            target={"_blank"}
            className={"underline text-primary"}
          >
            on Spotify
          </a>
        </p>
      </div>

      <p className={"text-sm text-gray-400 text-center mt-4"}>
        Thanks for using <span className={"italic"}>Convert Loved Songs</span>!
      </p>
    </section>
  );
};
