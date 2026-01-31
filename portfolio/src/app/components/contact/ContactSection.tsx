import type { Profile } from "@/lib/types";
import SectionWrapper from "../layout/SectionWrapper";
import { FiMail, FiLinkedin } from "react-icons/fi";

export default function ContactSection({ profile }: { profile: Profile }) {
  return (
    <SectionWrapper id="contact">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-secondary dark:text-muted mb-8 max-w-md mx-auto">
          Interested in working together? Feel free to reach out.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-secondary transition-colors"
          >
            <FiMail size={18} />
            Send Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] transition-colors"
          >
            <FiLinkedin size={18} />
            LinkedIn
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
