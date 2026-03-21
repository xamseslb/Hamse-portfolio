"use client";

import { useRef } from 'react';
import pageStyles from '../../page.module.css';
import styles from './Alphaframe.module.css';
import Nav from '@/components/Nav';
import { Link } from 'next-view-transitions';

export default function AlphaFrameCaseStudy() {
  const images = Array.from({ length: 7 }, (_, i) => `/images/alphaframe/slide_${i + 1}.jpeg`);
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
            <h1 className={styles.heading}>AlphaFrame:<br />AI-Driven Trading Engine</h1>
            
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Client</span>
                <span className={styles.metaValue}>Personal Project</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Year</span>
                <span className={styles.metaValue}>2026</span>
              </div>
            </div>

            <p className={styles.description}>
              AlphaFrame er en asymmetrisk, fullt automatisert trading-plattform bygget for å overvåke edelmetaller (XAUUSD/XAGUSD) og forex. Kjernen er en kald, analytisk maskin basert på en streng <strong>Top-Down MTA</strong>-strategi som fjerner all menneskelig emosjon fra markedet. Ved å kombinere Python og MetaTrader 5 med sanntidsanalyse formidlet via <strong>FastAPI</strong>, og overvåket gjennom et reaktivt <strong>Multi-Trade React Dashboard</strong>, utgjør det et komplett "wall-street" miljø fra server til nettleser.
            </p>

            <div className={styles.scopeGroup}>
              <h3 className={styles.scopeLabel}>Scope of Work</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>Python Engine</span>
                <span className={styles.tag}>Machine Learning</span>
                <span className={styles.tag}>React/Vite</span>
                <span className={styles.tag}>FastAPI</span>
                <span className={styles.tag}>GenAI (Gemini)</span>
              </div>
            </div>

            <Link href="https://github.com/xamseslb/ImpulseFX" target="_blank" className={styles.liveSiteLink}>View GitHub Repository ↗</Link>
          </section>

          {/* Gallery Carousel */}
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
                     <img src={img} alt={`AlphaFrame Presentation Slide ${idx + 1}`} loading="lazy" />
                  </div>
               ))}
            </div>
          </section>

          {/* System Architecture */}
          <section className={styles.securityAudit}>
            <div className={styles.auditHeader}>
              <div className={styles.auditIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h2 className={styles.auditTitle}>System Architecture</h2>
            </div>
            
            <div className={styles.auditGrid}>
              <div className={styles.auditCard}>
                <h3>Dual-Layer AI</h3>
                <p>Integrasjon av ML Signal Filter for kvantitativ prediksjon og Google Gemini LLM Analyst for markedsinnsikt, via en fail-safe "Read-Only" policy.</p>
              </div>
              <div className={styles.auditCard}>
                <h3>The Trading Engine</h3>
                <p>Sanntids MetaTrader 5 bot skrevet i Python, eksekverer en 15-minutters Break &amp; Retest precision logic uten latens.</p>
              </div>
              <div className={styles.auditCard}>
                <h3>Data Integrity Protocol</h3>
                <p>"Move-Pull-Move" CI/CD protokoll kombinert med hard isolasjon av VPS-prosesser for hver asset (XAU/EUR) sørger for et udødelig State-miljø.</p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
