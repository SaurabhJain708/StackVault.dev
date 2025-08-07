import { useGetUser } from "@/lib/query/user";
import { motion } from "framer-motion";

export default function Header() {
  const { data: userData } = useGetUser();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md py-4 px-8 flex justify-between items-center border-b border-gray-800 shadow-lg"
    >
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
        StackVault
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-400 text-sm hidden sm:block">
          Welcome, {userData?.name.split(" ")[0]}
        </span>
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold">
          {userData?.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")}
        </div>
      </div>
    </motion.header>
  );
}
