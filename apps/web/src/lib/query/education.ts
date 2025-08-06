import { educationInput } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Create
const createEducation = async (education: educationInput) => {
  const response = await axios.post("/api/private/education", { education });
  return response.data;
};

// Update
const updateEducation = async (education: educationInput & { id: string }) => {
  const response = await axios.patch("/api/private/education", { education });
  return response.data;
};

// Delete
const deleteEducation = async (id: string) => {
  const response = await axios.delete("/api/private/education", {
    data: { id },
  });
  return response.data;
};

// Get all for user
const getEducations = async (userId: string) => {
  const response = await axios.get(`/api/private/education?userid=${userId}`);
  return response.data;
};

export const useCreateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
    },
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
    },
  });
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
    },
  });
};

export const useGetEducations = (userId: string) => {
  return useQuery({
    queryKey: ["educations", userId],
    queryFn: () => getEducations(userId),
    enabled: !!userId, // only run if userId exists
  });
};
