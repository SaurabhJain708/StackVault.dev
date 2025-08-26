import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUserByDomain = async (domain: string) => {
  const response = await axios.get(`/api/getuserbydomain?domain=${domain}`);
  return response.data;
};

// HOOKS

export const useGetUserByDomain = (domain: string) => {
  return useQuery({
    queryKey: ["user", domain],
    queryFn: () => getUserByDomain(domain),
    enabled: !!domain,
  });
};
