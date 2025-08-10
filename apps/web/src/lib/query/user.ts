import { userInput } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

// GET
const getUser = async () => {
  const response = await axios.get("/api/private/user");
  return response.data;
};
const getFullUser = async (userId: string) => {
  const response = await axios.get(`/api/public?userid=${userId}`);
  return response.data;
};
// UPDATE
const updateUser = async (user: userInput) => {
  const response = await axios.patch("/api/private/user", { user });
  return response.data;
};

const logout = async () => {
  const response = await axios.get("/api/private/logout", {
    withCredentials: true,
  });
  return response.data;
};

// HOOKS

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout successful");
    },
    onError: (error: AxiosError) => {
      toast.error(`Logout failed: ${error.message}`);
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
export const useGetFullUser = (userId: string) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getFullUser(userId),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User updated!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Failed to update user: ${error.message}`);
    },
  });
};
