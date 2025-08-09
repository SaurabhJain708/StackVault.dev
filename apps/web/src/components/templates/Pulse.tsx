import { UserProfile } from "@repo/types";

export default function PulseTemplate({ data }: { data: UserProfile }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Pulse Template</h1>
    </div>
  );
}
