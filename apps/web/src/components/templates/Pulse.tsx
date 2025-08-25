"use client";
import { UserProfile } from "@repo/types";
import React, { useState, useEffect } from "react";

interface PortfolioProps {
  data: UserProfile;
}

const PulsePortfolio: React.FC<PortfolioProps> = ({ data }) => {
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
      33% { transform: translateY(-10px) rotate(1deg); }
      66% { transform: translateY(5px) rotate(-1deg); }
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
      50% { box-shadow: 0 0 30px rgba(255, 0, 255, 0.7), 0 0 40px rgba(0, 255, 255, 0.3); }
    }

    .animate-in {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .card {
      background: rgba(15, 25, 35, 0.8) !important;
      border: 1px solid rgba(0, 255, 255, 0.2) !important;
      border-radius: 20px !important;
      padding: 2rem !important;
      transition: all 0.3s ease !important;
      backdrop-filter: blur(20px) !important;
      position: relative !important;
      overflow: hidden !important;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(0, 255, 255, 0.03) 0%, rgba(255, 0, 255, 0.03) 100%);
      pointer-events: none;
    }

    .card:hover {
      transform: translateY(-8px) !important;
      border: 1px solid rgba(0, 255, 255, 0.5) !important;
      box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2), 0 0 30px rgba(255, 0, 255, 0.1) !important;
      background: rgba(15, 25, 35, 0.95) !important;
    }

    .hero-avatar {
      animation: glow 3s ease-in-out infinite !important;
    }

    .social-link:hover {
      transform: translateY(-3px) scale(1.1) !important;
      background: linear-gradient(135deg, #00ffff, #ff00ff) !important;
      box-shadow: 0 10px 25px rgba(0, 255, 255, 0.4) !important;
      color: #000 !important;
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
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .btn:hover::before {
      left: 100%;
    }

    .btn:hover {
      transform: translateY(-3px) !important;
      box-shadow: 0 15px 30px rgba(0, 255, 255, 0.3) !important;
    }

    .nav-link:hover {
      color: #00ffff !important;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.8) !important;
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
      "linear-gradient(135deg, #0a0f1a 0%, #1a0f2e 50%, #0f1a2e 100%)",
    color: "#ffffff",
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
    background: "rgba(10, 15, 26, 0.95)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(0, 255, 255, 0.2)",
  };

  const heroStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    background:
      "radial-gradient(ellipse at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%), radial-gradient(ellipse at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)",
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
              color: "#00ffff",
              textShadow: "0 0 10px rgba(0, 255, 255, 0.8)",
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
                  color: activeSection === section ? "#00ffff" : "#888",
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
          {/* Avatar */}
          {data?.avatarUrl && (
            <div
              className="hero-avatar"
              style={{
                position: "relative",
                display: "inline-flex",
                marginBottom: "2rem",
                background: "none",
                border: "none",
                width: "clamp(120px, 40vw, 200px)",
                height: "clamp(120px, 40vw, 200px)",
                borderRadius: "50%",
              }}
            >
              <img
                src={data.avatarUrl}
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
          )}

          {/* Name */}
          {data?.name && (
            <h1
              className="hero-name"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 900,
                marginBottom: "1rem",
                background:
                  "linear-gradient(135deg, #00ffff, #ff00ff, #00ffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
                animation: isLoaded ? "fadeInUp 1s ease-out 0.2s both" : "",
              }}
            >
              {data.name}
            </h1>
          )}

          {/* Position & Location */}
          {(data?.experiencesWithSkills?.[0]?.position || data?.location) && (
            <p
              style={{
                fontSize: "1.4rem",
                color: "#aaa",
                marginBottom: "1.5rem",
                animation: isLoaded ? "fadeInUp 1s ease-out 0.4s both" : "",
              }}
            >
              {data?.experiencesWithSkills?.[0]?.position ||
                "Software Developer"}
              {data?.location && ` • ${data.location}`}
            </p>
          )}

          {/* Bio */}
          {data?.bio && (
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                marginBottom: "2rem",
                color: "#ccc",
                maxWidth: "600px",
                margin: "0 auto 2rem",
                animation: isLoaded ? "fadeInUp 1s ease-out 0.6s both" : "",
              }}
            >
              {data.bio}
            </p>
          )}

          {/* Badges */}
          {data?.badges?.length > 0 && (
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
                    background: "rgba(0, 255, 255, 0.2)",
                    color: "#00ffff",
                    borderRadius: "25px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    border: "1px solid rgba(0, 255, 255, 0.3)",
                    margin: "0.25rem",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Hero Actions */}
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
            {data?.resumeUrl && (
              <a
                href={data.resumeUrl}
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.75rem 2rem",
                  borderRadius: "50px",
                  background: "linear-gradient(135deg, #00ffff, #0088cc)",
                  color: "#000",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 5px 15px rgba(0, 255, 255, 0.4)",
                }}
              >
                Download Resume
              </a>
            )}

            <a
              href="#contact"
              className="btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.75rem 2rem",
                borderRadius: "50px",
                background: "transparent",
                color: "#00ffff",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 700,
                border: "2px solid #00ffff",
                cursor: "pointer",
              }}
            >
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          {data?.socialLinks?.length > 0 && (
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
                    width: "auto",
                    height: "50px",
                    borderRadius: "10%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 255, 255, 0.1)",
                    color: "#00ffff",
                    textDecoration: "none",
                    border: "1px solid rgba(0, 255, 255, 0.3)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    padding: "10px",
                  }}
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
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
            background: "linear-gradient(135deg, #00ffff, #ff00ff)",
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
                color: "#00ffff",
                fontSize: "1.3rem",
              }}
            >
              Languages
            </h3>
            <div>
              {data?.languages?.map((lang, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    padding: "0.4rem 1rem",
                    background: "rgba(0, 255, 255, 0.15)",
                    color: "#00ffff",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    margin: "0.25rem",
                    border: "1px solid rgba(0, 255, 255, 0.2)",
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
                color: "#00ffff",
                fontSize: "1.3rem",
              }}
            >
              Causes I Care About
            </h3>
            <div>
              {data?.causes?.map((cause, index) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    padding: "0.4rem 1rem",
                    background: "rgba(255, 0, 255, 0.15)",
                    color: "#ff00ff",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    margin: "0.25rem",
                    border: "1px solid rgba(255, 0, 255, 0.2)",
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
            background: "linear-gradient(135deg, #00ffff, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Skills & Expertise
        </h2>

        {data?.skillsWithRelations?.length > 0 && (
          <div
            className="grid3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {data.skillsWithRelations.map((skill) => (
              <div key={skill.id} className="card">
                {skill.name && (
                  <h3
                    style={{
                      marginBottom: "1rem",
                      color: "#00ffff",
                      fontSize: "1.3rem",
                    }}
                  >
                    {skill.name}
                  </h3>
                )}

                {skill.description && (
                  <p
                    style={{
                      marginBottom: "1.5rem",
                      color: "#ccc",
                      lineHeight: 1.6,
                    }}
                  >
                    {skill.description}
                  </p>
                )}

                {skill.projects?.length > 0 && (
                  <div>
                    <h4
                      style={{
                        fontSize: "1rem",
                        marginBottom: "0.5rem",
                        color: "#ff00ff",
                      }}
                    >
                      Related Projects:
                    </h4>
                    {skill.projects.map(
                      (project) =>
                        project.name && (
                          <div
                            key={project.id}
                            style={{
                              fontSize: "0.9rem",
                              marginBottom: "0.25rem",
                              color: "#aaa",
                            }}
                          >
                            • {project.name}
                          </div>
                        ),
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Experience Section */}
      <section id="experience" style={sectionStyle} className="section">
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #00ffff, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Professional Experience
        </h2>

        {data?.experiencesWithSkills?.length > 0 && (
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
                {/* Timeline Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-1.5rem",
                    top: "1rem",
                    width: "1rem",
                    height: "1rem",
                    background: "#00ffff",
                    borderRadius: "50%",
                    border: "3px solid #0a0f1a",
                    boxShadow: "0 0 15px rgba(0, 255, 255, 0.7)",
                  }}
                ></div>

                {/* Timeline Line */}
                {index < data.experiencesWithSkills.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      left: "-1rem",
                      top: "2rem",
                      bottom: 0,
                      width: "2px",
                      background:
                        "linear-gradient(to bottom, #00ffff, #ff00ff)",
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
                      {exp.position && (
                        <h3
                          style={{
                            color: "#00ffff",
                            marginBottom: "0.5rem",
                            fontSize: "1.3rem",
                          }}
                        >
                          {exp.position}
                        </h3>
                      )}

                      {exp.company && (
                        <h4
                          style={{
                            color: "#ff00ff",
                            marginBottom: "0.5rem",
                            fontSize: "1.1rem",
                          }}
                        >
                          {exp.company}
                        </h4>
                      )}
                    </div>

                    {(exp.startDate || exp.endDate) && (
                      <div
                        style={{
                          textAlign: "right",
                          fontSize: "0.9rem",
                        }}
                      >
                        <div>
                          {exp.startDate && formatDate(exp.startDate)} -{" "}
                          {exp.endDate && formatDate(exp.endDate)}
                        </div>
                        {exp.startDate && exp.endDate && (
                          <div
                            style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}
                          >
                            {getExperienceDuration(exp.startDate, exp.endDate)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {exp.description && (
                    <p
                      style={{
                        marginBottom: "1rem",
                        color: "#ccc",
                        lineHeight: 1.6,
                      }}
                    >
                      {exp.description}
                    </p>
                  )}

                  {exp.skills?.length > 0 && (
                    <div>
                      {exp.skills.map(
                        (skill) =>
                          skill.name && (
                            <span
                              key={skill.id}
                              style={{
                                display: "inline-block",
                                padding: "0.3rem 0.8rem",
                                background: "rgba(0, 255, 255, 0.15)",
                                color: "#00ffff",
                                borderRadius: "15px",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                margin: "0.2rem",
                                border: "1px solid rgba(0, 255, 255, 0.2)",
                              }}
                            >
                              {skill.name}
                            </span>
                          ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Projects Section */}
      <section id="projects" style={sectionStyle} className="section">
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #00ffff, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Featured Projects
        </h2>

        {data?.projectsWithSkills?.length > 0 && (
          <div
            className="grid2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {data.projectsWithSkills.map((project) => (
              <div key={project.id} className="card">
                {project.name && (
                  <h3
                    style={{
                      marginBottom: "1rem",
                      color: "#00ffff",
                      fontSize: "1.3rem",
                    }}
                  >
                    {project.name}
                  </h3>
                )}

                {project.description && (
                  <p
                    style={{
                      marginBottom: "1.5rem",
                      color: "#ccc",
                      lineHeight: 1.6,
                    }}
                  >
                    {project.description}
                  </p>
                )}

                {project.skills?.length > 0 && (
                  <div style={{ marginBottom: "1.5rem" }}>
                    {project.skills.map(
                      (skill) =>
                        skill.name && (
                          <span
                            key={skill.id}
                            style={{
                              display: "inline-block",
                              padding: "0.3rem 0.8rem",
                              background: "rgba(255, 0, 255, 0.15)",
                              color: "#ff00ff",
                              borderRadius: "15px",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              margin: "0.2rem",
                              border: "1px solid rgba(255, 0, 255, 0.2)",
                            }}
                          >
                            {skill.name}
                          </span>
                        ),
                    )}
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
                      background: "linear-gradient(135deg, #00ffff, #0088cc)",
                      color: "#000",
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
        )}
      </section>

      {/* Education Section */}
      <section id="education" style={sectionStyle} className="section">
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #00ffff, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Education
        </h2>

        {data?.educationsWithSkills?.length > 0 && (
          <div
            className="grid2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {data.educationsWithSkills.map((edu) => (
              <div key={edu.id} className="card">
                {(edu.degree || edu.fieldOfStudy) && (
                  <h3
                    style={{
                      marginBottom: "0.5rem",
                      color: "#00ffff",
                      fontSize: "1.3rem",
                    }}
                  >
                    {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                  </h3>
                )}

                {edu.institution && (
                  <h4
                    style={{
                      marginBottom: "1rem",
                      color: "#ff00ff",
                      fontSize: "1.1rem",
                    }}
                  >
                    {edu.institution}
                  </h4>
                )}

                {(edu.startDate || edu.endDate || edu.grade) && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      fontSize: "0.9rem",
                      color: "#aaa",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <span>
                      {edu.startDate && formatDate(edu.startDate)} -{" "}
                      {edu.endDate && formatDate(edu.endDate)}
                    </span>
                    {edu.grade && (
                      <span style={{ color: "#00ffff" }}>{edu.grade}</span>
                    )}
                  </div>
                )}

                {edu.description && (
                  <p
                    style={{
                      marginBottom: "1rem",
                      color: "#ccc",
                      lineHeight: 1.6,
                    }}
                  >
                    {edu.description}
                  </p>
                )}

                {edu.activities?.length > 0 && (
                  <div>
                    <h5
                      style={{
                        fontSize: "1rem",
                        marginBottom: "0.5rem",
                        color: "#ff00ff",
                      }}
                    >
                      Activities:
                    </h5>
                    {edu.activities.map(
                      (activity, idx) =>
                        activity && (
                          <span
                            key={idx}
                            style={{
                              display: "inline-block",
                              padding: "0.3rem 0.8rem",
                              background: "rgba(0, 255, 255, 0.15)",
                              color: "#00ffff",
                              borderRadius: "15px",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              margin: "0.2rem",
                              border: "1px solid rgba(0, 255, 255, 0.2)",
                            }}
                          >
                            {activity}
                          </span>
                        ),
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" style={sectionStyle} className="section">
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #00ffff, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Let&apos;s Connect
        </h2>

        <div style={{ textAlign: "center" }}>
          <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
            {data.available !== undefined && (
              <p
                style={{
                  marginBottom: "2rem",
                  color: "#ccc",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                I&apos;m currently{" "}
                {data.available ? "available" : "not available"} for new
                opportunities.
                {data.available && " Let's discuss how we can work together!"}
              </p>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "2rem",
              }}
            >
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.75rem 2rem",
                    borderRadius: "50px",
                    background: "linear-gradient(135deg, #00ffff, #0088cc)",
                    color: "#000",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                >
                  Send Email
                </a>
              )}

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
                    background: "transparent",
                    color: "#00ffff",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: 700,
                    border: "2px solid #00ffff",
                  }}
                >
                  Download Resume
                </a>
              )}
            </div>

            {data?.socialLinks?.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
              >
                {data.socialLinks.map(
                  (link) =>
                    link.url &&
                    link.platform && (
                      <a
                        key={link.id}
                        href={link.url}
                        className="social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.platform}
                        style={{
                          width: "auto",
                          height: "60px",
                          borderRadius: "20%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(0, 255, 255, 0.1)",
                          color: "#00ffff",
                          textDecoration: "none",
                          border: "1px solid rgba(0, 255, 255, 0.3)",
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          padding: "10px",
                        }}
                      >
                        {link.platform}
                      </a>
                    ),
                )}
              </div>
            )}

            {(data.location || data.stars !== undefined) && (
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#aaa",
                  lineHeight: 1.6,
                }}
              >
                {data.location && (
                  <div style={{ marginBottom: "0.5rem" }}>
                    📍 {data.location}
                  </div>
                )}
                {data.stars !== undefined && (
                  <div>⭐ {data.stars} GitHub stars</div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "3rem 2rem",
          color: "#666",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(10, 15, 26, 0.5)",
        }}
      >
        <p>© 2025 {data.name}. Built with React & TypeScript.</p>
      </footer>
    </div>
  );
};

export default PulsePortfolio;
