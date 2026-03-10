'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroSection.module.css';

/* Project card data */
const PROJECTS = [
    { id: 0, src: '/images/alphaframe.png', alt: 'AlphaFrame', tag: 'AI Trading System', title: 'AlphaFrame', cta: 'See Case Study ↗', href: '#' },
    { id: 1, src: '/images/afnanbakes.png', alt: 'AfnanBakes', tag: 'Full Stack Web App', title: 'AfnanBakes', cta: 'See Case Study ↗', href: '#' },
    { id: 2, src: '/images/bouncemaster.png', alt: 'Bounce Master', tag: 'Game Development', title: 'Bounce Master', cta: 'View on GitHub ↗', href: '#' },
];

/* -----------------------------------------------------------
   HeroCard: a single animated project card.
   `progress` is a MotionValue (0→1) tied to scroll.
   Each card gets its own interpolated x, y, rotation, scale.
   ----------------------------------------------------------- */
function HeroCard({ project, progress, initialRotate, fromX, fromY, toX, toY, toScale, zIndex, initialOpacity }) {
    const springCfg = { stiffness: 80, damping: 20, mass: 0.8 };

    const rawX = useTransform(progress, [0, 1], [fromX, toX]);
    const rawY = useTransform(progress, [0, 1], [fromY, toY]);
    const rawR = useTransform(progress, [0, 1], [initialRotate, 0]);
    const rawS = useTransform(progress, [0, 1], [1, toScale]);
    const rawOp = useTransform(progress, [0, 0.05], [initialOpacity, 1]);

    const x = useSpring(rawX, springCfg);
    const y = useSpring(rawY, springCfg);
    const rotate = useSpring(rawR, springCfg);
    const scale = useSpring(rawS, springCfg);

    return (
        <motion.div
            className={styles.heroCard}
            style={{ x, y, rotate, scale, opacity: rawOp, zIndex, originX: 0.5, originY: 0.5 }}
        >
            <Image src={project.src} alt={project.alt} fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: 'cover' }} priority />
        </motion.div>
    );
}

/* -----------------------------------------------------------
   HeroSection
   - A tall scroll zone (250vh) acts as the "pin" container
   - The inner sticky div stays visible for the full hero height
   - useScroll tracks progress through the container
   - Each card interpolates from stacked position → grid position
   ----------------------------------------------------------- */
export default function HeroSection() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    /* Card 0 (AlphaFrame) → top-left grid slot */
    /* Card 1 (AfnanBakes) → top-right grid slot */
    /* Card 2 (BounceM)    → bottom-left grid slot */

    return (
        <div ref={containerRef} className={styles.container}>
            {/* Sticky inner — stays in viewport during full 250vh scroll zone */}
            <div className={styles.sticky}>

                {/* LEFT: text */}
                <div className={styles.heroLeft}>
                    <div className={styles.locationBadge}>
                        <span className={styles.dot} />
                        Oslo, Norway
                    </div>

                    <h1 className={styles.heroName}>
                        Hamse<br />
                        <span className={styles.dim}>Portfolio</span>
                    </h1>

                    <p className={styles.bio}>
                        <strong>Full-stack developer.</strong> React &amp; Next.js specialist.
                        AI systems builder. Student at <strong>OsloMet</strong>.
                    </p>

                    <a
                        href="https://github.com/xamseslb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.githubBtn}
                    >
                        <span className={styles.githubAvatar}>H</span>
                        See My GitHub
                    </a>
                </div>

                {/* RIGHT: stacked animated cards */}
                <div className={styles.heroRight}>
                    <div className={styles.cardStack}>

                        {/* Card 2 — back (BounceM) → bottom-left */}
                        <HeroCard
                            project={PROJECTS[2]}
                            progress={scrollYProgress}
                            initialRotate={7}
                            fromX={0} fromY={0}
                            toX={-280} toY={620}
                            toScale={1.15}
                            zIndex={1}
                            initialOpacity={0.65}
                        />

                        {/* Card 1 — middle (AfnanBakes) → top-right */}
                        <HeroCard
                            project={PROJECTS[1]}
                            progress={scrollYProgress}
                            initialRotate={2}
                            fromX={0} fromY={0}
                            toX={300} toY={340}
                            toScale={1.15}
                            zIndex={2}
                            initialOpacity={0.82}
                        />

                        {/* Card 0 — front (AlphaFrame) → top-left */}
                        <HeroCard
                            project={PROJECTS[0]}
                            progress={scrollYProgress}
                            initialRotate={-4}
                            fromX={0} fromY={0}
                            toX={-280} toY={340}
                            toScale={1.15}
                            zIndex={3}
                            initialOpacity={1}
                        />

                    </div>
                </div>

                {/* Scroll hint arrow */}
                <motion.div
                    className={styles.scrollHint}
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                >
                    <span>Scroll</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </motion.div>

            </div>
        </div>
    );
}
