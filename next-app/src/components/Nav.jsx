'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'next-view-transitions';
import styles from './Nav.module.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setExpanded(false); // Reset when returning to top
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => {
    if (expanded) setExpanded(false);
  };

  const isCompact = scrolled && !expanded;

  return (
    <nav className={`${styles.nav} ${isCompact ? styles.compact : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleLinkClick}>
          <svg className={styles.bolt} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className={styles.logoText}>Hamse</span>
        </Link>

        {/* Links - visible when full, hidden when compact */}
        <div className={styles.links}>
          <Link href="/projects" className={styles.link} onClick={handleLinkClick}>Projects</Link>
          <Link href="/#about" className={styles.link} onClick={handleLinkClick}>About</Link>
          <Link href="/#contact" className={styles.contactBtn} onClick={handleLinkClick}>Contact</Link>
        </div>

        {/* Three dots menu - visible when compact */}
        <button 
           className={styles.dots} 
           aria-label="Expand Menu"
           onClick={() => setExpanded(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
