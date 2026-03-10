'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const PROJECTS = [
    { id: 0, src: '/images/alphaframe.png', alt: 'AlphaFrame', tag: 'AI Trading System', title: 'AlphaFrame', cta: 'See Case Study ↗', href: '#' },
    { id: 1, src: '/images/afnanbakes.png', alt: 'AfnanBakes', tag: 'Full Stack Web App', title: 'AfnanBakes', cta: 'See Case Study ↗', href: '#' },
    { id: 2, src: '/images/bouncemaster.png', alt: 'Bounce Master', tag: 'Game Development', title: 'Bounce Master', cta: 'View on GitHub ↗', href: '#' },
    { id: 3, src: '/images/placeholder_project.png', alt: 'Private Security', tag: 'Private Security', title: 'IAO', cta: 'View Case Study ↗', href: '#' },
];

function ProjectCard({ project, progress, stackRotate, fromX, fromY }) {
    // We map the progress from [0, 1] to go FROM scattered stack points TO 0,0 (natural grid location)
    const x = useTransform(progress, [0, 1], [fromX, 0]);
    const y = useTransform(progress, [0, 1], [fromY, 0]);
    const rotate = useTransform(progress, [0, 1], [stackRotate, 0]);

    // Cards are opaque by default except for the intro fade
    const infoOpacity = useTransform(progress, [0.4, 0.9], [0, 1]);

    return (
        <motion.a
            href={project.href}
            className={styles.card}
            style={{ x, y, rotate }}
        >
            <div className={styles.cardInner}>
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
            </div>
        </motion.a>
    );
}

export default function HeroSection() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = scrollYProgress;

    // The Latest Projects heading fades down slightly as grid opens
    const headingOpacity = useTransform(smoothProgress, [0.35, 0.55], [0, 1]);
    const headingY = useTransform(smoothProgress, [0.35, 0.55], [30, 0]);
    const dividerOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
    const viewMoreOp = useTransform(smoothProgress, [0.85, 1], [0, 1]);

    return (
        <section ref={containerRef} className={styles.scrollContainer}>

            {/* LAYER 1: Normal document flow. Scrolls away naturally. */}
            <div className={styles.normalFlowContent}>
                <div className={styles.heroText}>
                    <div className={styles.locationBadge}>
                        <span className={styles.dot} />
                        Oslo, Norway
                    </div>

                    <h1 className={styles.heroName}>
                        Hamse<br />
                        Portfolio
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
            </div>

            {/* LAYER 2: Sticky Cards Viewport. This stays on screen as you scroll the massive 280vh container. */}
            <div className={styles.stickyCardsViewport}>
                <div className={styles.stickyInner}>

                    <motion.div className={styles.divider} style={{ opacity: dividerOpacity }} />

                    <motion.div className={styles.gridHeading} style={{ opacity: headingOpacity, y: headingY }}>
                        <h2 className={styles.latestTitle}>Latest Projects</h2>
                    </motion.div>

                    {/* 
            Instead of absolute positioning, we use a real CSS GRID.
            Framer Motion will translate them OUT of the grid to start, 
            and bring them HOME to (0,0) as you scroll.
          */}
                    <div className={styles.perfectGrid}>
                        <ProjectCard
                            project={PROJECTS[0]}
                            progress={smoothProgress}
                            stackRotate={9}
                            fromX="40vw" fromY="-20vh"
                        />
                        <ProjectCard
                            project={PROJECTS[1]}
                            progress={smoothProgress}
                            stackRotate={12}
                            fromX="5vw" fromY="-20vh"
                        />
                        <ProjectCard
                            project={PROJECTS[2]}
                            progress={smoothProgress}
                            stackRotate={5}
                            fromX="40vw" fromY="-60vh"
                        />
                        <ProjectCard
                            project={PROJECTS[3]}
                            progress={smoothProgress}
                            stackRotate={-5}
                            fromX="5vw" fromY="-60vh"
                        />
                    </div>

                    <motion.div className={styles.viewMore} style={{ opacity: viewMoreOp }}>
                        <a href="/projects">View More Projects ↗</a>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
