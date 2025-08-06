// lib/hooks/useEducation.ts

import { educationInput } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

// --- API Functions ---

// Create education
const createEducation = async (education: educationInput) => {
  const response = await axios.post("/api/private/education", { education });
  return response.data;
};

// Update education
const updateEducation = async (education: educationInput) => {
  const response = await axios.patch("/api/private/education", { education });
  return response.data;
};

// Delete education
const deleteEducation = async (id: string) => {
  const response = await axios.delete("/api/private/education", {
    data: { id },
  });
  return response.data;
};

// Get all educations for a user
const getEducations = async (userId: string) => {
  const response = await axios.get(`/api/private/education?userid=${userId}`);
  return response.data;
};

// --- React Query Hooks ---

export const useCreateEducation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations", userId] });
      toast.success("Education added!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Failed to add education: ${error.message}`);
    },
  });
};

export const useUpdateEducation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations", userId] });
      toast.success("Education updated!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Failed to update education: ${error.message}`);
    },
  });
};

export const useDeleteEducation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations", userId] });
      toast.success("Education deleted!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Failed to delete education: ${error.message}`);
    },
  });
};

export const useGetEducations = (userId: string) => {
  return useQuery({
    queryKey: ["educations", userId],
    queryFn: () => getEducations(userId),
    enabled: !!userId,
  });
};
