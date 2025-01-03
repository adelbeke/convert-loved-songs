import { Session } from "next-auth";

export type HttpSession = Session & {
  token: {
    access_token: string;
  };
};
