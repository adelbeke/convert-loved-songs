import { useQuery } from "@tanstack/react-query";
import { getLovedSongs } from "@/lib/provider/actions";
import { Session } from "next-auth";

type UseCountLovedSongsOptions = {
  session: Session;
};
type UseCountLovedSongs = (options: UseCountLovedSongsOptions) => {
  total: number;
  isLoading: boolean;
};

export const useCountLovedSongs: UseCountLovedSongs = ({ session }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["count-loved-songs"],
    queryFn: async () => {
      const response = await getLovedSongs({
        session,
        offset: 0,
        limit: 1,
      });

      return response.total;
    },
  });

  return {
    total: data ?? 0,
    isLoading,
  };
};
