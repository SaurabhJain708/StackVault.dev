import { motion, Variants } from "framer-motion";
import { Plus } from "lucide-react";
import { useGetEducations } from "@/lib/query/education";
import { ModalState } from "@/app/dashboard/page";
import { FrontendEducation } from "@repo/types";

export default function EducationSection({
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
  const { data: educationData, isLoading, isError } = useGetEducations(userId);

  return (
    <motion.div
      id="education"
      className="space-y-6"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Education</h2>
        <button
          onClick={() => setActiveModal("education")}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors text-sm"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-gray-400 text-sm animate-pulse">
          Loading your academic achievements...
        </p>
      )}

      {/* Error */}
      {isError && (
        <p className="text-red-500 text-sm">
          Failed to load education history. Try refreshing.
        </p>
      )}

      {/* No Education */}
      {!isLoading && !isError && educationData?.length === 0 && (
        <div className="text-center text-gray-400 text-sm border border-dashed border-gray-600 p-6 rounded-xl bg-gray-800/50">
          🎓 No education records yet! <br />
          <span className="text-white font-medium">
            Add your educational background to stand out.
          </span>
        </div>
      )}

      {/* Education List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationData?.map((edu: FrontendEducation) => (
          <motion.div
            key={edu.id}
            variants={itemVariants}
            className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-blue-600 transition-colors"
          >
            {edu.imageUrl ? (
              <img
                src={edu.imageUrl}
                alt={`${edu.degree} certificate`}
                className="w-full h-40 object-cover rounded-lg mb-4 border border-gray-600"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-700/40 rounded-lg mb-4 border border-dashed border-gray-600 text-gray-400 text-xs italic">
                No image added. <br />
                <button
                  onClick={() =>
                    setActiveModal({ type: "editeducation", data: edu })
                  }
                  className="underline text-purple-400 hover:text-purple-300 mt-1"
                >
                  + Add image
                </button>
              </div>
            )}
            <h3 className="text-lg font-semibold text-white">
              {edu.degree}
              {edu.fieldOfStudy && ` in ${edu?.fieldOfStudy}`}
            </h3>
            <p className="text-sm text-gray-400 mb-2">{edu?.institution}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {edu.skills && edu.skills.length > 0 ? (
                edu.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                  >
                    {skill.name}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-xs italic">
                  No skills listed.
                </span>
              )}
            </div>

            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">
                {new Date(edu?.startDate).getFullYear()} -{" "}
                {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setActiveModal({ type: "editeducation", data: edu })
                  }
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    setActiveModal({ type: "deleteeducation", id: edu.id })
                  }
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
