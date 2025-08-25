"use client";
import { UserProfile } from "@repo/types";
import React, { useState, useEffect } from "react";

interface PortfolioProps {
  data: UserProfile;
}

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
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

  const cssStyles = `
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #0a0f1a 0%, #1a0f2e 50%, #0f1a2e 100%);
      color: #ffffff;
      overflow-x: hidden;
    }

    .portfolio-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0a0f1a 0%, #1a0f2e 50%, #0f1a2e 100%);
    }

    /* Navigation Styles */
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(10, 15, 26, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(147, 51, 234, 0.3);
      transition: all 0.3s ease;
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0.75rem 1rem;
    }

    @media (min-width: 640px) {
      .nav-container {
        padding: 1rem 1.5rem;
      }
    }

    @media (min-width: 768px) {
      .nav-container {
        padding: 1rem 2rem;
      }
    }

    .nav-brand {
      font-size: 1.125rem;
      font-weight: 800;
      color: #a855f7;
      text-shadow: 0 0 10px rgba(168, 85, 247, 0.8);
    }

    @media (min-width: 640px) {
      .nav-brand {
        font-size: 1.25rem;
      }
    }

    @media (min-width: 768px) {
      .nav-brand {
        font-size: 1.5rem;
      }
    }

    .nav-links {
      display: none;
      gap: 1rem;
    }

    @media (min-width: 768px) {
      .nav-links {
        display: flex;
        gap: 1.5rem;
      }
    }

    @media (min-width: 1024px) {
      .nav-links {
        gap: 2rem;
      }
    }

    .nav-link {
      color: #9ca3af;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    @media (min-width: 768px) {
      .nav-link {
        font-size: 1rem;
      }
    }

    .nav-link:hover,
    .nav-link.active {
      color: #a855f7;
      text-shadow: 0 0 8px rgba(168, 85, 247, 0.8);
    }

    /* Hero Section Styles */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 4rem 1rem;
      background: linear-gradient(135deg, #581c87 0%, #000000 50%, #000000 100%);
      position: relative;
      overflow: hidden;
    }

    @media (min-width: 640px) {
      .hero {
        padding: 5rem 1.5rem;
      }
    }

    @media (min-width: 768px) {
      .hero {
        padding: 6rem 2rem;
      }
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(ellipse at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%),
                  radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-10px) rotate(1deg); }
      66% { transform: translateY(5px) rotate(-1deg); }
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 48rem;
      width: 100%;
    }

    /* Avatar Styles */
    .avatar-container {
      position: relative;
      display: inline-block;
      margin-bottom: 1.5rem;
    }

    .avatar {
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #a855f7;
      box-shadow: 0 10px 30px rgba(168, 85, 247, 0.4);
      transition: transform 0.3s ease;
    }

    @media (min-width: 640px) {
      .avatar {
        width: 9rem;
        height: 9rem;
      }
    }

    @media (min-width: 768px) {
      .avatar {
        width: 10rem;
        height: 10rem;
      }
    }

    .avatar-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 4px solid #c4b5fd;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Typography */
    .hero-name {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      margin-bottom: 0.5rem;
      line-height: 1.2;
    }

    @media (min-width: 640px) {
      .hero-name {
        font-size: 1.875rem;
      }
    }

    @media (min-width: 768px) {
      .hero-name {
        font-size: 3rem;
      }
    }

    .hero-title {
      font-size: 1rem;
      color: #d1d5db;
      margin-bottom: 1rem;
    }

    @media (min-width: 640px) {
      .hero-title {
        font-size: 1.125rem;
      }
    }

    @media (min-width: 768px) {
      .hero-title {
        font-size: 1.25rem;
      }
    }

    .hero-bio {
      max-width: 32rem;
      font-size: 0.875rem;
      color: #9ca3af;
      margin: 0 auto 1.5rem;
      line-height: 1.6;
    }

    @media (min-width: 640px) {
      .hero-bio {
        font-size: 1rem;
      }
    }

    /* Badges */
    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 2rem;
      justify-content: center;
      max-width: 36rem;
      margin-left: auto;
      margin-right: auto;
    }

    .badge {
      padding: 0.25rem 0.75rem;
      background: rgba(147, 51, 234, 0.2);
      color: #c4b5fd;
      border-radius: 9999px;
      font-size: 0.75rem;
    }

    @media (min-width: 640px) {
      .badge {
        font-size: 0.875rem;
      }
    }

    /* Buttons */
    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 2rem;
      justify-content: center;
    }

    @media (min-width: 640px) {
      .button-group {
        gap: 1rem;
      }
    }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: fit-content;
    }

    @media (min-width: 640px) {
      .btn {
        padding: 0.5rem 1.5rem;
        font-size: 1rem;
      }
    }

    .btn-primary {
      background: #a855f7;
      color: white;
      box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);
    }

    .btn-primary:hover {
      background: #9333ea;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(168, 85, 247, 0.6);
    }

    .btn-outline {
      border: 1px solid #a855f7;
      color: #c4b5fd;
      background: transparent;
    }

    .btn-outline:hover {
      background: rgba(147, 51, 234, 0.1);
    }

    /* Social Links */
    .social-links {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
    }

    @media (min-width: 640px) {
      .social-links {
        gap: 1rem;
      }
    }

    .social-link {
      width: auto;
      height: 2.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10%;
      border: 1px solid #a855f7;
      color: #c4b5fd;
      text-decoration: none;
      transition: all 0.3s ease;
      padding: 5px;
    }

    @media (min-width: 640px) {
      .social-link {
        width: auto;
        height: 2.5rem;
      }
    }

    .social-link:hover {
      background: rgba(147, 51, 234, 0.2);
    }

    /* Section Styles */
    .section {
      padding: 4rem 1rem;
      max-width: 72rem;
      margin: 0 auto;
    }

    @media (min-width: 640px) {
      .section {
        padding: 4rem 1.5rem;
      }
    }

    @media (min-width: 768px) {
      .section {
        padding: 4rem 2rem;
      }
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #a855f7;
      margin-bottom: 2rem;
    }

    @media (min-width: 640px) {
      .section-title {
        font-size: 1.875rem;
      }
    }

    /* Grid Layouts */
    .grid {
      display: grid;
      gap: 1.5rem;
    }

    .grid-2 {
      grid-template-columns: 1fr;
    }

    @media (min-width: 640px) {
      .grid-2 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .grid-3 {
      grid-template-columns: 1fr;
    }

    @media (min-width: 640px) {
      .grid-3 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .grid-3 {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    /* Card Styles */
    .card {
      background: #111827;
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(147, 51, 234, 0.2);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .card:hover {
      transform: translateY(-5px);
      border-color: rgba(147, 51, 234, 0.4);
      box-shadow: 0 20px 40px rgba(147, 51, 234, 0.2);
    }

    .card h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #c4b5fd;
      margin-bottom: 0.5rem;
    }

    .card h4 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #a855f7;
      margin-bottom: 0.25rem;
    }

    .card p {
      color: #9ca3af;
      line-height: 1.6;
      margin-bottom: 1rem;
      flex-grow: 1;
    }

    /* Timeline Styles */
    .timeline {
      position: relative;
      padding-left: 1.5rem;
    }

    @media (min-width: 768px) {
      .timeline {
        padding-left: 2rem;
      }
    }

    .timeline-item {
      position: relative;
      padding-bottom: 2rem;
      margin-left: 0.75rem;
    }

    @media (min-width: 768px) {
      .timeline-item {
        margin-left: 1rem;
      }
    }

    .timeline-dot {
      position: absolute;
      left: -1rem;
      top: 1rem;
      width: 0.75rem;
      height: 0.75rem;
      background: #a855f7;
      border-radius: 50%;
      border: 3px solid #0a0f1a;
      box-shadow: 0 0 10px rgba(168, 85, 247, 0.7);
    }

    @media (min-width: 768px) {
      .timeline-dot {
        left: -1.25rem;
        width: 1rem;
        height: 1rem;
      }
    }

    .timeline-line {
      position: absolute;
      left: -0.75rem;
      top: 1.5rem;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, #a855f7, transparent);
    }

    @media (min-width: 768px) {
      .timeline-line {
        left: -1rem;
      }
    }

    /* Responsive Text */
    .text-responsive {
      font-size: 0.875rem;
      line-height: 1.5;
    }

    @media (min-width: 640px) {
      .text-responsive {
        font-size: 1rem;
      }
    }

    /* Animation Classes */
    .animate-in {
      animation: fadeInUp 0.8s ease-out forwards;
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

    /* Mobile Menu (if needed) */
    @media (max-width: 767px) {
      .nav-links {
        display: none;
      }
    }
  `;

  return (
    <div className="portfolio-container">
      <style>{cssStyles}</style>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-brand">@{data.username}</div>
          <div className="nav-links">
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
                className={`nav-link ${activeSection === section ? "active" : ""}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          {/* Avatar */}
          <div className="avatar-container">
            <img
              src={data.avatarUrl || "/default-avatar.png"}
              alt={data.name}
              className="avatar"
            />
            <div className="avatar-ring"></div>
          </div>

          {/* Name & Title */}
          <h1 className="hero-name">{data.name}</h1>
          <p className="hero-title">
            {data?.experiencesWithSkills &&
            data.experiencesWithSkills.length > 0
              ? data.experiencesWithSkills[0].position
              : "Software Developer"}{" "}
            • {data?.location}
          </p>
          <p className="hero-bio">{data.bio}</p>

          {/* Badges */}
          <div className="badges">
            {data.badges.map((badge, i) => (
              <span key={i} className="badge">
                {badge}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="button-group">
            <a
              href={data.resumeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Download Resume
            </a>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          <div className="social-links">
            {data.socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
                className="social-link"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <h2 className="section-title">About Me</h2>
        <div className="grid grid-2">
          <div className="card">
            <h3>Languages</h3>
            <div>
              {data.languages.map((lang, i) => (
                <span key={i} className="badge" style={{ margin: "0.25rem" }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Causes I Care About</h3>
            <div>
              {data.causes.map((cause, i) => (
                <span key={i} className="badge" style={{ margin: "0.25rem" }}>
                  {cause}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="grid grid-3">
          {data.skillsWithRelations.map((skill) => (
            <div key={skill.id} className="card">
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
              {skill.projects.length > 0 && (
                <div>
                  <h4>Related Projects:</h4>
                  {skill.projects.map((project) => (
                    <div
                      key={project.id}
                      className="text-responsive"
                      style={{ color: "#d1d5db", marginBottom: "0.25rem" }}
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
      <section id="experience" className="section">
        <h2 className="section-title">Professional Experience</h2>
        <div className="timeline">
          {data.experiencesWithSkills.map((exp, index) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot"></div>
              {index < data.experiencesWithSkills.length - 1 && (
                <div className="timeline-line"></div>
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
                    <h3>{exp.position}</h3>
                    <h4>{exp.company}</h4>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      fontSize: "0.875rem",
                      color: "#9ca3af",
                    }}
                  >
                    <div>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </div>
                    <div style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>
                      {getExperienceDuration(exp.startDate, exp.endDate)}
                    </div>
                  </div>
                </div>
                <p>{exp.description}</p>
                {exp.skills && exp.skills.length > 0 && (
                  <div>
                    {exp.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="badge"
                        style={{ margin: "0.25rem" }}
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
      <section id="projects" className="section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid grid-2">
          {data.projectsWithSkills.map((project) => (
            <div key={project.id} className="card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              {project.skills && project.skills.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  {project.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="badge"
                      style={{ margin: "0.25rem" }}
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
                  className="btn btn-primary"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section">
        <h2 className="section-title">Education</h2>
        <div className="grid grid-2">
          {data.educationsWithSkills.map((edu) => (
            <div key={edu.id} className="card">
              <h3>
                {edu.degree} in {edu.fieldOfStudy}
              </h3>
              <h4>{edu.institution}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  fontSize: "0.875rem",
                  color: "#9ca3af",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <span>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
                {edu.grade && (
                  <span style={{ color: "#a855f7" }}>{edu.grade}</span>
                )}
              </div>
              {edu.description && <p>{edu.description}</p>}
              {edu.activities && edu.activities.length > 0 && (
                <div>
                  <h4>Activities:</h4>
                  {edu.activities.map((activity, idx) => (
                    <span
                      key={idx}
                      className="badge"
                      style={{ margin: "0.25rem" }}
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

      {/* Certifications Section */}
      {data.certsWithSkills && data.certsWithSkills.length > 0 && (
        <section id="certifications" className="section">
          <h2 className="section-title">Certifications</h2>
          <div className="grid grid-3">
            {data.certsWithSkills.map((cert) => (
              <div key={cert.id} className="card">
                <h3>{cert.name}</h3>
                <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
                  Acquired: {formatDate(cert.acquiredAt)}
                </p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    Verify Credential →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="section">
        <h2 className="section-title">Let&apos;s Connect</h2>
        <div style={{ textAlign: "center" }}>
          <div className="card" style={{ maxWidth: "32rem", margin: "0 auto" }}>
            <h3>Get In Touch</h3>
            <p style={{ fontSize: "1.125rem", marginBottom: "2rem" }}>
              I&apos;m currently{" "}
              {data.available ? "available" : "not available"} for new
              opportunities.
              {data.available && " Let's discuss how we can work together!"}
            </p>

            <div className="button-group" style={{ marginBottom: "2rem" }}>
              <a href={`mailto:${data.email}`} className="btn btn-primary">
                Send Email
              </a>
              {data.resumeUrl && (
                <a
                  href={data.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Download Resume
                </a>
              )}
            </div>

            <div className="social-links" style={{ marginBottom: "2rem" }}>
              {data.socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.platform}
                  className="social-link"
                  style={{
                    width: "6rem",
                    height: "3.5rem",
                    fontSize: "1.25rem",
                  }}
                >
                  {link.platform}
                </a>
              ))}
            </div>

            <div style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              <div>📍 {data.location}</div>
              <div>⭐ {data.stars} GitHub stars</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "2rem",
          color: "#6b7280",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <p>© 2025 {data.name}. Built with React & TypeScript.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
