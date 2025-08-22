import { ModalState } from "@/app/dashboard/page";
import { useGetDomains } from "@/lib/query/domain";
import { motion, Variants } from "framer-motion";

export default function CustomDomainSection({
  sectionVariants,
  isInView,
  setActiveModal,
  itemVariants,
}: {
  sectionVariants: Variants;
  isInView: boolean;
  setActiveModal: (modal: ModalState) => void;
  itemVariants: Variants;
}) {
  const { data: userData, isLoading, isError } = useGetDomains();
  return (
    <motion.div
      id="domain"
      className="space-y-6"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Custom Domain</h2>
        <button
          onClick={() =>
            setActiveModal({ type: "domain", domain: userData?.domain })
          }
          className="px-4 cursor-pointer py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors text-sm"
        >
          Edit
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-gray-400 text-sm animate-pulse">
          Fetching your domain...
        </p>
      )}

      {/* Error */}
      {isError && (
        <p className="text-red-500 text-sm">
          Oops! Couldn&apos;t load domain. Try refreshing.
        </p>
      )}

      {/* No Domain */}
      {!isLoading && !isError && !userData?.domain && (
        <div className="text-center text-gray-400 text-sm border border-dashed border-gray-600 p-6 rounded-xl bg-gray-800/50">
          🌐 No custom domain yet! <br />
          <span className="text-white font-medium">
            Add one to personalize your URL.
          </span>
        </div>
      )}

      {/* Domain Card */}
      {!isLoading && !isError && userData?.domain && (
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700 transition-colors"
        >
          <h3 className="text-lg font-semibold text-white">
            {userData?.domain}.stackvault.dev
          </h3>
        </motion.div>
      )}
    </motion.div>
  );
}
