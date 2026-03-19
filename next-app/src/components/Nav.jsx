'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'next-view-transitions';
import styles from './Nav.module.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.compact : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} style={{ textDecoration: 'none', color: 'inherit' }}>
          <svg className={styles.bolt} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className={styles.logoText}>Hamse</span>
        </Link>

        {/* Links - visible when full, hidden when compact */}
        <div className={styles.links}>
          <Link href="/projects" className={styles.link}>Projects</Link>
          <Link href="/#about" className={styles.link}>About</Link>
          <Link href="/#contact" className={styles.contactBtn}>Contact</Link>
        </div>

        {/* Three dots menu - visible when compact */}
        <button className={styles.dots} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
