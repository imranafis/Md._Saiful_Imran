import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser"; // <-- REQUIRED FOR CONTACT FORM
import {
  Menu,
  X,
  Download,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight,
  Code2,
  Sparkles,
  User,
  Youtube,
} from "lucide-react";
import "./App.css";

// Assuming "profile image.png" is placed in the public folder or correctly imported
import profileImage from "./profile image.png";

// --- DATA CONSTANTS ---
const PROFILE_DATA = {
  name: "Md Saiful Imran",
  title: "FULL-STACK DEVELOPER",
  summary: [
    "I am a Full-Stack Developer skilled in building scalable, intuitive, and high-performance applications using React, TypeScript, Node.js, Firebase, and modern JavaScript ecosystems. My experience spans frontend architecture, backend services, REST APIs, real-time features, and Python scripting for automation.",
    "I’ve led development efforts end-to-end—designing component systems, improving performance, fixing critical issues, and maintaining production codebases with clean engineering practices. With strong problem-solving skills (supported by competitive programming experience) and hands-on work across MongoDB, Firestore, Redux/Context, and CI/CD workflows, I deliver reliable, maintainable, and user-centric software at scale.",
  ],
  contact: {
    phone: "8801630796340",
    email: "iimranafis@gmail.com",
    linkedin: "https://www.linkedin.com/in/imranafis/",
    github: "https://github.com/imranafis/",
    cv_link: "./Md._Saiful_Imran.pdf",
  },
  experience: {
    title: "WEB DEVELOPER (STARTUP)",
    company: "Notiveapp",
    duration: "2025 - Present",
    details: [
      "Led the development of the entire application from scratch using modern web technologies (likely React/Node.js), ensuring a robust and scalable architecture.",
      "Maintained and managed the complete codebase, applying best development practices and clean code principles for long-term stability.",
      "Fixed critical bugs and optimized application performance to significantly enhance user experience and Lighthouse scores.",
      "Ensured code quality, scalability, and adherence to modern development standards, including component patterns and state management.",
    ],
  },
  skills: {
    languages: "JavaScript, TypeScript, Python, C++, C#, HTML, CSS",
    web: "React.js, Hooks, Context API, Redux, Node.js, RESTful APIs, Firebase, Chrome Extension Development, JWT, WebSockets",
    database: "MongoDB, Firestore",
    tools:
      "Git, GitHub, Unity (Game Development), UI/UX Mindset, Performance Optimization, CI/CD Exposure",
  },
  projects: [
    {
      name: "Notiveapp",
      description:
        "A minimal yet powerful journaling app that helps you organize your day, capture thoughts effortlessly, and stay consistent with your goals.",
      link: "https://imranafis.github.io/Notive/",
      image: "./Notive.png",
    },

    {
      name: "AditorX ",
      description:
        "AditorX is a fast, flexible, and fully customizable rich text editor for modern web applications. It provides a smooth writing experience with built-in formatting tools, keyboard shortcuts, and an intuitive UI. Perfect for developers who need a lightweight but powerful editor.",
      link: "https://imranafis.github.io/AditorX/",
      image: "./AditorX.png",
    },

    {
      name: "AIUB AutoCaptcha",
      description:
        "Automatically solves simple math CAPTCHAs on the AIUB portal instantly on page load. Instantly solves AIUB captcha and auto-logs in using saved credentials. No need to click the extension — just install it and it works silently in the background.",
      link: "https://chromewebstore.google.com/detail/aiub-autocaptcha/kdflbpdcmknemkmmllpfdcpjohcknbhe",
      image: "./AIUB AutoCaptcha.png",
    },
    {
      name: "AIUB Form Filler",
      description:
        "AIUB Teachers Performance Evaluation - Questionnaires Form Filler. Simplify your AIUB Teachers Performance Evaluation process with this Chrome extension. Save time and complete evaluation forms effortlessly!",
      link: "https://chromewebstore.google.com/detail/aiub-form-filler/pogkfmlgcpoiiclfockmdkojpfbnhgep",
      image: "./AIUB Form Filler.png",
    },
    {
      name: "Aessenger",
      description:
        "A messaging application, real-time updates, high quality image sharing, and complex frontend state handling for chat environments.",
      link: "https://imranafis.github.io/Aessenger/",
      image: "./Aessenger.png",
    },
    {
      name: "MediScrape",
      description:
        "Extract data from Prescription, and gives a statistic report based on everything available on prescription.",
      link: "https://imranafis.github.io/MediScrape/",
      image: "./MediScrape.png",
    },
    {
      name: "Pre-registration",
      description:
        "AIUB Pre-registration type that gives an idea about which course is ready for next semester.",
      link: "https://imranafis.github.io/Pre-registration/",
      image: "./Pre-registration.png",
    },
  ],
};

