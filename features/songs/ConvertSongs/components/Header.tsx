import Image from "next/image";
import { Button } from "@/design-system/components/Button";
import { signOut } from "next-auth/react";
import { Icon, ICONS } from "@/design-system/components/Icon";

type Props = {
  image?: string | null;
  name?: string | null;
};

export const Header = ({ image, name }: Props) => {
  return (
    <header className={"flex flex-row items-center justify-between"}>
      <div className={"flex flex-row items-center gap-4"}>
        {image && (
          <Image
            src={image}
            alt={"User image"}
            height={50}
            width={50}
            className={"rounded-full"}
          />
        )}

        <h1 className={"text-xl font-black"}>{name}</h1>
      </div>

      <Button className={"w-10 justify-center items-center"} onClick={signOut}>
        <Icon icon={ICONS.signOut} color={"#1ed760"} />
      </Button>
    </header>
  );
};
