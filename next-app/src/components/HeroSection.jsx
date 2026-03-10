'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import styles from './HeroSection.module.css';

/* ---------------------------------------------------------------
   PROJECT DATA — these are the ONLY cards on the page.
   They start stacked in the hero, then physically travel to
   their grid positions as you scroll.
   --------------------------------------------------------------- */
const PROJECTS = [
    { id: 0, src: '/images/alphaframe.png', alt: 'AlphaFrame', tag: 'AI Trading System', title: 'AlphaFrame', cta: 'See Case Study ↗', href: '#' },
    { id: 1, src: '/images/afnanbakes.png', alt: 'AfnanBakes', tag: 'Full Stack Web App', title: 'AfnanBakes', cta: 'See Case Study ↗', href: '#' },
    { id: 2, src: '/images/bouncemaster.png', alt: 'Bounce Master', tag: 'Game Development', title: 'Bounce Master', cta: 'View on GitHub ↗', href: '#' },
];

/* ---------------------------------------------------------------
   ProjectCard — a single card animated by scroll progress.
   
   Phase 1 (0 → 0.55): Card moves from stacked hero position
   to its target grid position. Rotation goes to 0, scale grows.
   
   Phase 2 (0.55 → 1): Card sits in grid position (no movement).
   --------------------------------------------------------------- */
function ProjectCard({ project, progress, stackRotate, stackX, stackY, gridX, gridY, gridScale, zIdx, stackOpacity }) {
    const springCfg = { stiffness: 120, damping: 28, mass: 0.6 };

    /* Position: stacked → grid */
    const rawX = useTransform(progress, [0, 0.55], [stackX, gridX]);
    const rawY = useTransform(progress, [0, 0.55], [stackY, gridY]);
    const rawR = useTransform(progress, [0, 0.55], [stackRotate, 0]);
    const rawS = useTransform(progress, [0, 0.55], [1, gridScale]);
    const rawOp = useTransform(progress, [0, 0.08], [stackOpacity, 1]);

    /* Spring for smoothness */
    const x = useSpring(rawX, springCfg);
    const y = useSpring(rawY, springCfg);
    const rotate = useSpring(rawR, springCfg);
    const scale = useSpring(rawS, springCfg);

    /* Card info (tag, title, CTA) fades in as card reaches grid */
    const infoOpacity = useTransform(progress, [0.4, 0.6], [0, 1]);

    return (
        <motion.a
            href={project.href}
            className={styles.card}
            style={{ x, y, rotate, scale, opacity: rawOp, zIndex: zIdx }}
        >
            <div className={styles.cardImageWrap}>
                <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    sizes="(max-width:900px) 100vw, 45vw"
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>

            {/* Overlay + card info */}
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

/* ---------------------------------------------------------------
   HeroSection — the complete hero-to-grid scroll experience.
   
   Container is ~300vh tall. Inside is a sticky viewport that
   holds:
   - Hero text (left side, fades out as you scroll)
   - Project cards (start stacked right, fly to 2×2 grid)
   - "Latest Projects" heading (fades in at the right time)
   --------------------------------------------------------------- */
export default function HeroSection() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const springCfg = { stiffness: 120, damping: 28, mass: 0.6 };

    /* Hero text fades out */
    const heroTextOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    const heroTextY = useTransform(scrollYProgress, [0, 0.25], [0, -80]);
    const heroTextYSpring = useSpring(heroTextY, springCfg);

    /* "Latest Projects" heading fades in */
    const headingOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
    const headingY = useTransform(scrollYProgress, [0.45, 0.6], [40, 0]);
    const headingYSpring = useSpring(headingY, springCfg);

    /* Scroll hint fades away */
    const scrollHintOp = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    /* "View More Projects" link fades in at end */
    const viewMoreOp = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);

    /* ---- Card target positions (normalized to the sticky viewport) ----
       Grid layout: 2 columns, centered.
       When scrollYProgress reaches ~0.55, cards should be in these positions.
       
       Values are px offsets from the card's initial stacked position.
       Tuned for ~1280px wide viewport.
    */

    return (
        <section ref={containerRef} className={styles.scrollContainer}>
            <div className={styles.stickyViewport}>

                {/* ---- Hero text (fades out) ---- */}
                <motion.div
                    className={styles.heroText}
                    style={{ opacity: heroTextOpacity, y: heroTextYSpring }}
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

                {/* ---- "Latest Projects" heading (fades in) ---- */}
                <motion.div
                    className={styles.gridHeading}
                    style={{ opacity: headingOpacity, y: headingYSpring }}
                >
                    <h2 className={styles.latestTitle}>Latest Projects</h2>
                    <p className={styles.latestSub}>
                        A collection of what I&apos;ve actually built — from AI trading systems to full-stack web apps.
                    </p>
                </motion.div>

                {/* ---- The 3 project cards ---- */}

                {/* Card 0: AlphaFrame — front card → grid top-left */}
                <ProjectCard
                    project={PROJECTS[0]}
                    progress={scrollYProgress}
                    stackRotate={-4}
                    stackX={0} stackY={0}
                    gridX={-310} gridY={180}
                    gridScale={1.3}
                    zIdx={3}
                    stackOpacity={1}
                />

                {/* Card 1: AfnanBakes — behind-right → grid top-right */}
                <ProjectCard
                    project={PROJECTS[1]}
                    progress={scrollYProgress}
                    stackRotate={2}
                    stackX={0} stackY={0}
                    gridX={130} gridY={180}
                    gridScale={1.3}
                    zIdx={2}
                    stackOpacity={0.85}
                />

                {/* Card 2: BounceM — back card → grid bottom-left */}
                <ProjectCard
                    project={PROJECTS[2]}
                    progress={scrollYProgress}
                    stackRotate={7}
                    stackX={0} stackY={0}
                    gridX={-310} gridY={480}
                    gridScale={1.3}
                    zIdx={1}
                    stackOpacity={0.65}
                />

                {/* Placeholder card (appears in grid bottom-right) */}
                <motion.div
                    className={styles.placeholder}
                    style={{
                        opacity: useTransform(scrollYProgress, [0.5, 0.65], [0, 1]),
                        x: useSpring(useTransform(scrollYProgress, [0.45, 0.6], [200, 130]), springCfg),
                        y: useSpring(useTransform(scrollYProgress, [0.45, 0.6], [300, 480]), springCfg),
                        scale: useSpring(useTransform(scrollYProgress, [0.45, 0.6], [0.5, 1.3]), springCfg),
                    }}
                >
                    <div className={styles.placeholderInner}>
                        <div className={styles.placeholderIcon}>🚧</div>
                        <p className={styles.placeholderLabel}>Coming Soon</p>
                    </div>
                </motion.div>

                {/* View More Projects link */}
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
