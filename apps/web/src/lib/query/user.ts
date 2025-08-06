import { userInput } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// GET
const getUser = async () => {
  const response = await axios.get("/api/private/user");
  return response.data;
};

// UPDATE
const updateUser = async (user: userInput) => {
  const response = await axios.patch("/api/private/user", { user });
  return response.data;
};

// HOOKS

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
