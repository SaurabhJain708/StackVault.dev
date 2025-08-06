// lib/hooks/useEducation.ts

import { educationInput } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// --- API Functions ---

// Create education
const createEducation = async (education: educationInput) => {
  const response = await axios.post("/api/private/education", { education });
  return response.data;
};

// Update education
const updateEducation = async (education: educationInput & { id: string }) => {
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
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: ["educations", userId] });
    },
  });
};

export const useUpdateEducation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEducation,
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: ["educations", userId] });
    },
  });
};

export const useDeleteEducation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: ["educations", userId] });
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
