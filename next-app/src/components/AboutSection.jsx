'use client';

import styles from './AboutSection.module.css';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function AboutSection() {
  const { ref: sectionRef, visible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      id="about"
      ref={sectionRef}
    >
      {/* Thin divider line */}
      <hr className={styles.divider} />

      <div className={styles.header}>
        <span className={styles.label}>About</span>
        <h2 className={styles.name}>Hamse</h2>
      </div>

      <div className={styles.content}>
        {/* Left: Photo + social + name */}
        <div className={styles.photoColumn}>
          <div className={styles.photoWrapper}>
            {/* Placeholder — replace with actual photo */}
            <div className={styles.photoPlaceholder}>H</div>
          </div>

          {/* Social icons */}
          <div className={styles.socialIcons}>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* GitHub */}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="X">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          <div className={styles.photoName}>Hamse</div>
          <div className={styles.photoTitle}>Full-Stack Developer (React + Next.js)</div>
        </div>

        {/* Right: Bio paragraphs */}
        <div className={styles.bioColumn}>
          <p className={styles.bioParagraph} style={{ transitionDelay: '0.2s' }}>
            <strong>I build production systems and solve real problems</strong>{' '}
            <span className={styles.bioMuted}>
              when the platform gets in the way. Full-stack developer og AI-entusiast. 
              React & Next.js spesialist. Studerer ved OsloMet.
            </span>
          </p>

          <p className={styles.bioParagraph} style={{ transitionDelay: '0.35s' }}>
            <strong>I ship fast and iterate in days.</strong>{' '}
            <span className={styles.bioMuted}>
              Leveraging server-first React, typed APIs, background jobs, CI/CD, and observability. 
              Small PRs, rapid feedback, no ceremony.
            </span>
          </p>

          <p className={styles.bioParagraph} style={{ transitionDelay: '0.5s' }}>
            <strong>My core philosophy is simplicity.</strong>{' '}
            <span className={styles.bioMuted}>
              If complexity balloons, I delete it and design the simpler path. 
              Bygger systemer som løser ekte problemer.
            </span>
          </p>

          {/* Signature */}
          <div className={styles.signature} style={{ transitionDelay: '0.65s' }}>
            <em>Hamse</em>
          </div>
        </div>
      </div>
    </section>
  );
}
