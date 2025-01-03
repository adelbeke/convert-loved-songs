import { HttpSession } from "@/types/session";
import { Session } from "next-auth";

type HttpActionOptions = {
  url: string;
  session: Session;
  error: string;
};

type HttpGet = <T>(options: HttpActionOptions) => Promise<T>;
type HttpPost = <T>(
  options: HttpActionOptions & { body: unknown },
) => Promise<T>;

type Http = {
  get: HttpGet;
  post: HttpPost;
};

export const http: Http = {
  get: async ({ url, error, session }) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(session as HttpSession).token.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(error);
    }

    return response.json();
  },
  post: async ({ url, error, session, body }) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(session as HttpSession).token.access_token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(error);
    }

    return response.json();
  },
};
