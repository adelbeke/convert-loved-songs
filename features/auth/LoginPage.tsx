import { signIn } from "next-auth/react";
import Image from "next/image";

export const LoginPage = () => {
  const handleLogin = () => {
    signIn();
  };

  return (
    <section
      className={"h-screen w-full p-4 flex justify-center items-start flex-col"}
    >
      <h1 className={"text-5xl font-black text-primary"}>
        Convert Loved Songs
      </h1>
      <p className={"my-2"}>
        Create a playlist from your liked songs on{" "}
        <a target={"_blank"} href={"https://spotify.com"}>
          Spotify
        </a>{" "}
        and{" "}
        <span className={"text-primary font-semibold"}>
          share it with your friends!
        </span>
      </p>
      <button
        className={
          "flex flex-row items-center gap-1 h-10 px-2 rounded-lg bg-transparent shadow-primary shadow-[0_0px_150px_0px_rgba(0,0,0,0.5)] text-sm"
        }
        onClick={handleLogin}
      >
        <Image
          src={"./spotify.svg"}
          height={24}
          width={24}
          alt={"Spotify logo"}
        />
        <span>Sign in with Spotify</span>
      </button>
    </section>
  );
};
