"use client";
import { ReactNode, useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Suspense } from "react";
import { UserProfile } from "@repo/types";
import { Variants } from "framer-motion";

// --- 3D BACKGROUND ---
const InteractiveParticles = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load(
      "https://threejs.org/examples/textures/sprites/disc.png",
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      color: 0x0abdc6,
      transparent: true,
      opacity: 0.7,
    });
    const particleSystem = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particleSystem);
    camera.position.z = 5;

    const mouse = new THREE.Vector2();
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      particleSystem.rotation.y += 0.0005;
      particleSystem.rotation.x += mouse.y * 0.0001;
      particleSystem.rotation.y += mouse.x * 0.0001;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />
  );
};

// --- UI COMPONENTS ---
const Section = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <div className={`py-24 md:py-32 ${className}`}>{children}</div>;

const GlassCard = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-slate-900/50 backdrop-blur-lg p-6 rounded-2xl border border-cyan-400/10 shadow-2xl shadow-black/50 ${className}`}
  >
    {children}
  </div>
);

const SkillPill = ({ skillName }: { skillName: string }) => (
  <div className="bg-cyan-400/10 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full border border-cyan-400/20">
    {skillName}
  </div>
);

// --- MAIN SECTIONS ---
const HeroSection = ({ data }: { data: UserProfile }) => {
  const text = "Priya Sharma";
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: i * 0.1 },
    }),
  };
  const charVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 12, stiffness: 200 },
    },
  };

  return (
    <Section className="min-h-screen flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <img
          src={data.avatarUrl ?? undefined}
          alt={data.name}
          className="w-36 h-36 rounded-full mb-6 border-4 border-cyan-400/20 shadow-2xl shadow-cyan-500/20"
        />
      </motion.div>

      <motion.h1
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="text-5xl md:text-7xl font-extrabold text-slate-100 mb-4 tracking-tighter"
      >
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={charVariants}>
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="text-lg text-cyan-300 mb-6"
      >
        Backend Architect & Python Specialist
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0 }}
        className="text-slate-400 max-w-2xl mb-8"
      >
        {data.bio}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="flex items-center space-x-6"
      >
        {data.socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-cyan-300 transition-colors"
          >
            {link.platform === "LinkedIn" && <Linkedin size={24} />}
            {link.platform === "GitHub" && <Github size={24} />}
          </a>
        ))}
      </motion.div>
    </Section>
  );
};

const ExperienceSection = ({ data }: { data: UserProfile }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <Section>
      <h2 className="text-4xl font-bold text-center mb-16 text-slate-200">
        Career Trajectory
      </h2>
      <div ref={ref} className="relative max-w-2xl mx-auto">
        <svg
          width="10"
          height="100%"
          viewBox="0 0 10 800"
          className="absolute left-1/2 -translate-x-1/2 h-full"
        >
          <motion.path
            d="M 5 0 V 800"
            fill="transparent"
            stroke="#0891b2"
            strokeWidth="2"
            style={{ pathLength }}
            initial={{ pathLength: 0 }}
          />
        </svg>
        {data.experiencesWithSkills.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className={`mb-12 flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`w-5/12 ${
                index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
              }`}
            >
              <GlassCard>
                <p className="text-xs text-cyan-400/80 mb-1">
                  {new Date(exp.startDate).getFullYear()} -{" "}
                  {exp.endDate
                    ? new Date(exp.endDate).getFullYear()
                    : "Present"}
                </p>
                <h3 className="text-lg font-semibold text-slate-100">
                  {exp.position}
                </h3>
                <p className="text-md text-slate-400 mb-3">{exp.company}</p>
                <div
                  className={`flex flex-wrap gap-2 ${
                    index % 2 === 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  {exp.skills.map((s) => (
                    <SkillPill key={s.id} skillName={s.name} />
                  ))}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const ProjectsSection = ({ data }: { data: UserProfile }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <Section>
      <h2 className="text-4xl font-bold text-center mb-4 text-slate-200">
        Featured Projects
      </h2>
      <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
        A selection of projects that demonstrate my skills in backend
        development and system design.
      </p>
      <div ref={ref} className="flex gap-8 overflow-x-auto">
        <motion.div style={{ x }} className="flex gap-8">
          {data.projectsWithSkills.map((proj) => (
            <div key={proj.id} className="w-80 md:w-96 flex-shrink-0">
              <GlassCard className="h-full group flex flex-col">
                <h3 className="text-xl font-bold text-slate-100 mb-2">
                  {proj.name}
                </h3>
                <p className="text-slate-400 mb-4 text-sm flex-grow">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.skills.map((s) => (
                    <SkillPill key={s.id} skillName={s.name} />
                  ))}
                </div>
                <a
                  href={proj.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fuchsia-400 font-semibold text-sm inline-flex items-center group-hover:text-fuchsia-300"
                >
                  View Project{" "}
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </a>
              </GlassCard>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

const SkillsSection = ({ data }: { data: UserProfile }) => (
  <Section>
    <h2 className="text-4xl font-bold text-center mb-16 text-slate-200">
      Core Competencies
    </h2>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.05 }}
      className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
    >
      {data.skillsWithRelations.map((skill) => (
        <motion.div
          key={skill.id}
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: { opacity: 1, scale: 1 },
          }}
          className="bg-slate-800/50 border border-cyan-400/20 px-5 py-3 rounded-lg text-slate-200 font-medium text-center hover:bg-slate-800 transition-colors"
        >
          {skill.name}
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

const ContactSection = ({ data }: { data: UserProfile }) => (
  <Section>
    <GlassCard className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4 text-slate-100">
        Initiate Contact
      </h2>
      <p className="text-slate-400 mb-8">
        I&apos;m currently available for new opportunities and collaborations.
        If you have a project in mind or just want to connect, feel free to send
        a transmission.
      </p>
      <motion.a
        href={`mailto:${data.email}`}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 30px rgba(134, 25, 143, 0.5)",
        }}
        className="inline-block bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold py-4 px-10 rounded-lg transition-all"
      >
        Send Message
      </motion.a>
    </GlassCard>
  </Section>
);

// --- MAIN APP COMPONENT ---
export default function AtlasTemplate({ data }: { data: UserProfile }) {
  return (
    <div className="bg-slate-900 font-['Inter',_sans-serif] text-slate-300 selection:bg-fuchsia-500/40 overflow-x-hidden">
      <Suspense fallback={null}>
        <InteractiveParticles />
      </Suspense>
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0,_rgba(0,0,0,0.8)_100%)]" />

      <main className="relative z-10">
        <HeroSection data={data} />
        <ExperienceSection data={data} />
        <ProjectsSection data={data} />
        <SkillsSection data={data} />
        <ContactSection data={data} />
      </main>
    </div>
  );
}
