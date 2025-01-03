import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/design-system/components/Button";

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
      <Button onClick={handleLogin}>
        <Image
          src={"./spotify.svg"}
          height={24}
          width={24}
          alt={"Spotify logo"}
        />
        <span>Sign in with Spotify</span>
      </Button>
    </section>
  );
};
