import { domainInput } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

// --- API Functions ---

// Update domain
const updateDomain = async (domain: domainInput) => {
  const response = await axios.patch("/api/private/customDomain", { domain });
  return response.data;
};

// Get domain for a user
const getDomain = async () => {
  const response = await axios.get(`/api/private/customDomain`);
  return response.data;
};

// --- React Query Hooks ---

export const useUpdateDomain = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDomain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domain"] });
      toast.success("Domain updated!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Failed to update domain: ${error.message}`);
    },
  });
};

export const useGetDomains = () => {
  return useQuery({
    queryKey: ["domain"],
    queryFn: () => getDomain(),
  });
};
