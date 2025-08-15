import { create } from "zustand";

type AIState = "idle" | "uploading" | "done" | "error";

interface AIStore {
  aiState: AIState;
  setAIState: (state: AIState) => void;
}

export const useAIStore = create<AIStore>((set) => ({
  aiState: "idle",
  setAIState: (state) => set({ aiState: state }),
}));
