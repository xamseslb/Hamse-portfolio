'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'next-view-transitions';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './LatestProjects.module.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { 
    id: 1, 
    title: 'AfnanBakes', 
    category: 'Online Bakery System',
    link: 'View Case Study',
    image: '/images/afnanbakes/slide_1.jpeg',
    bgColor: '#fde0e2',
    gridId: 'afnanbakes',
    containImage: true
  },
  { 
    id: 2, 
    title: 'Shush', 
    category: 'E2EE Private Messenger',
    link: 'View Case Study',
    image: '/images/shush/page1_img1.jpeg',
    bgColor: '#080808',
    gridId: 'shush',
    containImage: true
  },
  { 
    id: 3, 
    title: 'AlphaFrame', 
    category: 'Automated Financial AI',
    link: 'View Case Study',
    image: '/images/alphaframe/slide_1.jpeg',
    bgColor: '#1e2128',
    gridId: 'alphaframe',
    containImage: true
  }
];

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function LatestProjects() {
  const wrapperRef = useRef(null);
  const cardsRef = useRef([]);

  useIsomorphicLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) return;

    let ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const anchor = document.getElementById('hero-stack-anchor');
      
      if (!anchor || cards.length === 0) return;

      // Both getBoundingClientRects are affected equally by scroll,
      // so the delta between them is absolute and reliable.
      const anchorRect = anchor.getBoundingClientRect();
      const anchorCenterX = anchorRect.left + anchorRect.width / 2;
      const anchorCenterY = anchorRect.top + anchorRect.height / 2 + window.scrollY; // use absolute document pos

      // Staggered layout parameters for when they are stacked in the Hero
      const STACK_PARAMS = [
        { rotate: 8,   scale: 0.72, xOffset: 35,  yOffset: -30 }, 
        { rotate: 4,   scale: 0.75, xOffset: 15,  yOffset: 15 },  
        { rotate: -6,  scale: 0.76, xOffset: -25, yOffset: -15 }, 
        { rotate: -1,  scale: 0.8,  xOffset: 0,   yOffset: 0 },   
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=800', // Distance over which they travel from Hero to Grid
          scrub: 1, // 1 second smooth catch up
        }
      });

      cards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2 + window.scrollY;

        // Distance from natural grid slot to hero anchor
        const deltaX = anchorCenterX - cardCenterX + STACK_PARAMS[i].xOffset;
        const deltaY = anchorCenterY - cardCenterY + STACK_PARAMS[i].yOffset;
        
        // Starting condition: Stacked in the Hero section
        gsap.set(card, {
          x: deltaX,
          y: deltaY,
          rotation: STACK_PARAMS[i].rotate,
          scale: STACK_PARAMS[i].scale,
          transformOrigin: 'center center'
        });

        // Animate: from stacked hero to natural grid position (x:0, y:0)
        tl.to(card, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          ease: 'power2.inOut'
        }, 0);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={wrapperRef}>
      <hr className={styles.divider} />
      <h2 className={styles.heading}>Latest Projects</h2>
      
      <div className={styles.grid}>
        {PROJECTS.map((project, i) => (
          <Link 
            key={project.id}
            href={project.gridId ? `/projects/${project.gridId}` : '#'}
            ref={el => cardsRef.current[i] = el}
            className={styles.card}
          >
            <div 
              className={styles.imageContainer}
              style={{ 
                backgroundImage: `url(${project.image})`,
                backgroundSize: project.containImage ? 'contain' : 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundColor: project.containImage ? project.bgColor : '#e2e8f0'
              }}
            />
            <div 
              className={styles.overlay}
              style={{ background: `linear-gradient(to top, ${project.bgColor} 0%, rgba(0,0,0,0.35) 25%, transparent 60%)` }}
            >
              <div className={styles.categoryTag}>
                {project.category}
              </div>
              <div className={styles.viewLink}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
                {project.link}
              </div>
              <h3 className={styles.title}>{project.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* View More link */}
      <div className={styles.viewMore}>
        <Link href="/projects" className={styles.viewMoreLink}>
          View More Projects
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
}
