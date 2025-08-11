"use client";
import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Modal } from "@/components/modals/dashboard.modal";
import {
  certInput,
  educationInput,
  experienceInput,
  projectInput,
  skillInput,
  socialLinkInput,
  userInput,
} from "@repo/types";
import { easeOut } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const CertForm = dynamic(() => import("@/components/dashboard/certForm"), {
  loading: () => <Spinner />,
});
const SkillForm = dynamic(() => import("@/components/dashboard/skillForm"), {
  loading: () => <Spinner />,
});
const SocialLinkForm = dynamic(
  () => import("@/components/dashboard/socialLinkForm"),
  {
    loading: () => <Spinner />,
  },
);
const ExperienceForm = dynamic(
  () => import("@/components/dashboard/experienceForm"),
  {
    loading: () => <Spinner />,
  },
);
const EducationForm = dynamic(
  () => import("@/components/dashboard/educationForm"),
  {
    loading: () => <Spinner />,
  },
);
const ProjectForm = dynamic(
  () => import("@/components/dashboard/projectForm"),
  {
    loading: () => <Spinner />,
  },
);
const DeleteForm = dynamic(() => import("@/components/dashboard/deleteForm"), {
  loading: () => <Spinner />,
});
const UserProfileForm = dynamic(
  () => import("@/components/dashboard/profileForm"),
  {
    loading: () => <Spinner />,
  },
);

import { useCreateCert, useDeleteCert, useUpdateCert } from "@/lib/query/cert";
import {
  useCreateSocialLink,
  useDeleteSocialLink,
} from "@/lib/query/socialLink";
import { useSession } from "next-auth/react";
import {
  useCreateProject,
  useDeleteProject,
  useUpdateProject,
} from "@/lib/query/project";
import {
  useCreateExperience,
  useDeleteExperience,
  useUpdateExperience,
} from "@/lib/query/experience";
import { useCreateSkill, useDeleteSkill } from "@/lib/query/createSkill";
import {
  useCreateEducation,
  useDeleteEducation,
  useUpdateEducation,
} from "@/lib/query/education";
import { useUpdateUser } from "@/lib/query/user";
import Header from "@/components/dashboard/ui/header";
import UserProfile from "@/components/dashboard/ui/userProfile";
import SkillsSection from "@/components/dashboard/ui/skillsSection";
import SocialLinkSection from "@/components/dashboard/ui/socialLinkSection";
import CertSection from "@/components/dashboard/ui/certSection";
import EducationSection from "@/components/dashboard/ui/educationSection";
import ExperienceSection from "@/components/dashboard/ui/experienceSection";
import ProjectSection from "@/components/dashboard/ui/projectSection";
import TemplateSection from "@/components/dashboard/ui/templateSection";
import Spinner from "@/components/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import PortfolioLiveMessage from "@/components/dashboard/ui/celebration";
import { set } from "react-hook-form";

type EditProjectState = { type: "editproject"; data: projectInput };
type EditEducationState = { type: "editeducation"; data: educationInput };
type EditSkillState = { type: "editskill"; data: skillInput };
type EditCertState = { type: "editcert"; data: certInput };
type EditExperienceState = { type: "editexperience"; data: experienceInput };
type EditProfileState = { type: "profile"; data: userInput };
type DeleteCertState = { type: "deletecert"; id: string };
type DeleteSkillState = { type: "deleteskill"; id: string };
type DeleteSocialLinkState = { type: "deletesocialLink"; id: string };
type DeleteExperienceState = { type: "deleteexperience"; id: string };
type DeleteEducationState = { type: "deleteeducation"; id: string };
type DeleteProjectState = { type: "deleteproject"; id: string };
export type ModalState =
  | null
  | "cert"
  | "skill"
  | "socialLink"
  | "experience"
  | "education"
  | "project"
  | "celebration"
  | EditProjectState
  | EditEducationState
  | EditSkillState
  | EditCertState
  | EditExperienceState
  | EditProfileState
  | DeleteCertState
  | DeleteSkillState
  | DeleteSocialLinkState
  | DeleteExperienceState
  | DeleteEducationState
  | DeleteProjectState;

