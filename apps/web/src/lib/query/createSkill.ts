import axios from "axios";
import { skillInput } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// Create a skill
const createSkill = async (skill: skillInput) => {
  const response = await axios.post("/api/private/skill", { skill });
  return response.data;
};

// Get skills by userId
const getSkills = async (userId: string) => {
  const response = await axios.get(`/api/private/skill?userid=${userId}`);
  return response.data;
};

// Delete a skill by ID
const deleteSkill = async (id: string) => {
  const response = await axios.delete(`/api/private/skill`, {
    data: { id },
  });
  return response.data;
};

// Hook to get skills
export const useGetSkills = (userId: string) => {
  return useQuery({
    queryKey: ["skills", userId],
    queryFn: () => getSkills(userId),
    enabled: !!userId, // Prevent running if userId is undefined
  });
};

// Hook to create skill
export const useCreateSkill = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills", userId] });
    },
  });
};

// Hook to delete skill
export const useDeleteSkill = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills", userId] });
    },
  });
};
