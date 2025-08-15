import { useAIStore } from "@/lib/zustand/aiState";
import { HiOutlineSparkles } from "react-icons/hi";

export default function GenerateWithAiButton({
  onSubmit,
}: {
  onSubmit: () => void;
}) {
  const { aiState } = useAIStore();
  return (
    <button
      type="button"
      onClick={onSubmit}
      className="mt-3 flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 
                     hover:from-purple-700 hover:to-pink-600 active:scale-95 transition-transform duration-150 
                     text-white font-semibold shadow-lg"
    >
      <HiOutlineSparkles className="w-5 h-5 text-yellow-400" />
      {aiState === "idle" && " Generate with AI"}
      {aiState === "uploading" && " Generating..."}
      {aiState === "done" && " Generate with AI"}
      {aiState === "error" && " Generate with AI"}
    </button>
  );
}
