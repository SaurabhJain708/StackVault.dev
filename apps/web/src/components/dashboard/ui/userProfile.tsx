import { ModalState } from "@/app/dashboard/page";
import { useGetUser } from "@/lib/query/user";
import { motion, Variants } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function UserProfile({
  sectionVariants,
  isInView,
  itemVariants,
  setActiveModal,
}: {
  sectionVariants: Variants;
  isInView: boolean;
  itemVariants: Variants;
  setActiveModal: (modalState: ModalState) => void;
}) {
  const { data: userData, isLoading, isError } = useGetUser();

  const initials = userData?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      id="user"
      className="space-y-6"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">User Profile</h2>
        {!isLoading && !isError && (
          <button
            onClick={() => setActiveModal({ type: "profile", data: userData })}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors text-sm"
          >
            Edit Profile
          </button>
        )}
      </div>

      <motion.div
        variants={itemVariants}
        className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6"
      >
        {isLoading ? (
          <div className="w-24 h-24 rounded-full bg-gray-700 animate-pulse" />
        ) : isError ? (
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-600 text-white">
            <AlertCircle className="w-8 h-8" />
          </div>
        ) : userData?.avatarUrl ? (
          <img
            src={userData.avatarUrl}
            alt="User Avatar"
            className="w-24 h-24 rounded-full bg-gray-700 flex-shrink-0 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-bold">
            {initials || "U"}
          </div>
        )}

        <div className="flex-1 text-center sm:text-left space-y-2">
          {isLoading ? (
            <>
              <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto sm:mx-0 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto sm:mx-0 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-full mx-auto sm:mx-0 animate-pulse" />
            </>
          ) : isError ? (
            <p className="text-red-500 text-sm">
              Something went wrong loading the user profile.
            </p>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-white">{userData.name}</h3>
              <p className="text-sm text-gray-400">
                {userData.location ?? "Unknown Location"}
              </p>
              <p className="text-sm text-gray-300">
                {userData.bio ?? "No bio available"}
              </p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
