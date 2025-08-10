"use client";
import { UserProfile } from "@repo/types";
import React, { useState, useEffect } from "react";

interface PortfolioProps {
  data: UserProfile;
}

const LightPortfolio: React.FC<PortfolioProps> = ({ data }) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getExperienceDuration = (start: string, end: string | null): string => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0)
      return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
    if (remainingMonths === 0) return `${years} year${years !== 1 ? "s" : ""}`;
    return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
  };

  const cssAnimations = `
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      scroll-behavior: smooth;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-8px) rotate(0.5deg); }
      66% { transform: translateY(4px) rotate(-0.5deg); }
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes gentleGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
      50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.4), 0 0 40px rgba(59, 130, 246, 0.2); }
    }

    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }

    .animate-in {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .card {
      background: rgba(255, 255, 255, 0.95) !important;
      border: 1px solid rgba(59, 130, 246, 0.2) !important;
      border-radius: 20px !important;
      padding: 2rem !important;
      transition: all 0.3s ease !important;
      backdrop-filter: blur(20px) !important;
      position: relative !important;
      overflow: hidden !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06) !important;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(168, 85, 247, 0.02) 100%);
      pointer-events: none;
    }

    .card:hover {
      transform: translateY(-8px) !important;
      border: 1px solid rgba(59, 130, 246, 0.4) !important;
      box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15), 0 0 30px rgba(168, 85, 247, 0.1) !important;
      background: rgba(255, 255, 255, 1) !important;
    }

    .hero-avatar {
      animation: gentleGlow 4s ease-in-out infinite !important;
    }

    .social-link:hover {
      transform: translateY(-3px) scale(1.1) !important;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6) !important;
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3) !important;
      color: #fff !important;
    }

    .btn {
      position: relative !important;
      overflow: hidden !important;
    }

    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.5s;
    }

    .btn:hover::before {
      left: 100%;
    }

    .btn:hover {
      transform: translateY(-3px) !important;
      box-shadow: 0 12px 25px rgba(59, 130, 246, 0.25) !important;
    }

    .nav-link:hover {
      color: #3b82f6 !important;
      text-shadow: 0 0 8px rgba(59, 130, 246, 0.6) !important;
    }

    .gradient-text {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
      background-size: 200% 200%;
      animation: shimmer 4s ease-in-out infinite;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none !important;
      }
      .hero-actions {
        flex-direction: column !important;
        align-items: center !important;
        gap: 1rem !important;
      }
      .grid2, .grid3 {
        grid-template-columns: 1fr !important;
        gap: 1.5rem !important;
      }
      .hero-container {
        padding: 0 1rem !important;
      }
      .section {
        padding: 4rem 1rem !important;
      }
      .timeline {
        padding-left: 1.5rem !important;
      }
      .hero-name {
        font-size: clamp(2rem, 8vw, 3rem) !important;
      }
      .section-title {
        font-size: clamp(1.5rem, 6vw, 2.5rem) !important;
      }
    }

    @media (max-width: 480px) {
      .nav-container {
        padding: 0.75rem 1rem !important;
      }
      .hero {
        min-height: 90vh !important;
      }
      .avatar-img {
        width: 150px !important;
        height: 150px !important;
      }
      .card {
        padding: 1.5rem !important;
      }
      .hero-actions {
        gap: 0.75rem !important;
      }
      .btn {
        padding: 0.6rem 1.5rem !important;
        font-size: 0.9rem !important;
      }
      .badge {
        padding: 0.4rem 1rem !important;
        font-size: 0.85rem !important;
        margin: 0.2rem !important;
      }
    }
  `;

  const containerStyle: React.CSSProperties = {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background:
      "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 20%, #f1f5f9 60%, #ffffff 100%)",
    color: "#1e293b",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    lineHeight: 1.6,
    fontSize: "16px",
    position: "relative",
  };

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(59, 130, 246, 0.15)",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.02)",
  };

  const heroStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    background:
      "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)",
    overflow: "hidden",
  };

  const sectionStyle: React.CSSProperties = {
    padding: "6rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    opacity: 0,
    transform: "translateY(40px)",
    transition: "all 0.8s ease-out",
  };

  return (
    <div style={containerStyle}>
      <style>{cssAnimations}</style>

      {/* Navigation */}
      <nav style={navStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1rem 2rem",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            @{data.username}
          </div>
          <div className="nav-links" style={{ display: "flex", gap: "2rem" }}>
            {[
              "hero",
              "about",
              "skills",
              "experience",
              "projects",
              "education",
              "contact",
            ].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="nav-link"
                style={{
                  color: activeSection === section ? "#3b82f6" : "#64748b",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" style={heroStyle}>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "800px",
            padding: "0 2rem",
            marginTop: "100px",
          }}
        >
          <div
            className="hero-avatar"
            style={{
              position: "relative",
              display: "inline-flex",
              marginBottom: "2rem",
              background: "none",
              border: "none",
              width: "clamp(120px, 40vw, 200px)", // min: 120px, max: 200px
              height: "clamp(120px, 40vw, 200px)",
              borderRadius: "50%",
            }}
          >
            <img
              src={data.avatarUrl || "/default-avatar.png"}
              alt={data.name}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #3b82f6",
                boxShadow:
                  "0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-8%",
                left: "-8%",
                right: "-8%",
                bottom: "-8%",
                border: "2px dashed rgba(168, 85, 247, 0.4)",
                borderRadius: "50%",
                animation: "spin 20s linear infinite",
              }}
            ></div>
          </div>

          <h1
            className="hero-name gradient-text"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 900,
              marginBottom: "1rem",
              animation: isLoaded ? "fadeInUp 1s ease-out 0.2s both" : "",
            }}
          >
            {data.name}
          </h1>

          <p
            style={{
              fontSize: "1.4rem",
              color: "#475569",
              marginBottom: "1.5rem",
              animation: isLoaded ? "fadeInUp 1s ease-out 0.4s both" : "",
              fontWeight: 500,
            }}
          >
            {data.experiencesWithSkills[0]?.position || "Software Developer"} •{" "}
            {data.location}
          </p>

          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              marginBottom: "2rem",
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto 2rem",
              animation: isLoaded ? "fadeInUp 1s ease-out 0.6s both" : "",
            }}
          >
            {data.bio}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
              animation: isLoaded ? "fadeInUp 1s ease-out 0.8s both" : "",
            }}
          >
            {data.badges.map((badge, index) => (
              <span
                key={index}
                className="badge"
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1.2rem",
                  background: "rgba(59, 130, 246, 0.1)",
                  color: "#3b82f6",
                  borderRadius: "25px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  margin: "0.25rem",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          <div
            className="hero-actions"
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              marginBottom: "3rem",
              animation: isLoaded ? "fadeInUp 1s ease-out 1s both" : "",
            }}
          >
            <a
              href={data.resumeUrl || "#"}
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.75rem 2rem",
                borderRadius: "50px",
                background: "linear-gradient(135deg, #3b82f6, #1e40af)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
              }}
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.75rem 2rem",
                borderRadius: "50px",
                background: "#fff",
                color: "#3b82f6",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 700,
                border: "2px solid #3b82f6",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              }}
            >
              Get In Touch
            </a>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              animation: isLoaded ? "fadeInUp 1s ease-out 1.2s both" : "",
            }}
          >
            {data.socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(59, 130, 246, 0.1)",
                  color: "#3b82f6",
                  textDecoration: "none",
                  border: "2px solid rgba(59, 130, 246, 0.2)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  transition: "all 0.3s ease",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                }}
              >
                {link.platform.charAt(0)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={sectionStyle} className="section">
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          About Me
        </h2>
        <div
          className="grid2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          <div className="card">
            <h3
              style={{
                marginBottom: "1rem",
                color: "#3b82f6",
                fontSize: "1.3rem",
                fontWeight: 600,
              }}
            >
              Languages
            </h3>
            <div>
              {data.languages.map((lang, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    padding: "0.4rem 1rem",
                    background: "rgba(59, 130, 246, 0.1)",
                    color: "#3b82f6",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    margin: "0.25rem",
                    border: "1px solid rgba(59, 130, 246, 0.15)",
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div className="card">
            <h3
              style={{
                marginBottom: "1rem",
                color: "#3b82f6",
                fontSize: "1.3rem",
                fontWeight: 600,
              }}
            >
              Causes I Care About
            </h3>
            <div>
              {data.causes.map((cause, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    padding: "0.4rem 1rem",
                    background: "rgba(168, 85, 247, 0.1)",
                    color: "#8b5cf6",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    margin: "0.25rem",
                    border: "1px solid rgba(168, 85, 247, 0.15)",
                  }}
                >
                  {cause}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={sectionStyle} className="section">
        <h2
          className="section-title"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Skills & Expertise
        </h2>
        <div
          className="grid3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {data.skillsWithRelations.map((skill, index) => (
            <div key={skill.id} className="card">
              <h3
                style={{
                  marginBottom: "1rem",
                  color: "#3b82f6",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                }}
              >
                {skill.name}
              </h3>
              <p
                style={{
                  marginBottom: "1.5rem",
                  color: "#64748b",
                  lineHeight: 1.6,
                }}
              >
                {skill.description}
              </p>
              {skill.projects.length > 0 && (
                <div>
                  <h4
                    style={{
                      fontSize: "1rem",
                      marginBottom: "0.5rem",
                      color: "#8b5cf6",
                      fontWeight: 600,
                    }}
                  >
                    Related Projects:
                  </h4>
                  {skill.projects.map((project) => (
                    <div
                      key={project.id}
                      style={{
                        fontSize: "0.9rem",
                        marginBottom: "0.25rem",
                        color: "#475569",
                      }}
                    >
                      • {project.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={sectionStyle} className="section">
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Professional Experience
        </h2>
        <div
          className="timeline"
          style={{
            position: "relative",
            paddingLeft: "2rem",
          }}
        >
          {data.experiencesWithSkills.map((exp, index) => (
            <div
              key={exp.id}
              style={{
                position: "relative",
                paddingBottom: "3rem",
                marginLeft: "1rem",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "-1.5rem",
                  top: "1rem",
                  width: "1rem",
                  height: "1rem",
                  background: "#8b5cf6",
                  borderRadius: "50%",
                  border: "3px solid #ffffff",
                  boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.2)",
                }}
              ></div>
              {index < data.experiencesWithSkills.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: "-1rem",
                    top: "2rem",
                    bottom: 0,
                    width: "2px",
                    background: "linear-gradient(to bottom, #3b82f6, #8b5cf6)",
                  }}
                ></div>
              )}
              <div className="card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        color: "#3b82f6",
                        marginBottom: "0.5rem",
                        fontSize: "1.3rem",
                        fontWeight: 600,
                      }}
                    >
                      {exp.position}
                    </h3>
                    <h4
                      style={{
                        color: "#8b5cf6",
                        marginBottom: "0.5rem",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      }}
                    >
                      {exp.company}
                    </h4>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      fontSize: "0.9rem",
                      color: "#475569",
                    }}
                  >
                    <div>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </div>
                    <div style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>
                      {getExperienceDuration(exp.startDate, exp.endDate)}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    marginBottom: "1rem",
                    color: "#64748b",
                    lineHeight: 1.6,
                  }}
                >
                  {exp.description}
                </p>
                {exp.skills && exp.skills.length > 0 && (
                  <div>
                    {exp.skills.map((skill) => (
                      <span
                        key={skill.id}
                        style={{
                          display: "inline-block",
                          padding: "0.3rem 0.8rem",
                          background: "rgba(59, 130, 246, 0.1)",
                          color: "#3b82f6",
                          borderRadius: "15px",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          margin: "0.2rem",
                          border: "1px solid rgba(59, 130, 246, 0.15)",
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={sectionStyle} className="section">
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Featured Projects
        </h2>
        <div
          className="grid2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {data.projectsWithSkills.map((project, index) => (
            <div key={project.id} className="card">
              <h3
                style={{
                  marginBottom: "1rem",
                  color: "#3b82f6",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                }}
              >
                {project.name}
              </h3>
              <p
                style={{
                  marginBottom: "1.5rem",
                  color: "#64748b",
                  lineHeight: 1.6,
                }}
              >
                {project.description}
              </p>
              {project.skills && project.skills.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  {project.skills.map((skill) => (
                    <span
                      key={skill.id}
                      style={{
                        display: "inline-block",
                        padding: "0.3rem 0.8rem",
                        background: "rgba(168, 85, 247, 0.1)",
                        color: "#8b5cf6",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        margin: "0.2rem",
                        border: "1px solid rgba(168, 85, 247, 0.15)",
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.6rem 1.5rem",
                    borderRadius: "25px",
                    background: "linear-gradient(135deg, #3b82f6, #1e40af)",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" style={sectionStyle} className="section">
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Education
        </h2>
        <div
          className="grid2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {data.educationsWithSkills.map((edu, index) => (
            <div key={edu.id} className="card">
              <h3
                style={{
                  marginBottom: "0.5rem",
                  color: "#3b82f6",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                }}
              >
                {edu.degree} in {edu.fieldOfStudy}
              </h3>
              <h4
                style={{
                  marginBottom: "1rem",
                  color: "#8b5cf6",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                {edu.institution}
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                  color: "#475569",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <span>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
                {edu.grade && (
                  <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                    {edu.grade}
                  </span>
                )}
              </div>
              {edu.description && (
                <p
                  style={{
                    marginBottom: "1rem",
                    color: "#64748b",
                    lineHeight: 1.6,
                  }}
                >
                  {edu.description}
                </p>
              )}
              {edu.activities && edu.activities.length > 0 && (
                <div>
                  <h5
                    style={{
                      fontSize: "1rem",
                      marginBottom: "0.5rem",
                      color: "#8b5cf6",
                      fontWeight: 600,
                    }}
                  >
                    Activities:
                  </h5>
                  {edu.activities.map((activity, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: "inline-block",
                        padding: "0.3rem 0.8rem",
                        background: "rgba(59, 130, 246, 0.1)",
                        color: "#3b82f6",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        margin: "0.2rem",
                        border: "1px solid rgba(59, 130, 246, 0.15)",
                      }}
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={sectionStyle} className="section">
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Let&apos;s Connect
        </h2>
        <div style={{ textAlign: "center" }}>
          <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h3
              style={{
                marginBottom: "1rem",
                color: "#3b82f6",
                fontSize: "1.5rem",
                fontWeight: 600,
              }}
            >
              Get In Touch
            </h3>
            <p
              style={{
                marginBottom: "2rem",
                color: "#64748b",
                fontSize: "1.1rem",
                lineHeight: 1.6,
              }}
            >
              I&apos;m currently{" "}
              {data.available ? "available" : "not available"} for new
              opportunities.
              {data.available && " Let's discuss how we can work together!"}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "2rem",
              }}
            >
              <a
                href={`mailto:${data.email}`}
                className="btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.75rem 2rem",
                  borderRadius: "50px",
                  background: "linear-gradient(135deg, #3b82f6, #1e40af)",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 700,
                }}
              >
                Send Email
              </a>
              {data.resumeUrl && (
                <a
                  href={data.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.75rem 2rem",
                    borderRadius: "50px",
                    background: "#fff",
                    color: "#3b82f6",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: 700,
                    border: "2px solid #3b82f6",
                  }}
                >
                  Download Resume
                </a>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              {data.socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.platform}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(59, 130, 246, 0.1)",
                    color: "#3b82f6",
                    textDecoration: "none",
                    border: "2px solid rgba(59, 130, 246, 0.2)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  {link.platform.charAt(0)}
                </a>
              ))}
            </div>

            <div
              style={{
                fontSize: "0.9rem",
                color: "#475569",
                lineHeight: 1.6,
              }}
            >
              <div style={{ marginBottom: "0.5rem" }}>📍 {data.location}</div>
              <div>⭐ {data.stars} GitHub stars</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "3rem 2rem",
          color: "#94a3b8",
          borderTop: "1px solid rgba(59, 130, 246, 0.1)",
          background: "rgba(248, 250, 252, 0.8)",
        }}
      >
        <p>© 2025 {data.name}. Built with React & TypeScript.</p>
      </footer>
    </div>
  );
};

export default LightPortfolio;
