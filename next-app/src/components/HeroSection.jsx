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
    // Animates the card from the stacked position (fromX/fromY) to its natural DOM grid position (0, 0)
    const x = useTransform(progress, [0, 1], [fromX, "0px"]);
    const y = useTransform(progress, [0, 1], [fromY, "0px"]);
    const rotate = useTransform(progress, [0, 1], [stackRotate, 0]);

    // The card info specifically fades in later when it reaches the grid
    const infoOpacity = useTransform(progress, [0.6, 1], [0, 1]);

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

    return (
        <section ref={containerRef} className={styles.scrollContainer}>

            {/* 
        LAYER 1: HERO SCREEN
        Takes up the first viewport. Scrolls up normally. 
      */}
            <div className={styles.heroScreen}>
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

            {/* 
        LAYER 2: GRID SCREEN
        This follows naturally after the hero screen in the document flow.
        The cards physically live here in the HTML, but use fromX/fromY to visually start 
        up in the Hero Screen!
      */}
            <div className={styles.gridScreen}>

                <div className={styles.gridHeader}>
                    <h2 className={styles.latestTitle}>Latest Projects</h2>
                </div>

                <div className={styles.perfectGrid}>
                    {/* Top Left - Move Right 1 column, Move Up 75vh */}
                    <ProjectCard
                        project={PROJECTS[0]}
                        progress={scrollYProgress}
                        stackRotate={-8}
                        fromX="calc(100% + 24px - 15px)"
                        fromY="calc(-75vh + 10px)"
                    />
                    {/* Top Right - Target Stack exactly over this column. Move Up 75vh */}
                    <ProjectCard
                        project={PROJECTS[1]}
                        progress={scrollYProgress}
                        stackRotate={10}
                        fromX="10px"
                        fromY="calc(-75vh - 10px)"
                    />
                    {/* Bottom Left - Move Right 1 column, Move Up 75vh AND 1 Row Height */}
                    <ProjectCard
                        project={PROJECTS[2]}
                        progress={scrollYProgress}
                        stackRotate={4}
                        fromX="calc(100% + 24px + 5px)"
                        fromY="calc(-100% - 24px - 75vh + 15px)"
                    />
                    {/* Bottom Right - Target Stack exactly over this column. Move Up 75vh AND 1 Row Height */}
                    <ProjectCard
                        project={PROJECTS[3]}
                        progress={scrollYProgress}
                        stackRotate={-5}
                        fromX="-15px"
                        fromY="calc(-100% - 24px - 75vh - 5px)"
                    />
                </div>

                <div className={styles.viewMore}>
                    <a href="/projects">View More Projects ↗</a>
                </div>

            </div>

        </section>
    );
}
