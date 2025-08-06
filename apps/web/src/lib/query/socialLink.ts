import axios from "axios";
import { socialLinkInput } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Create a social link
const createSocialLink = async (link: socialLinkInput) => {
  const response = await axios.post("/api/private/socialLink", { link });
  return response.data;
};

// Get social links by userId
const getSocialLinks = async (userId: string) => {
  const response = await axios.get(`/api/private/socialLink?userid=${userId}`);
  return response.data;
};

// Delete a social link by ID
const deleteSocialLink = async (id: string) => {
  const response = await axios.delete(`/api/private/socialLink`, {
    data: { id },
  });
  return response.data;
};

// Fetch social links
export const useGetSocialLinks = (userId: string) => {
  return useQuery({
    queryKey: ["socialLinks", userId],
    queryFn: () => getSocialLinks(userId),
    enabled: !!userId, // Avoid fetching with undefined
  });
};

// Create a new social link
export const useCreateSocialLink = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socialLinks", userId] });
    },
  });
};

// Delete a social link
export const useDeleteSocialLink = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSocialLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socialLinks", userId] });
    },
  });
};
