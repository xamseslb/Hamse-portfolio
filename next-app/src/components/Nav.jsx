'use client';
import Link from 'next/link';
import styles from './Nav.module.css';

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <div className={styles.pill}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.icon}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                    </span>
                    Hamse
                </Link>
                <div className={styles.links}>
                    <Link href="/projects" className={styles.link}>Projects</Link>
                    <Link href="#about" className={styles.link}>About</Link>
                    <Link href="#contact" className={styles.linkOutlined}>Contact</Link>
                </div>
            </div>
        </nav>
    );
}
