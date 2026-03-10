'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const PROJECTS = [
    { id: 0, src: '/images/alphaframe.png', alt: 'AlphaFrame', tag: 'AI Trading System', title: 'AlphaFrame', cta: 'See Case Study ↗', href: '#' },
    { id: 1, src: '/images/afnanbakes.png', alt: 'AfnanBakes', tag: 'Full Stack Web App', title: 'AfnanBakes', cta: 'See Case Study ↗', href: '#' },
    { id: 2, src: '/images/bouncemaster.png', alt: 'Bounce Master', tag: 'Game Development', title: 'Bounce Master', cta: 'View on GitHub ↗', href: '#' },
];

function ProjectCard({ project, progress, stackRotate, fromX, fromY, toX, toY, zIdx, stackOpacity }) {
    const springCfg = { stiffness: 100, damping: 26, mass: 0.7 };

    const rawX = useTransform(progress, [0, 0.5], [fromX, toX]);
    const rawY = useTransform(progress, [0, 0.5], [fromY, toY]);
    const rawR = useTransform(progress, [0, 0.5], [stackRotate, 0]);
    const rawS = useTransform(progress, [0, 0.5], [1, 1]);
    const rawOp = useTransform(progress, [0, 0.06], [stackOpacity, 1]);

    const x = useSpring(rawX, springCfg);
    const y = useSpring(rawY, springCfg);
    const rotate = useSpring(rawR, springCfg);
    const scale = useSpring(rawS, springCfg);

    const infoOpacity = useTransform(progress, [0.35, 0.55], [0, 1]);

    return (
        <motion.a
            href={project.href}
            className={styles.card}
            style={{ x, y, rotate, scale, opacity: rawOp, zIndex: zIdx }}
        >
            <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="(max-width:900px) 100vw, 45vw"
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

    const springCfg = { stiffness: 100, damping: 26, mass: 0.7 };

    const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroTextY = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, -60]), springCfg);

    const headingOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
    const headingY = useSpring(useTransform(scrollYProgress, [0.35, 0.5], [30, 0]), springCfg);

    const scrollHintOp = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
    const viewMoreOp = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);

    /*
      Card positions - calculated from the card anchor point.
      Cards start at their CSS position (top-right area, stacked).
      They travel to a 2-column grid layout that fills the viewport.
  
      Grid target positions (relative to card's starting position):
        Top-left:     x = -520,  y = 160
        Top-right:    x = -30,   y = 160
        Bottom-left:  x = -520,  y = 440
        Bottom-right: placeholder
    */

    return (
        <section ref={containerRef} className={styles.scrollContainer}>
            <div className={styles.stickyViewport}>

                {/* Hero text */}
                <motion.div
                    className={styles.heroText}
                    style={{ opacity: heroTextOpacity, y: heroTextY }}
                >
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
                </motion.div>

                {/* "Latest Projects" heading */}
                <motion.div
                    className={styles.gridHeading}
                    style={{ opacity: headingOpacity, y: headingY }}
                >
                    <h2 className={styles.latestTitle}>Latest Projects</h2>
                    <p className={styles.latestSub}>
                        A collection of what I&apos;ve actually built — from AI trading systems to full-stack web apps.
                    </p>
                </motion.div>

                {/* Card 0: AlphaFrame → grid top-left */}
                <ProjectCard
                    project={PROJECTS[0]}
                    progress={scrollYProgress}
                    stackRotate={-5}
                    fromX={0} fromY={0}
                    toX={-520} toY={160}
                    zIdx={3}
                    stackOpacity={1}
                />

                {/* Card 1: AfnanBakes → grid top-right */}
                <ProjectCard
                    project={PROJECTS[1]}
                    progress={scrollYProgress}
                    stackRotate={3}
                    fromX={0} fromY={0}
                    toX={-30} toY={160}
                    zIdx={2}
                    stackOpacity={0.85}
                />

                {/* Card 2: BounceM → grid bottom-left */}
                <ProjectCard
                    project={PROJECTS[2]}
                    progress={scrollYProgress}
                    stackRotate={8}
                    fromX={0} fromY={0}
                    toX={-520} toY={440}
                    zIdx={1}
                    stackOpacity={0.65}
                />

                {/* Placeholder → grid bottom-right */}
                <motion.div
                    className={styles.placeholder}
                    style={{
                        opacity: useTransform(scrollYProgress, [0.4, 0.55], [0, 1]),
                        x: useSpring(useTransform(scrollYProgress, [0.35, 0.5], [100, -30]), springCfg),
                        y: useSpring(useTransform(scrollYProgress, [0.35, 0.5], [200, 440]), springCfg),
                        scale: useSpring(useTransform(scrollYProgress, [0.35, 0.5], [0.6, 1]), springCfg),
                    }}
                >
                    <div className={styles.placeholderInner}>
                        <div className={styles.placeholderIcon}>🚧</div>
                        <p className={styles.placeholderLabel}>Coming Soon</p>
                    </div>
                </motion.div>

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
