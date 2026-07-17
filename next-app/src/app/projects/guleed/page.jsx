"use client";

import { useRef } from 'react';
import pageStyles from '../../page.module.css';
import styles from './Guleed.module.css';
import Nav from '@/components/Nav';
import { Link } from 'next-view-transitions';

export default function GuleedCaseStudy() {
  const images = Array.from({ length: 9 }, (_, i) => `/images/guleed/slide_${i + 1}.jpeg`);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -600, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 600, behavior: 'smooth' });
    }
  };

  return (
    <div className={pageStyles.page}>
      <div className={pageStyles.container}>
        <Nav />
        <main className={styles.main}>
          <Link href="/projects" className={styles.backButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Projects
          </Link>

          <section className={styles.introSection}>
            <h1 className={styles.heading}>Guuleed Spareparts:<br />Inventory That Works Offline</h1>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Client</span>
                <span className={styles.metaValue}>Guuleed Spareparts</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Year</span>
                <span className={styles.metaValue}>2026</span>
              </div>
            </div>

            <p className={styles.description}>
              Et komplett lagerstyringssystem for en bildelbutikk, bygget rundt ett krav: det må virke når internett ikke gjør det. Samme kodebase kjører både som nettsted på <strong>Render</strong> med <strong>Supabase</strong>-database, og som en frittstående desktop-app som lagrer alt i en lokal <strong>SQLite</strong>-fil på butikk-PC-en. Systemet dekker lager med bilkompatibilitet, ordre, kredittsalg med forfallsdato, salgsanalyse og en full revisjonslogg — med <strong>JWT</strong>-autentisering og rollestyring mellom admin og ansatt.
            </p>

            <div className={styles.scopeGroup}>
              <h3 className={styles.scopeLabel}>Scope of Work</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>FastAPI Backend</span>
                <span className={styles.tag}>Offline-First</span>
                <span className={styles.tag}>Database Design</span>
                <span className={styles.tag}>Cloud Deployment</span>
              </div>
            </div>

            <Link href="https://github.com/xamseslb/Guleed-Spareparts" target="_blank" rel="noopener noreferrer" className={styles.liveSiteLink}>View GitHub Repository ↗</Link>
          </section>

          <section className={styles.gallerySection}>
            <button onClick={scrollLeft} className={`${styles.navButton} ${styles.prevButton}`} aria-label="Previous slide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button onClick={scrollRight} className={`${styles.navButton} ${styles.nextButton}`} aria-label="Next slide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <div className={styles.galleryScroll} ref={scrollRef}>
               {images.map((img, idx) => (
                  <div key={idx} className={styles.galleryItem}>
                     <img src={img} alt={`Guuleed Spareparts screenshot ${idx + 1}`} loading="lazy" />
                  </div>
               ))}
            </div>
          </section>

          <section className={styles.securityAudit}>
            <div className={styles.auditHeader}>
              <div className={styles.auditIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
              </div>
              <h2 className={styles.auditTitle}>System Architecture</h2>
            </div>

            <div className={styles.auditGrid}>
              <div className={styles.auditCard}>
                <h3>One Codebase, Two Modes</h3>
                <p>Samme FastAPI-app kjører mot Supabase i skyen eller lokal SQLite — valgt av én miljøvariabel.</p>
              </div>
              <div className={styles.auditCard}>
                <h3>Migrations Without Data Loss</h3>
                <p>Alembic oppgraderer skjemaet på butikk-PC-en, så nye versjoner beholder eksisterende lagerdata.</p>
              </div>
              <div className={styles.auditCard}>
                <h3>Roles & Audit Trail</h3>
                <p>JWT-innlogging skiller admin fra ansatt, og hver endring logges med bruker, handling og tidspunkt.</p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
