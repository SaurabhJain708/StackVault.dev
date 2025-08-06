// lib/hooks/useExperience.ts
import { experienceInput } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

// CREATE
const createExperience = async (experience: experienceInput) => {
  const response = await axios.post("/api/private/experience", { experience });
  return response.data;
};

// UPDATE
const updateExperience = async (experience: experienceInput) => {
  const response = await axios.patch("/api/private/experience", {
    id: experience.id,
    experience,
  });
  return response.data;
};

// DELETE
const deleteExperience = async (id: string) => {
  const response = await axios.delete("/api/private/experience", {
    data: { id },
  });
  return response.data;
};

// GET (for current user or public profile user)
const getExperiences = async (userId: string) => {
  const response = await axios.get(`/api/private/experience?userid=${userId}`);
  return response.data;
};

// HOOKS

export const useCreateExperience = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience", userId] });
      toast.success("Experience added!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Failed to add experience: ${error.message}`);
    },
  });
};

export const useUpdateExperience = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience", userId] });
      toast.success("Experience updated!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Failed to update experience: ${error.message}`);
    },
  });
};

export const useDeleteExperience = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience", userId] });
      toast.success("Experience deleted!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Failed to delete experience: ${error.message}`);
    },
  });
};

export const useGetExperiences = (userId: string) => {
  return useQuery({
    queryKey: ["experience", userId],
    queryFn: () => getExperiences(userId),
    enabled: !!userId,
  });
};
