import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

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

const updateTemplate = async (templateId: string) => {
  const response = await axios.post(`/api/private/updateTemplate`, {
    templateId,
  });
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

export const useUpdateTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Template updated!");
    },
    onError: (error: AxiosError) => {
      toast.error(`Failed to update template: ${error.message}`);
    },
  });
};
