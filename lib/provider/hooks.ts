import { useQuery } from "@tanstack/react-query";
import { getLovedSongs } from "@/lib/provider/actions";
import { Session } from "next-auth";

type UseCountLovedSongsOptions = {
  session: Session;
};
type UseCountLovedSongs = (options: UseCountLovedSongsOptions) => number;

export const useCountLovedSongs: UseCountLovedSongs = ({ session }) => {
  const { data } = useQuery({
    queryKey: ["count-loved-songs"],
    queryFn: async () => {
      const response = await getLovedSongs({
        session,
        offset: 0,
        limit: 1,
      });

      console.log("response", response);

      return response.total;
    },
  });

  return data ?? 0;
};
