import AtlasTemplate from "@/components/templates/Atlas";
import CanvasTemplate from "@/components/templates/Canvas";
import HorizonTemplate from "@/components/templates/Horizon";
import PulseTemplate from "@/components/templates/Pulse";

// data.ts
import { UserProfile } from "@repo/types"; // Adjust path if necessary

const data: UserProfile = {
  // BaseUser fields
  id: "user_psharma_8H1A2B",
  email: "priya.sharma@example.com",
  name: "Priya Sharma",
  age: 26,
  stars: 256,
  isActive: true,
  username: "priyacodes",
  avatarUrl: "https://i.pravatar.cc/150?u=priyasharma",
  bio: "Software Developer from Meerut with a specialization in backend systems using Python and Django. Passionate about building scalable APIs, working with data, and exploring cloud technologies on AWS.",
  available: true,
  location: "Meerut, Uttar Pradesh, India",
  resumeUrl: "https://example.com/resumes/priya_sharma.pdf",
  badges: ["AWS Certified", "Pythonista", "Community Helper"],
  languages: ["English", "Hindi"],
  causes: ["Tech Education", "Animal Welfare"],
  isProfileComplete: true,
  TemplateId: null,
  createdAt: "2024-02-20T11:30:00.000Z",
  updatedAt: "2025-08-09T13:11:07.000Z",

  // Relational Fields
  skillsWithRelations: [
    {
      id: "skill_python_01",
      name: "Python",
      description:
        "Core proficiency in Python 3, including data structures, algorithms, and standard library usage.",
      userId: "user_psharma_8H1A2B",
      projects: [
        {
          id: "proj_ecom_backend_01",
          name: "E-commerce API",
          description:
            "A robust RESTful API for an e-commerce platform with features like product management, user authentication, and order processing.",
          imageUrl: null,
          url: "https://github.com/priyacodes/ecommerce-api",
          userId: "user_psharma_8H1A2B",
        },
        {
          id: "proj_data_pipeline_02",
          name: "Data Processing Pipeline",
          description:
            "ETL pipeline to process user activity logs using Pandas and store results in a data warehouse.",
          imageUrl: null,
          url: "https://github.com/priyacodes/data-pipeline",
          userId: "user_psharma_8H1A2B",
        },
      ],
      certs: [
        {
          id: "cert_pcep_01",
          name: "PCEP – Certified Entry-Level Python Programmer",
          description: null,
          imageUrl: "https://example.com/certs/pcep.png",
          acquiredAt: "2022-05-10T00:00:00.000Z",
          credentialUrl: "https://verify.cert/pcep-12345",
          userId: "user_psharma_8H1A2B",
        },
      ],
      educations: [
        {
          id: "edu_btech_cs_01",
          institution: "Meerut Institute of Engineering & Technology",
          degree: "B.Tech",
          fieldOfStudy: "Computer Science",
          startDate: "2017-08-01T00:00:00.000Z",
          endDate: "2021-06-15T00:00:00.000Z",
          institutionUrl: "https://miet.ac.in",
          description:
            "Graduated with honors, focusing on software development and database management.",
          imageUrl: null,
          grade: "8.5 CGPA",
          activities: ["Coding Club Lead", "Hackathon Participant"],
          userId: "user_psharma_8H1A2B",
          credentialUrl: null,
        },
      ],
      experiences: [
        {
          id: "exp_devtrio_01",
          company: "DevTrio Solutions",
          position: "Backend Developer",
          startDate: "2021-07-01T00:00:00.000Z",
          endDate: null,
          companyUrl: "https://devtrio.example.com",
          description:
            "Designing, developing, and deploying backend services for various client projects.",
          imageUrl: "https://example.com/logos/devtrio.png",
          userId: "user_psharma_8H1A2B",
          credentialUrl: null,
        },
      ],
      user: {
        id: "user_psharma_8H1A2B",
        email: "priya.sharma@example.com",
        name: "Priya Sharma",
        age: 26,
        stars: 256,
        isActive: true,
        username: "priyacodes",
        avatarUrl: "https://i.pravatar.cc/150?u=priyasharma",
        bio: "Software Developer from Meerut with a specialization in backend systems using Python and Django. Passionate about building scalable APIs, working with data, and exploring cloud technologies on AWS.",
        available: true,
        location: "Meerut, Uttar Pradesh, India",
        resumeUrl: "https://example.com/resumes/priya_sharma.pdf",
        badges: ["AWS Certified", "Pythonista", "Community Helper"],
        languages: ["English", "Hindi"],
        causes: ["Tech Education", "Animal Welfare"],
        isProfileComplete: true,
        TemplateId: null,
        createdAt: "2024-02-20T11:30:00.000Z",
        updatedAt: "2025-08-09T13:11:07.000Z",
      },
    },
    {
      id: "skill_django_02",
      name: "Django",
      description:
        "Expertise in building web applications and APIs using the Django & Django REST Framework.",
      userId: "user_psharma_8H1A2B",
      projects: [
        {
          id: "proj_ecom_backend_01",
          name: "E-commerce API",
          description:
            "A robust RESTful API for an e-commerce platform with features like product management, user authentication, and order processing.",
          imageUrl: null,
          url: "https://github.com/priyacodes/ecommerce-api",
          userId: "user_psharma_8H1A2B",
        },
      ],
      certs: [],
      educations: [],
      experiences: [
        {
          id: "exp_devtrio_01",
          company: "DevTrio Solutions",
          position: "Backend Developer",
          startDate: "2021-07-01T00:00:00.000Z",
          endDate: null,
          companyUrl: "https://devtrio.example.com",
          description:
            "Designing, developing, and deploying backend services for various client projects.",
          imageUrl: "https://example.com/logos/devtrio.png",
          userId: "user_psharma_8H1A2B",
          credentialUrl: null,
        },
      ],
      user: {
        id: "user_psharma_8H1A2B",
        email: "priya.sharma@example.com",
        name: "Priya Sharma",
        age: 26,
        stars: 256,
        isActive: true,
        username: "priyacodes",
        avatarUrl: "https://i.pravatar.cc/150?u=priyasharma",
        bio: "Software Developer from Meerut with a specialization in backend systems using Python and Django. Passionate about building scalable APIs, working with data, and exploring cloud technologies on AWS.",
        available: true,
        location: "Meerut, Uttar Pradesh, India",
        resumeUrl: "https://example.com/resumes/priya_sharma.pdf",
        badges: ["AWS Certified", "Pythonista", "Community Helper"],
        languages: ["English", "Hindi"],
        causes: ["Tech Education", "Animal Welfare"],
        isProfileComplete: true,
        TemplateId: null,
        createdAt: "2024-02-20T11:30:00.000Z",
        updatedAt: "2025-08-09T13:11:07.000Z",
      },
    },
  ],
  recommendations: [
    {
      id: "rec_rahul_gupta_01",
      authorName: "Rahul Gupta",
      authorTitle: "Project Manager at DevTrio Solutions",
      content:
        "Priya is a highly skilled and dedicated developer. Her contributions to our backend projects were invaluable, and she consistently delivered high-quality, maintainable code on schedule. I highly recommend her.",
      platform: "LinkedIn",
    },
  ],
  socialLinks: [
    {
      id: "social_linkedin_01",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/priyacodes",
      userId: "user_psharma_8H1A2B",
    },
    {
      id: "social_github_02",
      platform: "GitHub",
      url: "https://github.com/priyacodes",
      userId: "user_psharma_8H1A2B",
    },
  ],
  certsWithSkills: [
    {
      id: "cert_pcep_01",
      name: "PCEP – Certified Entry-Level Python Programmer",
      description: null,
      imageUrl: "https://example.com/certs/pcep.png",
      acquiredAt: "2022-05-10T00:00:00.000Z",
      credentialUrl: "https://verify.cert/pcep-12345",
      userId: "user_psharma_8H1A2B",
      skills: [
        {
          id: "skill_python_01",
          name: "Python",
          description:
            "Core proficiency in Python 3, including data structures, algorithms, and standard library usage.",
          userId: "user_psharma_8H1A2B",
          createdAt: "2024-03-01T10:00:00.000Z",
          updatedAt: "2025-08-09T13:00:00.000Z",
        },
      ],
    },
  ],
  educationsWithSkills: [
    {
      id: "edu_btech_cs_01",
      institution: "Meerut Institute of Engineering & Technology",
      degree: "B.Tech",
      fieldOfStudy: "Computer Science",
      startDate: "2017-08-01T00:00:00.000Z",
      endDate: "2021-06-15T00:00:00.000Z",
      institutionUrl: "https://miet.ac.in",
      description:
        "Graduated with honors, focusing on software development and database management.",
      imageUrl: null,
      grade: "8.5 CGPA",
      activities: ["Coding Club Lead", "Hackathon Participant"],
      userId: "user_psharma_8H1A2B",
      credentialUrl: null,
      skills: [
        {
          id: "skill_python_01",
          name: "Python",
          description:
            "Core proficiency in Python 3, including data structures, algorithms, and standard library usage.",
          userId: "user_psharma_8H1A2B",
          createdAt: "2024-03-01T10:00:00.000Z",
          updatedAt: "2025-08-09T13:00:00.000Z",
        },
      ],
    },
  ],
  experiencesWithSkills: [
    {
      id: "exp_devtrio_01",
      company: "DevTrio Solutions",
      position: "Backend Developer",
      startDate: "2021-07-01T00:00:00.000Z",
      endDate: null,
      companyUrl: "https://devtrio.example.com",
      description:
        "Designing, developing, and deploying backend services for various client projects using Django and Flask. Integrated third-party APIs and managed database migrations.",
      imageUrl: "https://example.com/logos/devtrio.png",
      userId: "user_psharma_8H1A2B",
      credentialUrl: null,
      skills: [
        {
          id: "skill_python_01",
          name: "Python",
          description:
            "Core proficiency in Python 3, including data structures, algorithms, and standard library usage.",
          userId: "user_psharma_8H1A2B",
          createdAt: "2024-03-01T10:00:00.000Z",
          updatedAt: "2025-08-09T13:00:00.000Z",
        },
        {
          id: "skill_django_02",
          name: "Django",
          description:
            "Expertise in building web applications and APIs using the Django & Django REST Framework.",
          userId: "user_psharma_8H1A2B",
          createdAt: "2024-03-01T10:05:00.000Z",
          updatedAt: "2025-08-09T13:05:00.000Z",
        },
      ],
    },
  ],
  projectsWithSkills: [
    {
      id: "proj_ecom_backend_01",
      name: "E-commerce API",
      description:
        "A robust RESTful API for an e-commerce platform with features like product management, user authentication, and order processing.",
      imageUrl: null,
      url: "https://github.com/priyacodes/ecommerce-api",
      userId: "user_psharma_8H1A2B",
      skills: [
        {
          id: "skill_python_01",
          name: "Python",
          description:
            "Core proficiency in Python 3, including data structures, algorithms, and standard library usage.",
          userId: "user_psharma_8H1A2B",
          createdAt: "2024-03-01T10:00:00.000Z",
          updatedAt: "2025-08-09T13:00:00.000Z",
        },
        {
          id: "skill_django_02",
          name: "Django",
          description:
            "Expertise in building web applications and APIs using the Django & Django REST Framework.",
          userId: "user_psharma_8H1A2B",
          createdAt: "2024-03-01T10:05:00.000Z",
          updatedAt: "2025-08-09T13:05:00.000Z",
        },
      ],
    },
    {
      id: "proj_data_pipeline_02",
      name: "Data Processing Pipeline",
      description:
        "ETL pipeline to process user activity logs using Pandas and store results in a data warehouse.",
      imageUrl: null,
      url: "https://github.com/priyacodes/data-pipeline",
      userId: "user_psharma_8H1A2B",
      skills: [
        {
          id: "skill_python_01",
          name: "Python",
          description:
            "Core proficiency in Python 3, including data structures, algorithms, and standard library usage.",
          userId: "user_psharma_8H1A2B",
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
      <button className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition-all">
        Use This Template
      </button>
    </div>
  );
}
