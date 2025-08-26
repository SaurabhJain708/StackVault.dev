"use client";
import { useGetUser, useLogout } from "@/lib/query/user";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [logout, setLogout] = useState(false);
  const router = useRouter();
  const logouthandler = useLogout();
  const { data: userData } = useGetUser();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md py-4 px-8 flex justify-between items-center border-b border-gray-800 shadow-lg"
    >
      <Link href="/">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          StackVault
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <span className="text-gray-400 text-sm hidden sm:block">
          Welcome, {userData?.name.split(" ")[0]}
        </span>
        <div
          onClick={() => setLogout((prev) => !prev)}
          className="w-10 cursor-pointer h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold"
          onBlur={() => setLogout(false)}
        >
          {userData?.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")}
        </div>
        {logout && (
          <div className="absolute top-16 right-8 bg-white rounded-lg shadow-lg p-4 w-48">
            <p className="text-gray-700 text-sm mb-2">
              Are you sure you want to log out?
            </p>
            <button
              onClick={() => {
                router.push("/");
                setLogout(false);
                logouthandler.mutate();
              }}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </motion.header>
  );
}