const Dashboard = () => {
  const router = useRouter();
  const session = useSession();
  const userId = session?.data?.user?.id ?? ``;

  const [activeModal, setActiveModal] = useState<ModalState>(null);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const deleteCert = useDeleteCert(userId);
  const deleteSocialLink = useDeleteSocialLink(userId);
  const deleteProject = useDeleteProject(userId);
  const deleteExperience = useDeleteExperience(userId);
  const deleteEducation = useDeleteEducation(userId);
  const deleteSkill = useDeleteSkill();
  const editProfile = useUpdateUser();
  const editCert = useUpdateCert(userId);
  const editProject = useUpdateProject(userId);
  const editEducation = useUpdateEducation(userId);
  const editExperience = useUpdateExperience(userId);
  const addCert = useCreateCert(userId);
  const addSocialLink = useCreateSocialLink(userId);
  const addExperience = useCreateExperience(userId);
  const addEducation = useCreateEducation(userId);
  const addProject = useCreateProject(userId);

  const addSkill = useCreateSkill();

  const handleAddCert = (formData: certInput) => {
    addCert.mutate(formData);
    setActiveModal(null);
  };
  const handleAddSkill = (formData: skillInput) => {
    addSkill.mutate(formData);
    setActiveModal(null);
  };
  const handleAddSocialLink = (formData: socialLinkInput) => {
    addSocialLink.mutate(formData);
    setActiveModal(null);
  };
  const handleAddExperience = (formData: experienceInput) => {
    addExperience.mutate(formData);
    setActiveModal(null);
  };
  const handleAddEducation = (formData: educationInput) => {
    addEducation.mutate(formData);
    setActiveModal(null);
  };
  const handleAddProject = (formData: projectInput) => {
    addProject.mutate(formData);
    setActiveModal(null);
  };

  const handleDeleteExperience = (id: string) => {
    deleteExperience.mutate(id);
    setActiveModal(null);
  };
  const handleDeleteEducation = (id: string) => {
    deleteEducation.mutate(id);
    setActiveModal(null);
  };
  const handleDeleteProject = (id: string) => {
    deleteProject.mutate(id);
    setActiveModal(null);
  };
  const handleDeleteCert = (id: string) => {
    deleteCert.mutate(id);
    setActiveModal(null);
  };
  const handleDeleteSkill = (id: string) => {
    deleteSkill.mutate(id);
    setActiveModal(null);
  };
  const handleDeleteSocialLink = (id: string) => {
    deleteSocialLink.mutate(id);
    setActiveModal(null);
  };

  const handleEditProfile = (formData: userInput) => {
    editProfile.mutate(formData);
    setActiveModal(null);
  };
  const handleEditProject = (formData: projectInput) => {
    if (!formData.id) return;
    editProject.mutate(formData);
    setActiveModal(null);
  };
  const handleEditEducation = (formData: educationInput) => {
    editEducation.mutate(formData);
    setActiveModal(null);
  };
  const handleEditSkill = (formData: skillInput) => {
    console.log("Editing skill:", formData);
    setActiveModal(null);
  };
  const handleEditCert = (formData: certInput) => {
    console.log("Editing cert:", formData); // <--- Add this

    editCert.mutate(formData);
    setActiveModal(null);
  };
  const handleEditExperience = (formData: experienceInput) => {
    editExperience.mutate(formData);
    setActiveModal(null);
  };

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeModal]);

  const searchParams = useSearchParams();
  const celebration = searchParams.get("celebration");
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (celebration === "true") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000);
      setActiveModal("celebration");
    }
  }, [celebration]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-gray-200 font-inter overflow-x-hidden relative">
      {showConfetti && (
        <Confetti width={width} height={height} style={{ zIndex: 100 }} />
      )}
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5"></div>
        <div className="absolute inset-0 z-0 opacity-10 animate-grid-fade">
          <div className="grid-overlay"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen pt-16 pb-8 px-4 sm:px-6 md:px-8">
        {/* Header */}
        <Header />

        <motion.div
          ref={containerRef}
          className="max-w-6xl mx-auto space-y-12 mt-16 md:mt-24"
        >
          {/* Section: User Profile */}
          <UserProfile
            sectionVariants={sectionVariants}
            isInView={isInView}
            itemVariants={itemVariants}
            setActiveModal={setActiveModal}
          />

          {/* Section: Skills */}
          <SkillsSection
            sectionVariants={sectionVariants}
            isInView={isInView}
            itemVariants={itemVariants}
            setActiveModal={setActiveModal}
            userId={userId}
          />

          {/* Section: Social Links */}
          <SocialLinkSection
            sectionVariants={sectionVariants}
            isInView={isInView}
            itemVariants={itemVariants}
            setActiveModal={setActiveModal}
            userId={userId}
          />

          {/* Section: Certifications */}
          <CertSection
            sectionVariants={sectionVariants}
            isInView={isInView}
            setActiveModal={setActiveModal}
            itemVariants={itemVariants}
            userId={userId}
          />

          {/* Section: Education */}
          <EducationSection
            sectionVariants={sectionVariants}
            isInView={isInView}
            setActiveModal={setActiveModal}
            itemVariants={itemVariants}
            userId={userId}
          />

          {/* Section: Experience */}
          <ExperienceSection
            sectionVariants={sectionVariants}
            isInView={isInView}
            setActiveModal={setActiveModal}
            itemVariants={itemVariants}
            userId={userId}
          />

          {/* Section: Projects */}
          <ProjectSection
            sectionVariants={sectionVariants}
            isInView={isInView}
            setActiveModal={setActiveModal}
            itemVariants={itemVariants}
            userId={userId}
          />
        </motion.div>

        <TemplateSection
          sectionVariants={sectionVariants}
          isInView={isInView}
          itemVariants={itemVariants}
          userId={userId}
        />
      </div>

      <button
        onClick={() => router.push(`/portfolio/${userId}`)}
        className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition-all"
      >
        Preview
      </button>

      {/* Modal for Forms */}
      <AnimatePresence>
        {activeModal === "cert" && (
          <Modal
            title="Add New Certification"
            onClose={() => setActiveModal(null)}
          >
            <CertForm onSubmit={handleAddCert} />
          </Modal>
        )}
        {activeModal === "skill" && (
          <Modal title="Add New Skill" onClose={() => setActiveModal(null)}>
            <SkillForm onSubmit={handleAddSkill} />
          </Modal>
        )}
        {activeModal === "socialLink" && (
          <Modal
            title="Add New Social Link"
            onClose={() => setActiveModal(null)}
          >
            <SocialLinkForm onSubmit={handleAddSocialLink} />
          </Modal>
        )}
        {activeModal === "experience" && (
          <Modal
            title="Add New Experience"
            onClose={() => setActiveModal(null)}
          >
            <ExperienceForm onSubmit={handleAddExperience} />
          </Modal>
        )}
        {activeModal === "education" && (
          <Modal title="Add New Education" onClose={() => setActiveModal(null)}>
            <EducationForm onSubmit={handleAddEducation} />
          </Modal>
        )}
        {activeModal === "project" && (
          <Modal title="Add New Project" onClose={() => setActiveModal(null)}>
            <ProjectForm onSubmit={handleAddProject} />
          </Modal>
        )}
        {typeof activeModal === "object" &&
          activeModal?.type === "deletecert" && (
            <Modal
              title="Delete Certification"
              onClose={() => setActiveModal(null)}
            >
              <DeleteForm
                Title="Certification"
                id={activeModal.id}
                onDelete={handleDeleteCert}
              />
            </Modal>
          )}
        {typeof activeModal === "object" &&
          activeModal?.type === "deleteskill" && (
            <Modal title="Delete Skill" onClose={() => setActiveModal(null)}>
              <DeleteForm
                Title="Skill"
                id={activeModal.id}
                onDelete={handleDeleteSkill}
              />
            </Modal>
          )}
        {typeof activeModal === "object" &&
          activeModal?.type === "deletesocialLink" && (
            <Modal
              title="Delete Social Link"
              onClose={() => setActiveModal(null)}
            >
              <DeleteForm
                Title="Social Link"
                id={activeModal.id}
                onDelete={handleDeleteSocialLink}
              />
            </Modal>
          )}
        {typeof activeModal === "object" &&
          activeModal?.type === "deleteexperience" && (
            <Modal
              title="Delete Experience"
              onClose={() => setActiveModal(null)}
            >
              <DeleteForm
                Title="Experience"
                id={activeModal.id}
                onDelete={handleDeleteExperience}
              />
            </Modal>
          )}
        {typeof activeModal === "object" &&
          activeModal?.type === "deleteeducation" && (
            <Modal
              title="Delete Education"
              onClose={() => setActiveModal(null)}
            >
              <DeleteForm
                Title="Education"
                id={activeModal.id}
                onDelete={handleDeleteEducation}
              />
            </Modal>
          )}
        {typeof activeModal === "object" &&
          activeModal?.type === "deleteproject" && (
            <Modal title="Delete Project" onClose={() => setActiveModal(null)}>
              <DeleteForm
                Title="Project"
                id={activeModal.id}
                onDelete={handleDeleteProject}
              />
            </Modal>
          )}
        {typeof activeModal === "object" && activeModal?.type === "profile" && (
          <Modal title="Edit Profile" onClose={() => setActiveModal(null)}>
            <UserProfileForm
              defaultValues={activeModal.data}
              onSubmit={handleEditProfile}
            />
          </Modal>
        )}
        {typeof activeModal === "object" &&
          activeModal?.type === "editskill" && (
            <Modal title="Edit Skill" onClose={() => setActiveModal(null)}>
              <SkillForm isEdit={true} onSubmit={handleEditSkill} />
            </Modal>
          )}
        {typeof activeModal === "object" &&
          activeModal?.type === "editcert" && (
            <Modal
              title="Edit Certification"
              onClose={() => setActiveModal(null)}
            >
              <CertForm
                isEdit={true}
                defaultValues={activeModal.data}
                onSubmit={handleEditCert}
              />
            </Modal>
          )}
        {typeof activeModal === "object" &&
          activeModal?.type === "editproject" && (
            <Modal title="Edit Project" onClose={() => setActiveModal(null)}>
              <ProjectForm
                isEdit={true}
                defaultValues={activeModal.data}
                onSubmit={handleEditProject}
              />
            </Modal>
          )}
        {typeof activeModal === "object" &&
          activeModal?.type === "editexperience" && (
            <Modal title="Edit Experience" onClose={() => setActiveModal(null)}>
              <ExperienceForm
                isEdit={true}
                defaultValues={activeModal.data}
                onSubmit={handleEditExperience}
              />
            </Modal>
          )}
        {typeof activeModal === "object" &&
          activeModal?.type === "editeducation" && (
            <Modal title="Edit Education" onClose={() => setActiveModal(null)}>
              <EducationForm
                isEdit={true}
                defaultValues={activeModal.data}
                onSubmit={handleEditEducation}
              />
            </Modal>
          )}
        {activeModal === "celebration" && celebration && (
          <Modal title="Celebration" onClose={() => setActiveModal(null)}>
            <PortfolioLiveMessage userId={userId} />
          </Modal>
        )}
      </AnimatePresence>

      {/* Custom CSS for base styles and animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }

        .animate-grid-fade {
          animation: gridPan 60s linear infinite;
        }

        @keyframes gridPan {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -400px -400px;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
