import { certInput } from "@repo/types";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Create cert
const createCert = async (newCert: certInput) => {
  const response = await axios.post("/api/private/cert", { cert: newCert });
  return response.data;
};

// Update cert
const updateCert = async (cert: certInput) => {
  const response = await axios.patch("/api/private/cert", { cert });
  return response.data;
};

// Delete cert
const deleteCert = async (id: string) => {
  const response = await axios.delete("/api/private/cert", {
    data: { id },
  });
  return response.data;
};

// Get certs
const getCerts = async (userId: string) => {
  const response = await axios.get(`/api/private/cert?userid=${userId}`);
  return response.data;
};

// useQuery to fetch certs
export const useGetCerts = (userId: string) => {
  return useQuery({
    queryKey: ["certs", userId],
    queryFn: () => getCerts(userId),
    enabled: !!userId,
  });
};

// useMutation to create cert
export const useCreateCert = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certs", userId] });
    },
  });
};

// useMutation to update cert
export const useUpdateCert = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certs", userId] });
    },
  });
};

// useMutation to delete cert
export const useDeleteCert = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certs", userId] });
    },
  });
};
