import { HttpSession } from "@/types/session";

type Http = {
  get: <T>(url: string, session: HttpSession) => Promise<T>;
  post: <T>(url: string, session: HttpSession, body: unknown) => Promise<T>;
};

export const http: Http = {
  get: async (url: string, session: HttpSession) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token.access_token}`,
      },
    });

    return response.json();
  },
  post: async (url: string, session: HttpSession, body: unknown) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token.access_token}`,
      },
      body: JSON.stringify(body),
    });

    return response.json();
  },
};
