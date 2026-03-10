'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const PROJECTS = [
    { id: 0, src: '/images/alphaframe.png', alt: 'AlphaFrame', tag: 'AI Trading System', title: 'AlphaFrame', cta: 'See Case Study ↗', href: '#' },
    { id: 1, src: '/images/afnanbakes.png', alt: 'AfnanBakes', tag: 'Full Stack Web App', title: 'AfnanBakes', cta: 'See Case Study ↗', href: '#' },
    { id: 2, src: '/images/bouncemaster.png', alt: 'Bounce Master', tag: 'Game Development', title: 'Bounce Master', cta: 'View on GitHub ↗', href: '#' },
    { id: 3, src: '/images/placeholder_project.png', alt: 'Private Security', tag: 'Private Security', title: 'IAO', cta: 'View Case Study ↗', href: '#' },
];

function ProjectCard({ project, progress, stackRotate, fromX, fromY, toX, toY, zIdx, stackOpacity }) {
    // Use the pre-smoothed progress value to calculate transforms. 
    // No individual springs needed here, drastically improving performance.
    const x = useTransform(progress, [0, 0.55], [fromX, toX]);
    const y = useTransform(progress, [0, 0.55], [fromY, toY]);
    const rotate = useTransform(progress, [0, 0.55], [stackRotate, 0]);
    const opacity = useTransform(progress, [0, 0.1], [stackOpacity, 1]);
    const infoOpacity = useTransform(progress, [0.4, 0.6], [0, 1]);

    return (
        <motion.a
            href={project.href}
            className={styles.card}
            style={{ x, y, rotate, opacity, zIndex: zIdx }}
        >
            <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="(max-width:900px) 100vw, 40vw"
                style={{ objectFit: 'cover' }}
                priority
            />
            <motion.div className={styles.cardOverlay} style={{ opacity: infoOpacity }}>
                <span className={styles.cardTag}>{project.tag}</span>
                <div className={styles.cardBottom}>
                    <span className={styles.cardTitle}>{project.title}</span>
                    <span className={styles.cardCta}>{project.cta}</span>
                </div>
            </motion.div>
        </motion.a>
    );
}

export default function HeroSection() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // CRITICAL PERFORMANCE FIX: 
    // Map animations directly to raw scroll progress instead of a physics spring.
    // This removes the "floaty/lagging" feeling and links movement 1:1 with the mouse wheel.
    const smoothProgress = scrollYProgress;

    const heroTextOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
    const heroTextY = useTransform(smoothProgress, [0, 0.25], [0, -40]);

    const headingOpacity = useTransform(smoothProgress, [0.35, 0.5], [0, 1]);
    const headingY = useTransform(smoothProgress, [0.35, 0.5], [20, 0]);

    const dividerOpacity = useTransform(smoothProgress, [0.3, 0.45], [0, 1]);

    const scrollHintOp = useTransform(smoothProgress, [0, 0.08], [1, 0]);
    const viewMoreOp = useTransform(smoothProgress, [0.6, 0.7], [0, 1]);

    return (
        <section ref={containerRef} className={styles.scrollContainer}>
            <div className={styles.stickyViewport}>

                {/* Hero text */}
                <motion.div
                    className={styles.heroText}
                    style={{ opacity: heroTextOpacity, y: heroTextY }}
                >
                    <h1 className={styles.heroName}>
                        Hamse<br />
                        Portfolio
                    </h1>

                    <div className={styles.locationBadge}>
                        <span className={styles.dot} />
                        Oslo, Norway
                    </div>

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
                </motion.div>

                {/* Divider line */}
                <motion.div
                    className={styles.divider}
                    style={{ opacity: dividerOpacity }}
                />

                {/* "Latest Projects" heading */}
                <motion.div
                    className={styles.gridHeading}
                    style={{ opacity: headingOpacity, y: headingY }}
                >
                    <h2 className={styles.latestTitle}>Latest Projects</h2>
                </motion.div>

                {/* Cards using smoothProgress instead of raw scrollYProgress */}
                <ProjectCard
                    project={PROJECTS[0]}
                    progress={smoothProgress}
                    stackRotate={-4}
                    fromX={0} fromY={0}
                    toX={-500} toY={200}
                    zIdx={4}
                    stackOpacity={1}
                />

                <ProjectCard
                    project={PROJECTS[1]}
                    progress={smoothProgress}
                    stackRotate={2}
                    fromX={0} fromY={0}
                    toX={20} toY={200}
                    zIdx={3}
                    stackOpacity={0.9}
                />

                <ProjectCard
                    project={PROJECTS[2]}
                    progress={smoothProgress}
                    stackRotate={6}
                    fromX={0} fromY={0}
                    toX={-500} toY={480}
                    zIdx={2}
                    stackOpacity={0.7}
                />

                <ProjectCard
                    project={PROJECTS[3]}
                    progress={smoothProgress}
                    stackRotate={-2}
                    fromX={0} fromY={0}
                    toX={20} toY={480}
                    zIdx={1}
                    stackOpacity={0.5}
                />

                {/* View More Projects */}
                <motion.div
                    className={styles.viewMore}
                    style={{ opacity: viewMoreOp }}
                >
                    <a href="/projects">View More Projects ↗</a>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    className={styles.scrollHint}
                    style={{ opacity: scrollHintOp }}
                >
                    <span>Scroll</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </motion.div>

            </div>
        </section>
    );
}
