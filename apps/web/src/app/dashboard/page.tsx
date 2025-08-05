"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Modal } from "@/components/modals/dashboard.modal";
import { CertForm } from "@/components/dashboard/certForm";
import { SkillForm } from "@/components/dashboard/skillForm";
import { SocialLinkForm } from "@/components/dashboard/socialLinkForm";
import {
  certInput,
  educationInput,
  experienceInput,
  projectInput,
  skillInput,
  socialLinkInput,
  userInput,
} from "@repo/types";
import { easeOut } from "framer-motion"; // if available in your version
import { ExperienceForm } from "@/components/dashboard/experienceForm";
import { EducationForm } from "@/components/dashboard/educationForm";
import { ProjectForm } from "@/components/dashboard/projectForm";
import { DeleteForm } from "@/components/dashboard/deleteForm";
import { UserProfileForm } from "@/components/dashboard/profileForm";

// Mock data to demonstrate the layout
const mockUser = {
  name: "John Doe",
  bio: "A passionate developer building the future of interactive portfolios with microservices and cloud-native solutions.",
  available: true,
  location: "New York, NY",
  avatarUrl: "https://placehold.co/100x100/581c87/FFFFFF?text=JD",
  resumeUrl: "https://example.com/resume",
  languages: ["English", "Spanish"],
  causes: ["Open Source"],
};

const mockSkills = [
  { id: "skill1", name: "Next.js" },
  { id: "skill2", name: "Microservices" },
  { id: "skill3", name: "AWS" },
  { id: "skill4", name: "Framer Motion" },
  { id: "skill5", name: "Docker" },
];

