import Spinner from "@/components/spinner";
import ApplyButton from "@/components/templates/applybutton";

const AtlasTemplate = dynamic(() => import("@/components/templates/Atlas"), {
  loading: () => <Spinner />,
});
const CanvasTemplate = dynamic(() => import("@/components/templates/Canvas"), {
  loading: () => <Spinner />,
});

const HorizonTemplate = dynamic(
  () => import("@/components/templates/Horizon"),
  {
    loading: () => <Spinner />,
  },
);
const PulseTemplate = dynamic(() => import("@/components/templates/Pulse"), {
  loading: () => <Spinner />,
});

// data.ts
import { UserProfile } from "@repo/types"; // Adjust path if necessary
import dynamic from "next/dynamic";

const data: UserProfile = {
  // BaseUser fields
  id: "user_jdoe_9X7B4C",
  email: "john.doe@example.com",
  name: "John Doe",
  age: 29,
  stars: 342,
  isActive: true,
  username: "johndev",
  avatarUrl: "https://i.pravatar.cc/150?u=johndoe",
  bio: "Full-stack developer from Austin, Texas specializing in backend systems with Node.js and Express. Passionate about building scalable APIs, working with cloud-native solutions, and exploring modern DevOps practices on AWS.",
  available: true,
  location: "Austin, Texas, USA",
  resumeUrl: "https://example.com/resumes/john_doe.pdf",
  badges: ["AWS Certified", "JavaScript Ninja", "Open Source Contributor"],
  languages: ["English", "Spanish"],
  causes: ["STEM Education", "Environmental Sustainability"],
  isProfileComplete: true,
  TemplateId: null,
  createdAt: "2024-02-20T11:30:00.000Z",
  updatedAt: "2025-08-09T13:11:07.000Z",

  // Relational Fields
  skillsWithRelations: [
    {
      id: "skill_nodejs_01",
      name: "Node.js",
      description:
        "Proficiency in Node.js, including asynchronous programming, API development, and performance optimization.",
      userId: "user_jdoe_9X7B4C",
      projects: [
        {
          id: "proj_saas_backend_01",
          name: "SaaS Platform Backend",
          description:
            "RESTful and GraphQL API backend for a SaaS product with authentication, billing, and analytics modules.",
          imageUrl: null,
          url: "https://github.com/johndev/saas-backend",
          userId: "user_jdoe_9X7B4C",
        },
        {
          id: "proj_data_analytics_02",
          name: "Data Analytics Pipeline",
          description:
            "ETL pipeline using Node.js streams to process large datasets and store them in AWS Redshift.",
          imageUrl: null,
          url: "https://github.com/johndev/data-analytics",
          userId: "user_jdoe_9X7B4C",
        },
      ],
      certs: [
        {
          id: "cert_aws_dev_01",
          name: "AWS Certified Developer – Associate",
          description: null,
          imageUrl: "https://example.com/certs/aws-dev.png",
          acquiredAt: "2023-04-12T00:00:00.000Z",
          credentialUrl: "https://verify.cert/aws-dev-67890",
          userId: "user_jdoe_9X7B4C",
        },
      ],
      educations: [
        {
          id: "edu_bs_cs_01",
          institution: "University of Texas at Austin",
          degree: "B.S.",
          fieldOfStudy: "Computer Science",
          startDate: "2014-08-20T00:00:00.000Z",
          endDate: "2018-05-15T00:00:00.000Z",
          institutionUrl: "https://www.utexas.edu",
          description:
            "Focused on software engineering, distributed systems, and cloud computing.",
          imageUrl: null,
          grade: "3.7 GPA",
          activities: ["Hackathon Organizer", "Programming Club"],
          userId: "user_jdoe_9X7B4C",
          credentialUrl: null,
        },
      ],
      experiences: [
        {
          id: "exp_techwave_01",
          company: "TechWave Solutions",
          position: "Full-Stack Developer",
          startDate: "2018-06-01T00:00:00.000Z",
          endDate: null,
          companyUrl: "https://techwave.example.com",
          description:
            "Developing and maintaining backend and frontend features for enterprise SaaS applications.",
          imageUrl: "https://example.com/logos/techwave.png",
          userId: "user_jdoe_9X7B4C",
          credentialUrl: null,
        },
      ],
      user: {
        id: "user_jdoe_9X7B4C",
        email: "john.doe@example.com",
        name: "John Doe",
        age: 29,
        stars: 342,
        isActive: true,
        username: "johndev",
        avatarUrl: "https://i.pravatar.cc/150?u=johndoe",
        bio: "Full-stack developer from Austin, Texas specializing in backend systems with Node.js and Express. Passionate about building scalable APIs, working with cloud-native solutions, and exploring modern DevOps practices on AWS.",
        available: true,
        location: "Austin, Texas, USA",
        resumeUrl: "https://example.com/resumes/john_doe.pdf",
        badges: [
          "AWS Certified",
          "JavaScript Ninja",
          "Open Source Contributor",
        ],
        languages: ["English", "Spanish"],
        causes: ["STEM Education", "Environmental Sustainability"],
        isProfileComplete: true,
        TemplateId: null,
        createdAt: "2024-02-20T11:30:00.000Z",
        updatedAt: "2025-08-09T13:11:07.000Z",
      },
    },
    {
      id: "skill_express_02",
      name: "Express.js",
      description:
        "Expertise in building REST APIs and middleware with Express.js, handling authentication, routing, and error management.",
      userId: "user_jdoe_9X7B4C",
      projects: [
        {
          id: "proj_saas_backend_01",
          name: "SaaS Platform Backend",
          description:
            "RESTful and GraphQL API backend for a SaaS product with authentication, billing, and analytics modules.",
          imageUrl: null,
          url: "https://github.com/johndev/saas-backend",
          userId: "user_jdoe_9X7B4C",
        },
      ],
      certs: [],
      educations: [],
      experiences: [
        {
          id: "exp_techwave_01",
          company: "TechWave Solutions",
          position: "Full-Stack Developer",
          startDate: "2018-06-01T00:00:00.000Z",
          endDate: null,
          companyUrl: "https://techwave.example.com",
          description:
            "Developing and maintaining backend and frontend features for enterprise SaaS applications.",
          imageUrl: "https://example.com/logos/techwave.png",
          userId: "user_jdoe_9X7B4C",
          credentialUrl: null,
        },
      ],
      user: {
        id: "user_jdoe_9X7B4C",
        email: "john.doe@example.com",
        name: "John Doe",
        age: 29,
        stars: 342,
        isActive: true,
        username: "johndev",
        avatarUrl: "https://i.pravatar.cc/150?u=johndoe",
        bio: "Full-stack developer from Austin, Texas specializing in backend systems with Node.js and Express. Passionate about building scalable APIs, working with cloud-native solutions, and exploring modern DevOps practices on AWS.",
        available: true,
        location: "Austin, Texas, USA",
        resumeUrl: "https://example.com/resumes/john_doe.pdf",
        badges: [
          "AWS Certified",
          "JavaScript Ninja",
          "Open Source Contributor",
        ],
        languages: ["English", "Spanish"],
        causes: ["STEM Education", "Environmental Sustainability"],
        isProfileComplete: true,
        TemplateId: null,
        createdAt: "2024-02-20T11:30:00.000Z",
        updatedAt: "2025-08-09T13:11:07.000Z",
      },
    },
  ],
  recommendations: [
    {
      id: "rec_jane_smith_01",
      authorName: "Jane Smith",
      authorTitle: "Product Manager at TechWave Solutions",
      content:
        "John is a versatile and talented developer. His ability to handle complex backend systems and deliver high-quality results under tight deadlines is impressive. I highly recommend him.",
      platform: "LinkedIn",
    },
  ],
  socialLinks: [
    {
      id: "social_linkedin_01",
      platform: "LinkedIn",
      url: "https://linkedin.com/in",
      userId: "user_jdoe_9X7B4C",
    },
    {
      id: "social_github_02",
      platform: "GitHub",
      url: "https://github.com",
      userId: "user_jdoe_9X7B4C",
    },
  ],
  certsWithSkills: [
    {
      id: "cert_aws_dev_01",
      name: "AWS Certified Developer – Associate",
      description: null,
      imageUrl: "https://example.com/certs/aws-dev.png",
      acquiredAt: "2023-04-12T00:00:00.000Z",
      credentialUrl: "https://verify.cert/aws-dev-67890",
      userId: "user_jdoe_9X7B4C",
      skills: [
        {
          id: "skill_nodejs_01",
          name: "Node.js",
          description:
            "Proficiency in Node.js, including asynchronous programming, API development, and performance optimization.",
          userId: "user_jdoe_9X7B4C",
          createdAt: "2024-03-01T10:00:00.000Z",
          updatedAt: "2025-08-09T13:00:00.000Z",
        },
      ],
    },
  ],
  educationsWithSkills: [
    {
      id: "edu_bs_cs_01",
      institution: "University of Texas at Austin",
      degree: "B.S.",
      fieldOfStudy: "Computer Science",
      startDate: "2014-08-20T00:00:00.000Z",
      endDate: "2018-05-15T00:00:00.000Z",
      institutionUrl: "https://www.utexas.edu",
      description:
        "Focused on software engineering, distributed systems, and cloud computing.",
      imageUrl: null,
      grade: "3.7 GPA",
      activities: ["Hackathon Organizer", "Programming Club"],
      userId: "user_jdoe_9X7B4C",
      credentialUrl: null,
      skills: [
        {
          id: "skill_nodejs_01",
          name: "Node.js",
          description:
            "Proficiency in Node.js, including asynchronous programming, API development, and performance optimization.",
          userId: "user_jdoe_9X7B4C",
          createdAt: "2024-03-01T10:00:00.000Z",
          updatedAt: "2025-08-09T13:00:00.000Z",
        },
      ],
    },
  ],
  experiencesWithSkills: [
    {
      id: "exp_techwave_01",
      company: "TechWave Solutions",
      position: "Full-Stack Developer",
      startDate: "2018-06-01T00:00:00.000Z",
      endDate: null,
      companyUrl: "https://techwave.example.com",
      description:
        "Building and maintaining cloud-based SaaS applications using Node.js, Express, and React. Designed APIs, integrated payment gateways, and optimized database queries.",
      imageUrl: "https://example.com/logos/techwave.png",
      userId: "user_jdoe_9X7B4C",
      credentialUrl: null,
      skills: [
        {
          id: "skill_nodejs_01",
          name: "Node.js",
          description:
            "Proficiency in Node.js, including asynchronous programming, API development, and performance optimization.",
          userId: "user_jdoe_9X7B4C",
          createdAt: "2024-03-01T10:00:00.000Z",
          updatedAt: "2025-08-09T13:00:00.000Z",
        },
        {
          id: "skill_express_02",
          name: "Express.js",
          description:
            "Expertise in building REST APIs and middleware with Express.js, handling authentication, routing, and error management.",
          userId: "user_jdoe_9X7B4C",
          createdAt: "2024-03-01T10:05:00.000Z",
          updatedAt: "2025-08-09T13:05:00.000Z",
        },
      ],
    },
  ],
  projectsWithSkills: [
    {
      id: "proj_saas_backend_01",
      name: "SaaS Platform Backend",
      description:
        "RESTful and GraphQL API backend for a SaaS product with authentication, billing, and analytics modules.",
      imageUrl: null,
      url: "https://github.com/johndev/saas-backend",
      userId: "user_jdoe_9X7B4C",
      skills: [
        {
          id: "skill_nodejs_01",
          name: "Node.js",
          description:
            "Proficiency in Node.js, including asynchronous programming, API development, and performance optimization.",
          userId: "user_jdoe_9X7B4C",
          createdAt: "2024-03-01T10:00:00.000Z",
          updatedAt: "2025-08-09T13:00:00.000Z",
        },
        {
          id: "skill_express_02",
          name: "Express.js",
          description:
            "Expertise in building REST APIs and middleware with Express.js, handling authentication, routing, and error management.",
          userId: "user_jdoe_9X7B4C",
          createdAt: "2024-03-01T10:05:00.000Z",
          updatedAt: "2025-08-09T13:05:00.000Z",
        },
      ],
    },
    {
      id: "proj_data_analytics_02",
      name: "Data Analytics Pipeline",
      description:
        "ETL pipeline using Node.js streams to process large datasets and store them in AWS Redshift.",
      imageUrl: null,
      url: "https://github.com/johndev/data-analytics",
      userId: "user_jdoe_9X7B4C",
      skills: [
        {
          id: "skill_nodejs_01",
          name: "Node.js",
          description:
            "Proficiency in Node.js, including asynchronous programming, API development, and performance optimization.",
          userId: "user_jdoe_9X7B4C",
          createdAt: "2024-03-01T10:00:00.000Z",
          updatedAt: "2025-08-09T13:00:00.000Z",
        },
      ],
    },
  ],
};

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;

  let TemplateComponent = null;

  if (templateId === "140b76f2-b630-4546-bbf0-ae912ea5002b") {
    TemplateComponent = <PulseTemplate data={data} />;
  } else if (templateId === "4c3a1d73-dccc-4406-af9b-90546f601dd5") {
    TemplateComponent = <CanvasTemplate data={data} />;
  } else if (templateId === "9e1b1653-ee01-4f9f-835d-a437b4de87f5") {
    TemplateComponent = <HorizonTemplate data={data} />;
  } else if (templateId === "b53023bb-1fe3-4821-8e9a-318d51d93f1d") {
    TemplateComponent = <AtlasTemplate data={data} />;
  } else {
    return <div>Template not found</div>;
  }

  return (
    <div className="relative">
      {TemplateComponent}

      {/* Floating Button */}
      <ApplyButton id={templateId} />
    </div>
  );
}
