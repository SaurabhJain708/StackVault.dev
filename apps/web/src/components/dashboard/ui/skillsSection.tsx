import { ModalState } from "@/app/dashboard/page";
import { useGetSkills } from "@/lib/query/createSkill";
import { skill } from "@repo/types";
import { motion, Variants } from "framer-motion";
import { Plus, X, AlertTriangle } from "lucide-react";

export default function SkillsSection({
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
  const { data: skillData, isLoading, isError } = useGetSkills(userId);

  return (
    <motion.div
      id="skills"
      className="space-y-6"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Skills</h2>
        <button
          onClick={() => setActiveModal("skill")}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors text-sm"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-700/50 rounded-xl animate-pulse"
            />
          ))
        ) : isError ? (
          <div className="col-span-full flex flex-col items-center justify-center text-red-400 py-6">
            <AlertTriangle size={24} className="mb-2" />
            <p className="text-sm">
              Failed to load skills. Please try again later.
            </p>
          </div>
        ) : skillData?.length === 0 || skillData === undefined ? (
          <div className="col-span-full text-center text-gray-400 italic py-6">
            🚀{" "}
            <span className="text-white font-semibold">
              No skills added yet.
            </span>{" "}
            <br />
            Show the world what you&apos;re good at!
          </div>
        ) : (
          skillData?.map((skill: skill) => (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              className="bg-gray-800/70 p-4 rounded-xl shadow-lg border border-gray-700 flex items-center justify-between hover:border-purple-600 transition-colors"
            >
              <span className="text-sm text-gray-300 font-medium">
                {skill.name}
              </span>
              <button
                onClick={() =>
                  setActiveModal({ type: "deleteskill", id: skill.id })
                }
                className="text-gray-400 hover:text-white ml-2"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
