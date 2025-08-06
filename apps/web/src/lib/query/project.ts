// lib/hooks/useProject.ts
import { projectInput } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

// CREATE
const createProject = async (project: projectInput) => {
  const response = await axios.post("/api/private/project", { project });
  return response.data;
};

// UPDATE
const updateProject = async (project: projectInput) => {
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

// GET
const getProjects = async (userId: string) => {
  const response = await axios.get(`/api/private/project?userid=${userId}`);
  return response.data;
};

// HOOKS

export const useGetProjects = (userId: string) => {
  return useQuery({
    queryKey: ["projects", userId],
    queryFn: () => getProjects(userId),
    enabled: !!userId,
  });
};

export const useCreateProject = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", userId] });
      toast.success("Project added!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Failed to add project: ${error.message}`);
    },
  });
};

export const useUpdateProject = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", userId] });
      toast.success("Project updated!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Failed to update project: ${error.message}`);
    },
  });
};

export const useDeleteProject = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", userId] });
      toast.success("Project deleted!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Failed to delete project: ${error.message}`);
    },
  });
};
