import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getFullUser = async (userId: string) => {
  const response = await axios.get(`/api/public?userid=${userId}`);
  return response.data;
};

export const useGetUserData = (userId: string) => {
  return useQuery({
    queryKey: ["userData", userId],
    queryFn: () => getFullUser(userId),
    refetchOnMount: "always", // always refetch when component mounts
    refetchOnWindowFocus: false, // optional: don't refetch on window focus
    enabled: !!userId, // only run this query if userId is truthy
  });
};
