'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './ProjectsGrid.module.css';

const PROJECTS = [
    { id: 0, src: '/images/alphaframe.png', alt: 'AlphaFrame', tag: 'AI Trading System', title: 'AlphaFrame', cta: 'See Case Study ↗', href: '#' },
    { id: 1, src: '/images/afnanbakes.png', alt: 'AfnanBakes', tag: 'Full Stack Web App', title: 'AfnanBakes', cta: 'See Case Study ↗', href: '#' },
    { id: 2, src: '/images/bouncemaster.png', alt: 'Bounce Master', tag: 'Game Development', title: 'Bounce Master', cta: 'View on GitHub ↗', href: '#' },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectsGrid() {
    return (
        <section className={styles.section} id="projects">
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <h2 className={styles.heading}>Latest Projects</h2>
                <p className={styles.sub}>A collection of what I&apos;ve actually built — from AI trading systems to full-stack web apps.</p>
            </motion.div>

            <div className={styles.grid}>
                {PROJECTS.map((p, i) => (
                    <motion.a
                        key={p.id}
                        href={p.href}
                        className={styles.card}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -6 }}
                    >
                        <Image src={p.src} alt={p.alt} fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                        <span className={styles.tag}>{p.tag}</span>
                        <div className={styles.bottom}>
                            <span className={styles.title}>{p.title}</span>
                            <span className={styles.cta}>{p.cta}</span>
                        </div>
                    </motion.a>
                ))}

                {/* Coming soon placeholder */}
                <motion.div
                    className={`${styles.card} ${styles.placeholder}`}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <div className={styles.placeholderInner}>
                        <div className={styles.placeholderIcon}>🚧</div>
                        <p className={styles.placeholderLabel}>Coming Soon</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
