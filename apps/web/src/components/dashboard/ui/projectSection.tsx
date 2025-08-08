import { ModalState } from "@/app/dashboard/page";
import { useGetProjects } from "@/lib/query/project";
import { FrontendProject } from "@repo/types";
import { motion, Variants } from "framer-motion";
import { Plus } from "lucide-react";

export default function ProjectSection({
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
  const { data: projectData, isLoading, isError } = useGetProjects(userId);

  return (
    <motion.div
      id="projects"
      className="space-y-6"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <button
          onClick={() => setActiveModal("project")}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors text-sm"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-gray-400 text-sm animate-pulse">
          Gathering your awesome projects...
        </p>
      )}

      {/* Error */}
      {isError && (
        <p className="text-red-500 text-sm">
          Failed to load projects. Please try refreshing.
        </p>
      )}

      {/* No Projects */}
      {!isLoading && !isError && projectData?.length === 0 && (
        <div className="text-center text-gray-400 text-sm border border-dashed border-gray-600 p-6 rounded-xl bg-gray-800/50">
          🧠 No projects added yet! <br />
          <span className="text-white font-medium">
            Add your best work to impress visitors.
          </span>
        </div>
      )}

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectData?.map((project: FrontendProject) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-green-600 transition-colors"
          >
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={`${project.name} project`}
                className="w-full h-40 object-cover rounded-lg mb-4 border border-gray-600"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-700/40 rounded-lg mb-4 border border-dashed border-gray-600 text-gray-400 text-xs italic">
                No image added. <br />
                <button
                  onClick={() =>
                    setActiveModal({ type: "editproject", data: project })
                  }
                  className="underline text-purple-400 hover:text-purple-300 mt-1"
                >
                  + Add image
                </button>
              </div>
            )}

            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
            <p className="text-sm text-gray-400 mb-2">
              {project?.description || (
                <span className="italic text-gray-500">
                  No description provided.
                </span>
              )}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project?.skills && project.skills.length > 0 ? (
                project.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                  >
                    {skill.name}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-xs italic">
                  No skills added. Add some!
                </span>
              )}
            </div>

            {/* Visit / Add URL */}
            <div className="mb-4">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-green-400 hover:text-green-300 hover:underline transition-all"
                >
                  Visit project
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 3h7m0 0v7m0-7L10 14"
                    />
                  </svg>
                </a>
              ) : (
                <button
                  onClick={() =>
                    setActiveModal({ type: "editproject", data: project })
                  }
                  className="text-purple-400 hover:text-purple-300 text-sm underline"
                >
                  + Add project URL
                </button>
              )}
            </div>

            <div className="flex justify-end items-center space-x-2 text-sm">
              <button
                onClick={() =>
                  setActiveModal({ type: "editproject", data: project })
                }
                className="text-blue-400 hover:text-blue-300"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  setActiveModal({ type: "deleteproject", id: project.id })
                }
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
