'use client';

import { useState } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [githubHover, setGithubHover] = useState(false);

  return (
    <section className={styles.hero}>
      {/* Left side: text content */}
      <div className={styles.textContent}>
        {/* Location badge */}
        <div className={styles.locationBadge}>
          <span className={styles.greenDot}></span>
          <span>Oslo, Norway</span>
        </div>

        {/* Big heading */}
        <h1 className={styles.heading}>
          Hamse
          <br />
          Portfolio
        </h1>

        {/* Description */}
        <p className={styles.description}>
          <strong>Full-stack developer og AI-entusiast.</strong> React &
          Next.js spesialist. Studerer ved <strong>OsloMet</strong>. Bygger
          systemer som løser ekte problemer.
        </p>

        {/* GitHub button */}
        <a
          href="https://github.com/xamseslb"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubBtn}
          onMouseEnter={() => setGithubHover(true)}
          onMouseLeave={() => setGithubHover(false)}
        >
          <div className={styles.githubAvatarWrap}>
            <div className={styles.githubAvatarPlaceholder}>H</div>
          </div>

          {/* GitHub icon appears on hover */}
          <div className={`${styles.githubIconWrap} ${githubHover ? styles.githubIconVisible : ''}`}>
            <span className={styles.plus}>+</span>
            <svg className={styles.githubIcon} viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </div>

          <span className={styles.githubText}>See My Github</span>
        </a>
      </div>

      {/* Anchor point for the GSAP scroll animation. This invisible div defines exactly where the cards should start before scrolling down to the Latest Projects grid */}
      <div id="hero-stack-anchor" className={styles.stackAnchor}></div>
    </section>
  );
}
