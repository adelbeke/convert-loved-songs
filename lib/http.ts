import { HttpSession } from "@/types/session";

type Http = {
  get: <T>(url: string, session: HttpSession) => Promise<T>;
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
};
