import { certInput } from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const createCert = async (newCert: certInput) => {
  const response = await axios.post("/api/private/cert", newCert);
  return response.data;
};

const updateCert = async (cert: certInput & { id: string }) => {
  const response = await axios.patch(`/api/private/cert`, { cert });
  return response.data;
};
const deleteCert = async (certId: string) => {
  const response = await axios.delete(`/api/private/cert`, {
    data: { id: certId },
  });
  return response.data;
};

const getCerts = async () => {
  const response = await axios.get(`/api/private/cert`);
  return response.data;
};

export const useCreateCert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certs"] });
    },
  });
};

export const useUpdateCert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certs"] });
    },
  });
};

export const useDeleteCert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certs"] });
    },
  });
};

export const useGetCerts = () => {
  return useQuery({
    queryKey: ["certs"],
    queryFn: getCerts,
  });
};
