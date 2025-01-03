import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

type Props = {
  icon: IconProp;
  color: string;
};

export const ICONS = {
  signOut: faSignOut,
};

export const Icon = ({ icon, color }: Props) => {
  return <FontAwesomeIcon icon={icon} color={color} />;
};
