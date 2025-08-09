import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const allTemplates = async () => {
  const response = await axios.get(`/api/template`);
  return response.data;
};
const templateById = async (templateId: string) => {
  const response = await axios.get(
    `/api/templatebyid?templateId=${templateId}`,
  );
  return response.data;
};
export const useGetAllTemplates = () => {
  return useQuery({
    queryKey: ["templates"],
    queryFn: allTemplates,
  });
};

export const useGetTemplateById = (templateId: string) => {
  return useQuery({
    queryKey: ["template", templateId],
    queryFn: () => templateById(templateId),
  });
};
