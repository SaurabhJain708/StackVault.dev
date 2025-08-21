import { ModalState } from "@/app/dashboard/page";
import { useGetSocialLinks } from "@/lib/query/socialLink";
import SocialMediaBadge from "@/lib/SocialMediaBadge";
import { socialLink } from "@repo/types";
import { motion, Variants } from "framer-motion";
import { Plus, X, AlertTriangle } from "lucide-react";

export default function SocialLinkSection({
  sectionVariants,
  isInView,
  itemVariants,
  setActiveModal,
  userId,
}: {
  sectionVariants: Variants;
  isInView: boolean;
  itemVariants: Variants;
  setActiveModal: (modalState: ModalState) => void;
  userId: string;
}) {
  const {
    data: socialLinkData,
    isLoading,
    isError,
  } = useGetSocialLinks(userId);

  return (
    <motion.div
      id="socialLinks"
      className="space-y-6"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Social Links</h2>
        <button
          onClick={() => setActiveModal("socialLink")}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors text-sm"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/*  Loading State */}
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-xl bg-gray-700/50 border border-gray-600 animate-pulse"
            />
          ))}

        {/*  Error State */}
        {isError && (
          <div className="col-span-full flex items-center text-red-400 bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
            <AlertTriangle className="mr-2 w-5 h-5" />
            Failed to load social links. Try reloading.
          </div>
        )}

        {/*  Empty State */}
        {!isLoading && !isError && socialLinkData?.length === 0 && (
          <motion.div
            className="col-span-full text-center text-gray-400 italic py-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🌐{" "}
            <span className="text-white font-semibold">
              No social links yet.
            </span>
            <br />
            Add platforms like GitHub, LinkedIn, etc.
          </motion.div>
        )}

        {/* ✅ Rendered Data */}
        {socialLinkData?.map((link: socialLink) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="bg-gray-800/70 p-4 rounded-xl shadow-lg border border-gray-700 flex items-center justify-between hover:border-purple-600 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center ">
                <SocialMediaBadge name={link?.platform} />
              </div>
              <span className="text-sm font-medium">{link?.platform}</span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault(); // prevent opening link on delete click
                setActiveModal({ type: "deletesocialLink", id: link.id });
              }}
              className="text-gray-400 cursor-pointer hover:text-white ml-2"
            >
              <X size={16} />
            </button>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
