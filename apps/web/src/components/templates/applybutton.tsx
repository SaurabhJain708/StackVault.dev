"use client";

import { useRouter } from "next/navigation";
import { useUpdateTemplate } from "@/lib/query/template";
import { toast } from "sonner";

export default function ApplyButton({ id }: { id: string }) {
  const router = useRouter();
  const updateTemplateMutation = useUpdateTemplate();

  return (
    <button
      onClick={() => {
        updateTemplateMutation.mutate(id, {
          onSuccess: () => {
            router.push("/dashboard/celebration=true");
            toast.success("Template updated!");
          },
        });
      }}
      className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition-all"
    >
      Use This Template
    </button>
  );
}