// --- HELPER FUNCTIONS ---
const renderSkillTags = (skillString) => {
  if (!skillString) return [];
  return skillString
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
};

// --- NEW TYPEWRITER COMPONENT ---
const Typewriter = ({ text, speed = 150, deleteSpeed = 50, pause = 2000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (isDeleting) {
      if (displayedText.length > 0) {
        // Deleting
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
      }
    } else {
      if (displayedText.length < text.length) {
        // Typing
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, speed);
      } else {
        // Finished typing, wait (pause) before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text, speed, deleteSpeed, pause]);

  return <span className="typewriter-cursor">{displayedText}</span>;
};

// --- COMPONENTS ---

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      <Navigation
        currentPage={currentPage}
        navigate={navigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollY={scrollY}
      />
      <main className="main-content">
        {currentPage === "home" && <HomePage navigate={navigate} />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "projects" && <ProjectsPage />}
        {currentPage === "contact" && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

const Navigation = ({
  currentPage,
  navigate,
  menuOpen,
  setMenuOpen,
  scrollY,
}) => {
  const navItems = ["home", "about", "projects", "contact"];

  return (
    <header className={`navbar ${scrollY > 50 ? "scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => navigate("home")}>
        {PROFILE_DATA.name.split(" ")[2]}
        <span>.dev</span>
      </div>
      <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
        {navItems.map((item) => (
          <div
            key={item}
            className={`nav-item ${currentPage === item ? "active" : ""}`}
            onClick={() => navigate(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </div>
        ))}
      </nav>
      {/* FIXED: Using the HTML structure for the animated hamburger menu from CSS */}
      <div className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`hamburger-icon ${menuOpen ? "open" : ""}`}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </div>
    </header>
  );
};

// --- VIDEO RESUME COMPONENT (NEW) ---
const VideoResumeSection = () => {
  // Placeholder URL: REPLACE with your actual YouTube video embed link
  const VIDEO_URL = "https://www.youtube.com/embed/FmOU39w-VKc";

  return (
    <div className="home-section video-resume-section">
      <h3 className="section-title-small">
        <Youtube size={28} className="icon-left" /> Video Resume
      </h3>
      <div className="video-container">
        <iframe
          src={VIDEO_URL}
          title="Video Resume"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

const HomePage = ({ navigate }) => {
  const combinedTools =
    PROFILE_DATA.skills.database + ", " + PROFILE_DATA.skills.tools;

  return (
    <div className="page home-page">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span>{PROFILE_DATA.name}</span>
          </h1>
          <h2 className="hero-subtitle">
            {/* UPDATED: Uses Typewriter component */}
            <Typewriter text={PROFILE_DATA.title} />
          </h2>
          <div className="hero-summary">
            {PROFILE_DATA.summary.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate("projects")}
            >
              View Projects <ArrowRight size={20} />
            </button>
            <a
              href={PROFILE_DATA.contact.cv_link}
              className="btn btn-secondary"
              download
            >
              Download CV <Download size={20} />
            </a>
          </div>
          <div className="social-links">
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github Profile"
            >
              <Github size={24} />
            </a>
            <a
              href={PROFILE_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={`mailto:${PROFILE_DATA.contact.email}`}
              aria-label="Email Me"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img
            src={profileImage}
            alt={PROFILE_DATA.name}
            className="profile-image"
          />
        </div>
      </div>

      <div className="home-sections-grid">
        {/* INSERTED VIDEO RESUME SECTION HERE */}
        <VideoResumeSection />

        <div className="home-section experience-section">
          <h3 className="section-title-small">
            <Sparkles size={24} className="icon-left" /> Current Experience
          </h3>
          <div className="experience-card">
            <h4>
              {PROFILE_DATA.experience.title} at{" "}
              {PROFILE_DATA.experience.company}
            </h4>
            <span className="duration">{PROFILE_DATA.experience.duration}</span>
            <ul className="experience-details">
              {PROFILE_DATA.experience.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="home-section skills-home-section">
          <h3 className="section-title-small">
            <Code2 size={24} className="icon-left" /> Core Skills & Expertise
          </h3>

          <div className="skills-group">
            <h4 className="skills-group-title">Web & Frameworks:</h4>
            <div className="skills-tag-container">
              {renderSkillTags(PROFILE_DATA.skills.web).map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="skills-group">
            <h4 className="skills-group-title">Languages:</h4>
            <div className="skills-tag-container">
              {renderSkillTags(PROFILE_DATA.skills.languages).map(
                (skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="skills-group">
            <h4 className="skills-group-title">Databases & Tools:</h4>
            <div className="skills-tag-container">
              {renderSkillTags(combinedTools).map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="page about-page">
      <h1 className="page-title">
        <User size={32} className="icon-left" /> About Me
      </h1>
      <div className="about-content">
        <div className="about-text">
          <p>
            I'm {PROFILE_DATA.name}, a passionate and detail-oriented software
            developer currently pursuing a BSc in CSE at AIUB. My focus is on
            delivering high-quality, scalable web applications.
          </p>
          <p>
            My background combines strong Full-Stack development skills
            (React/Node.js) with exposure to Python for API integration, making
            me a well-rounded candidate for modern engineering teams. I thrive
            on challenges, from optimizing performance to integrating
            cutting-edge features like LLMs.
          </p>
          <p>
            The experience gained at Notiveapp allowed me to take ownership of
            an entire application's development and maintenance. This hands-on
            leadership has reinforced my ability to manage complex codebases,
            ensure high performance, and adhere to best development
            practices—skills crucial for fast-paced startup environments like
            Biniyog.
          </p>
        </div>
        <div className="about-details-card">
          <h3>Education</h3>
          <p>
            AMERICAN INTERNATIONAL UNIVERSITY (AIUB) BANGLADESH
            <br />
            BSc in CSE (2023-Present)
          </p>
          <br />
          <h3>Core Focus</h3>
          <ul>
            <li>Frontend Mastery (React, Hooks, Redux/Context)</li>
            <li>Backend Services (Node.js/Nest.js Concepts)</li>
            <li>Python Integration & Scripting</li>
            <li>Clean Code & Performance Optimization</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- PROJECTS PAGE (Uses CSS for Zig-Zag and Neon Hover) ---
const ProjectsPage = () => {
  return (
    <div className="page projects-page">
      <h1 className="page-title">
        <Code2 size={45} className="icon-left" /> My Projects
      </h1>
      <div className="projects-grid">
        {PROFILE_DATA.projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-content">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View Project <ExternalLink size={18} />
              </a>
            </div>
            <div className="project-image-container">
              <img
                src={project.image}
                alt={`${project.name} Preview`}
                className="project-image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- CONTACT PAGE (Functional with EmailJS keys) ---
const ContactPage = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [focused, setFocused] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // ============================================================
    // HARD-CODED EMAILJS KEYS (PROVIDED BY USER)
    // ============================================================
    const SERVICE_ID = "service_cc8gkug";
    const TEMPLATE_ID = "template_pm7nwlr";
    const PUBLIC_KEY = "UbIoJBS4kf8Qlh-76";
    // ============================================================

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          alert("Message Sent Successfully!");
          setIsSending(false);
          e.target.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Failed to send message. Please try again later.");
          setIsSending(false);
        }
      );
  };

  const handleFocus = (id) => setFocused(id);
  const handleBlur = () => setFocused("");

  return (
    <div className="page contact-page">
      <h1 className="page-title">
        <Mail size={42} className="icon-left" /> Get In Touch
      </h1>
      <div className="contact-container">
        <div className="contact-info">
          <h3 className="section-title-small">Contact Details</h3>
          <p>
            I am actively seeking new opportunities, particularly roles that
            involve React, Node.js, and Python for innovative product
            development. Feel free to reach out to discuss potential projects or
            employment!
          </p>
          <div className="info-group">
            <strong>Email:</strong>{" "}
            <a href={`mailto:${PROFILE_DATA.contact.email}`}>
              {PROFILE_DATA.contact.email}
            </a>
          </div>
          <div className="info-group">
            <strong>Phone:</strong> {PROFILE_DATA.contact.phone}
          </div>
          <div className="social-links-contact">
            <a
              href={PROFILE_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={28} />
            </a>
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github Profile"
            >
              <Github size={28} />
            </a>
          </div>
          <div className="contact-image-wrapper">
            <img
              src={profileImage}
              alt={PROFILE_DATA.name}
              className="profile-image-contact"
            />
          </div>
        </div>
        <div className="contact-form-wrapper">
          <h3 className="section-title-small">Send Me a Message</h3>
          <form ref={form} className="contact-form" onSubmit={sendEmail}>
            <div className="form-group">
              <label htmlFor="user_name">Name</label>
              {/* Note: name attribute is crucial for EmailJS */}
              <input
                type="text"
                name="user_name"
                id="user_name"
                onFocus={() => handleFocus("user_name")}
                onBlur={handleBlur}
                className={focused === "user_name" ? "focused" : ""}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="user_email">Email</label>
              {/* Note: name attribute is crucial for EmailJS */}
              <input
                type="email"
                name="user_email"
                id="user_email"
                onFocus={() => handleFocus("user_email")}
                onBlur={handleBlur}
                className={focused === "user_email" ? "focused" : ""}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              {/* Note: name attribute is crucial for EmailJS */}
              <textarea
                name="message"
                id="message"
                onFocus={() => handleFocus("message")}
                onBlur={handleBlur}
                className={focused === "message" ? "focused" : ""}
                rows="5"
                placeholder="Your message..."
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} {PROFILE_DATA.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default App;
