import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const createSkill = async (newSkill: {
  name: string;
  description?: string;
}) => {
  const response = await axios.post("/api/private/skill", newSkill);
  return response.data;
};

export const useCreateSkill = () => {
  return useMutation({
    mutationFn: createSkill,
  });
};
