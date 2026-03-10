'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Footer.module.css';

const WORDS = ['build', 'create', 'design', 'ship'];

export default function Footer() {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIdx(i => (i + 1) % WORDS.length), 2200);
        return () => clearInterval(id);
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.tagline}>
                    Lets{' '}
                    <span className={styles.swapWrap}>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={WORDS[idx]}
                                initial={{ y: '100%', opacity: 0 }}
                                animate={{ y: '0%', opacity: 1 }}
                                exit={{ y: '-100%', opacity: 0 }}
                                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                                className={styles.swapWord}
                            >
                                {WORDS[idx]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                    <br />incredible work together.
                </div>

                <div className={styles.contact}>
                    <span className={styles.label}>Email</span>
                    <a href="mailto:xamseslb@gmail.com">xamseslb@gmail.com</a>
                    <span className={`${styles.label} ${styles.mt}`}>GitHub</span>
                    <a href="https://github.com/xamseslb" target="_blank" rel="noopener noreferrer">github.com/xamseslb</a>
                </div>
            </div>

            <nav className={styles.nav}>
                <a href="/">Home</a>
                <a href="/projects">Projects</a>
                <a href="#contact">Contact</a>
            </nav>

            <div className={styles.meta}>
                <p>Based in Oslo, Norway · OsloMet</p>
                <p>© 2025 Hamse</p>
            </div>

            <div className={styles.giant}>Hamse</div>
        </footer>
    );
}
