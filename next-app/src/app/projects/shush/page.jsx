"use client";

import { useRef } from 'react';
import pageStyles from '../../page.module.css';
import styles from './Shush.module.css';
import Nav from '@/components/Nav';
import { Link } from 'next-view-transitions';

export default function ShushCaseStudy() {
  const images = Array.from({ length: 13 }, (_, i) => `/images/shush/page${i + 1}_img1.jpeg`);
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
            <h1 className={styles.heading}>Building Shush:<br />Enterprise-Grade Messenger</h1>
            
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Client</span>
                <span className={styles.metaValue}>Personal Project</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Year</span>
                <span className={styles.metaValue}>2024</span>
              </div>
            </div>

            <p className={styles.description}>
              Shush ble bygget fra bunnen av som en lynrask, sikkerhets-først kommunikasjonsmotor. Alt fra kildekoden til den underliggende infrastrukturen er "reverse-engineered" rundt de strengeste bransjekravene for personvern i et Zero-Trust miljø. Med <strong>LiveKit WebRTC</strong> for sanntidssignallering, en dedikert <strong>E2EE Node Service</strong>, og aggressiv validering av miljøvariabler gjemt bak <strong>Supabase</strong>, blokkeres all oppstart umiddelbart ved minste avvik i sikkerhetspolicyen.
            </p>

            <div className={styles.scopeGroup}>
              <h3 className={styles.scopeLabel}>Scope of Work</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>Mobile App Dev</span>
                <span className={styles.tag}>Cryptography</span>
                <span className={styles.tag}>WebRTC Signaling</span>
                <span className={styles.tag}>DevOps Security</span>
              </div>
            </div>

            <Link href="https://github.com/ZAKIN02/LearnScroll" target="_blank" className={styles.liveSiteLink}>View GitHub Repository ↗</Link>
          </section>

          {/* Gallery Carousel Restored */}
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
                     <img src={img} alt={`Shush Presentation Slide ${idx + 1}`} loading="lazy" />
                  </div>
               ))}
            </div>
          </section>

          {/* Security Deep Dive Restored */}
          <section className={styles.securityAudit}>
            <div className={styles.auditHeader}>
              <div className={styles.auditIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h2 className={styles.auditTitle}>Security Audit</h2>
            </div>
            
            <div className={styles.auditGrid}>
              <div className={styles.auditCard}>
                <h3>Zero-Trust Validation</h3>
                <p>Prosjektet bruker strenge Zod-skjemaer for å validere prosessmiljøet i produksjon.</p>
              </div>
              <div className={styles.auditCard}>
                <h3>Enterprise Secrets</h3>
                <p>Absolutt krav om 32-tegns variabler (f.eks. JWT_SECRET) uten svake mønstre.</p>
              </div>
              <div className={styles.auditCard}>
                <h3>Anti-XSS & Hashing</h3>
                <p>Enhetstokens salt-hashes; aggressive rate-limits motvirker sesjonskapring effektivt.</p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
