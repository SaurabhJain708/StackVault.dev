// lib/hooks/useProject.ts
import { projectInput } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// CREATE
const createProject = async (project: projectInput) => {
  const response = await axios.post("/api/private/project", { project });
  return response.data;
};

// UPDATE
const updateProject = async (project: projectInput & { id: string }) => {
  const response = await axios.patch("/api/private/project", {
    id: project.id,
    project,
  });
  return response.data;
};

// DELETE
const deleteProject = async (id: string) => {
  const response = await axios.delete("/api/private/project", {
    data: { id },
  });
  return response.data;
};

// GET (for current user or public profile user)
const getProjects = async (userId: string) => {
  const response = await axios.get(`/api/private/project?userid=${userId}`);
  return response.data;
};

// HOOKS

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export const useGetProjects = (userId: string) => {
  return useQuery({
    queryKey: ["project", userId],
    queryFn: () => getProjects(userId),
    enabled: !!userId,
  });
};
