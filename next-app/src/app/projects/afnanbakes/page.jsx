"use client";

import { useRef } from 'react';
import pageStyles from '../../page.module.css';
import styles from './Afnanbakes.module.css';
import Nav from '@/components/Nav';
import { Link } from 'next-view-transitions';

export default function AfnanBakesCaseStudy() {
  const images = Array.from({ length: 10 }, (_, i) => `/images/afnanbakes/slide_${i + 1}.jpeg`);
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
            <h1 className={styles.heading}>AfnanBakes:<br />E-commerce Experience</h1>
            
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Client</span>
                <span className={styles.metaValue}>AfnanBakes</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Year</span>
                <span className={styles.metaValue}>2026</span>
              </div>
            </div>

            <p className={styles.description}>
              Et massivt full-stack online bakeri designet for en eksepsjonell brukeropplevelse. Prosjektet startet som en monolitt i <strong>Java Spring Boot</strong>, men ble senere oppgradert til en hodeløs arkitektur drevet av <strong>React/Vite</strong> og et robust <strong>Python Flask</strong> backend for overlegen skalerbarhet, sanntids ordrehåndtering og friksjonsfri sikker betaling.
            </p>

            <div className={styles.scopeGroup}>
              <h3 className={styles.scopeLabel}>Scope of Work</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>Java Spring Boot</span>
                <span className={styles.tag}>Python Flask</span>
                <span className={styles.tag}>React/Vite</span>
                <span className={styles.tag}>Stripe Payments</span>
                <span className={styles.tag}>Supabase</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="https://github.com/xamseslb/Afnanbakes" target="_blank" className={styles.liveSiteLink}>View GitHub Repository ↗</Link>
              <Link href="https://afnanbakes.com" target="_blank" className={styles.liveSiteLink} style={{background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)'}}>Visit Live Site ↗</Link>
            </div>
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
                     <img src={img} alt={`AfnanBakes Presentation Slide ${idx + 1}`} loading="lazy" />
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
                <h3>E-Commerce UI/UX</h3>
                <p>Bygget med React, Tailwind CSS og shadcn/ui for å levere en lynrask, responsiv og friksjonsfri handleopplevelse på tvers av mobil og desktop.</p>
              </div>
              <div className={styles.auditCard}>
                <h3>Secure Payments & Auth</h3>
                <p>Integrert Stripe SDK for kortbetaling og OAuth2 for trygg, kjapp og sessions-basert brukerinnlogging via krypterte tokens.</p>
              </div>
              <div className={styles.auditCard}>
                <h3>Backend Rebuild</h3>
                <p>Arkitektonisk migrasjon fra Java Spring Boot til Python Flask med Supabase (PostgreSQL), optimalisert for raskere responstid og dynamisk varelager.</p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
