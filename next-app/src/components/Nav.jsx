'use client';
import Link from 'next/link';
import styles from './Nav.module.css';

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <div className={styles.pill}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.icon}>H</span>
                    Hamse
                </Link>
                <div className={styles.links}>
                    <Link href="/projects" className={styles.link}>Projects</Link>
                    <Link href="#contact" className={styles.link}>Contact</Link>
                </div>
            </div>
        </nav>
    );
}