const mockSocialLinks = [
  { id: "link1", platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
  { id: "link2", platform: "GitHub", url: "https://github.com/johndoe" },
];

const mockCerts = [
  {
    id: "cert1",
    name: "AWS Certified Cloud Practitioner",
    organization: "Amazon Web Services",
    acquiredAt: new Date("2023-01-15"),
    skills: [{ id: "skill3", name: "AWS" }],
  },
  {
    id: "cert2",
    name: "Docker Certified Associate",
    organization: "Docker",
    acquiredAt: new Date("2023-08-22"),
    skills: [{ id: "skill5", name: "Docker" }],
  },
];

const mockEducations = [
  {
    id: "edu1",
    institution: "IIT Madras",
    degree: "B.S.",
    fieldOfStudy: "Data Science",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2027-06-30"),
    skills: [{ id: "skill6", name: "Data Science" }],
  },
];

const mockExperiences = [
  {
    id: "exp1",
    company: "Innovative Solutions Inc.",
    position: "Software Engineer Intern",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-08-30"),
    description: "Developed scalable APIs and user interfaces.",
    skills: [
      { id: "skill1", name: "Next.js" },
      { id: "skill2", name: "Microservices" },
    ],
  },
];

const mockProjects = [
  {
    id: "proj1",
    name: "StackVault.dev",
    description: "A portfolio-making SaaS with microservices and CI/CD.",
    url: "https://stackvault.dev",
    skills: [
      { id: "skill1", name: "Next.js" },
      { id: "skill4", name: "Framer Motion" },
    ],
  },
  {
    id: "proj2",
    name: "Open-Source Contribution",
    description: "Merged PRs in Formbricks and Cal.com.",
    url: "https://github.com/johndoe",
    skills: [
      { id: "skill1", name: "Next.js" },
      { id: "skill7", name: "TypeScript" },
    ],
  },
];

// Re-usable Modal component

// Form for adding/editing a new Certification

// Form for adding/editing a new Skill

// Form for adding/editing a new Social Link

const Dashboard = () => {
  const [activeModal, setActiveModal] = useState<
    | null
    | "cert"
    | "skill"
    | "socialLink"
    | "experience"
    | "education"
    | "project"
    | "deletecert"
    | "deleteskill"
    | "deletesocialLink"
    | "deleteexperience"
    | "deleteeducation"
    | "deleteproject"
    | "profile"
  >(null);

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

  const [data, setData] = useState({
    user: mockUser,
    skills: mockSkills,
    socialLinks: mockSocialLinks,
    certs: mockCerts,
    educations: mockEducations,
    experiences: mockExperiences,
    projects: mockProjects,
  });

  const handleAddCert = (formData: certInput) => {
    console.log("Adding new cert:", formData);
    // You would call your POST /api/certs endpoint here
    setActiveModal(null);
  };

  const handleAddSkill = (formData: skillInput) => {
    console.log("Adding new skill:", formData);
    // You would call your POST /api/skills endpoint here
    setActiveModal(null);
  };

  const handleAddSocialLink = (formData: socialLinkInput) => {
    console.log("Adding new social link:", formData);
    // You would call your POST /api/socialLinks endpoint here
    setActiveModal(null);
  };

  const handleDeleteCert = (id: string) => {
    console.log("Deleting cert with ID:", id);
    // You would call your DELETE /api/certs endpoint here
  };

  const handleDeleteSkill = (id: string) => {
    console.log("Deleting skill with ID:", id);
    // You would call your DELETE /api/skills endpoint here
  };

  const handleDeleteSocialLink = (id: string) => {
    console.log("Deleting social link with ID:", id);
    // You would call your DELETE /api/socialLinks endpoint here
  };

  const handleAddExperience = (formData: experienceInput) => {
    console.log("Adding new experience:", formData);
    // You would call your POST /api/experiences endpoint here
    setActiveModal(null);
  };

  const handleAddEducation = (formData: educationInput) => {
    console.log("Adding new education:", formData);
    // You would call your POST /api/educations endpoint here
    setActiveModal(null);
  };

  const handleAddProject = (formData: projectInput) => {
    console.log("Adding new project:", formData);
    // You would call your POST /api/projects endpoint here
    setActiveModal(null);
  };

  const handleDeleteExperience = (id: string) => {
    console.log("Deleting experience with ID:", id);
    // You would call your DELETE /api/experiences endpoint here
  };
  const handleDeleteEducation = (id: string) => {
    console.log("Deleting education with ID:", id);
    // You would call your DELETE /api/educations endpoint here
  };
  const handleDeleteProject = (id: string) => {
    console.log("Deleting project with ID:", id);
    // You would call your DELETE /api/projects endpoint here
  };
  const handleEditProfile = (formData: userInput) => {
    console.log("Editing profile:", formData);
    // You would call your PUT /api/user endpoint here
    setActiveModal(null);
  };

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-gray-200 font-inter overflow-x-hidden relative">
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
              Welcome, {data.user.name.split(" ")[0]}
            </span>
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold">
              {data.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
        </motion.header>

        <motion.div
          ref={containerRef}
          className="max-w-6xl mx-auto space-y-12 mt-16 md:mt-24"
        >
          {/* Section: User Profile */}
          <motion.div
            id="user"
            className="space-y-6"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">User Profile</h2>
              <button
                onClick={() => setActiveModal("profile")}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors text-sm"
              >
                Edit Profile
              </button>
            </div>
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <img
                src={data.user.avatarUrl}
                alt="User Avatar"
                className="w-24 h-24 rounded-full bg-gray-700 flex-shrink-0 object-cover"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white">
                  {data.user.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  {data.user.location}
                </p>
                <p className="text-sm text-gray-300">{data.user.bio}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Section: Skills */}
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
              {data.skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  variants={itemVariants}
                  className="bg-gray-800/70 p-4 rounded-xl shadow-lg border border-gray-700 flex items-center justify-between hover:border-purple-600 transition-colors"
                >
                  <span className="text-sm text-gray-300 font-medium">
                    {skill.name}
                  </span>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="text-gray-400 hover:text-white ml-2"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Section: Social Links */}
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
              {data.socialLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="bg-gray-800/70 p-4 rounded-xl shadow-lg border border-gray-700 flex items-center justify-between hover:border-purple-600 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {/* Placeholder for SVG icon based on platform */}
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                      {link.platform.substring(0, 1)}
                    </div>
                    <span className="text-sm font-medium">{link.platform}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      setActiveModal("deletesocialLink");
                    }}
                    className="text-gray-400 hover:text-white ml-2"
                  >
                    <X size={16} />
                  </button>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Section: Certifications */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.certs.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-purple-600 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {cert.organization}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-500">
                      {new Date(cert.acquiredAt).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        Edit
                      </button>
                      <button
                        onClick={() => setActiveModal("deletecert")}
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

          {/* Section: Education */}
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
                onClick={() => {
                  setActiveModal("education");
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors text-sm"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.educations.map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={itemVariants}
                  className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-blue-600 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {edu.degree} in {edu.fieldOfStudy}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {edu.institution}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {edu.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-500">
                      {new Date(edu.startDate).getFullYear()} -{" "}
                      {new Date(edu.endDate).getFullYear()}
                    </p>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        Edit
                      </button>
                      <button
                        onClick={() => setActiveModal("deleteeducation")}
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

          {/* Section: Experience */}
          <motion.div
            id="experience"
            className="space-y-6"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Experience</h2>
              <button
                onClick={() => {
                  setActiveModal("experience");
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors text-sm"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-pink-600 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {exp.position}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">{exp.company}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-500">
                      {new Date(exp.startDate).getFullYear()} -{" "}
                      {new Date(exp.endDate).getFullYear()}
                    </p>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        Edit
                      </button>
                      <button
                        onClick={() => setActiveModal("deleteexperience")}
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

          {/* Section: Projects */}
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
                onClick={() => {
                  setActiveModal("project");
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors text-sm"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-green-600 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end items-center space-x-2 text-sm">
                    <button className="text-blue-400 hover:text-blue-300">
                      Edit
                    </button>
                    <button
                      onClick={() => setActiveModal("deleteproject")}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

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
        {activeModal === "deletecert" && (
          <Modal
            title="Delete Certification"
            onClose={() => setActiveModal(null)}
          >
            <DeleteForm
              Title="Certification"
              id="cert-id"
              onDelete={handleDeleteCert}
            />
          </Modal>
        )}
        {activeModal === "deleteskill" && (
          <Modal title="Delete Skill" onClose={() => setActiveModal(null)}>
            <DeleteForm
              Title="Skill"
              id="skill-id"
              onDelete={handleDeleteSkill}
            />
          </Modal>
        )}
        {activeModal === "deletesocialLink" && (
          <Modal
            title="Delete Social Link"
            onClose={() => setActiveModal(null)}
          >
            <DeleteForm
              Title="Social Link"
              id="social-link-id"
              onDelete={handleDeleteSocialLink}
            />
          </Modal>
        )}
        {activeModal === "deleteexperience" && (
          <Modal title="Delete Experience" onClose={() => setActiveModal(null)}>
            <DeleteForm
              Title="Experience"
              id="experience-id"
              onDelete={handleDeleteExperience}
            />
          </Modal>
        )}
        {activeModal === "deleteeducation" && (
          <Modal title="Delete Education" onClose={() => setActiveModal(null)}>
            <DeleteForm
              Title="Education"
              id="education-id"
              onDelete={handleDeleteEducation}
            />
          </Modal>
        )}
        {activeModal === "deleteproject" && (
          <Modal title="Delete Project" onClose={() => setActiveModal(null)}>
            <DeleteForm
              Title="Project"
              id="project-id"
              onDelete={handleDeleteProject}
            />
          </Modal>
        )}
        {activeModal === "profile" && (
          <Modal title="Edit Profile" onClose={() => setActiveModal(null)}>
            <UserProfileForm onSubmit={handleEditProfile} />
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
