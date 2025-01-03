import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faSignOut, faSpinner } from "@fortawesome/free-solid-svg-icons";

type Props = FontAwesomeIconProps;

export const ICONS = {
  signOut: faSignOut,
  loading: faSpinner,
};

export const Icon = (props: Props) => {
  return <FontAwesomeIcon {...props} />;
};
