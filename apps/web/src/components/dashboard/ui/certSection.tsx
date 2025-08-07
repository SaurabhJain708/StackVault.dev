import { ModalState } from "@/app/dashboard/page";
import { useGetCerts } from "@/lib/query/cert";
import { FrontendCert } from "@repo/types";
import { motion, Variants } from "framer-motion";
import { Plus } from "lucide-react";

export default function CertSection({
  sectionVariants,
  isInView,
  setActiveModal,
  itemVariants,
  userId,
}: {
  sectionVariants: Variants;
  isInView: boolean;
  setActiveModal: (modal: ModalState) => void;
  itemVariants: Variants;
  userId: string;
}) {
  const { data: certData, isLoading, isError } = useGetCerts(userId);

  return (
    <motion.div
      id="certs"
      className="space-y-6"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Certifications</h2>
        <button
          onClick={() => setActiveModal("cert")}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors text-sm"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-gray-400 text-sm animate-pulse">
          Fetching your shiny badges...
        </p>
      )}

      {/* Error */}
      {isError && (
        <p className="text-red-500 text-sm">
          Oops! Couldn’t load certifications. Try refreshing.
        </p>
      )}

      {/* No Certs */}
      {!isLoading && !isError && certData?.length === 0 && (
        <div className="text-center text-gray-400 text-sm border border-dashed border-gray-600 p-6 rounded-xl bg-gray-800/50">
          🚀 No certifications yet! <br />
          <span className="text-white font-medium">
            Add your first cert to showcase your skills.
          </span>
        </div>
      )}

      {/* Cert List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certData?.map((cert: FrontendCert) => (
          <motion.div
            key={cert.id}
            variants={itemVariants}
            className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-purple-600 transition-colors"
          >
            <h3 className="text-lg font-semibold text-white">{cert.name}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {cert.skills && cert?.skills.length > 0 ? (
                cert.skills.map((skill) => (
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

            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">
                {new Date(cert.acquiredAt).toLocaleDateString()}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setActiveModal({ type: "editcert", data: cert })
                  }
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    setActiveModal({ type: "deletecert", id: cert.id })
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
