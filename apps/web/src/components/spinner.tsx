import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
    </div>
  );
}
