import { getProfile } from "@/lib/data";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  const profile = getProfile();

  return (
    <footer className="border-t border-[var(--border)] py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-secondary dark:text-muted">
          {profile.name} &copy; {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-secondary hover:text-primary dark:text-muted dark:hover:text-white transition-colors"
          >
            <FiGithub size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-secondary hover:text-primary dark:text-muted dark:hover:text-white transition-colors"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-secondary hover:text-primary dark:text-muted dark:hover:text-white transition-colors"
          >
            <FiMail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
