'use client';

import styles from './ToolkitSection.module.css';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs, 
  SiExpress, 
  SiPython, 
  SiTailwindcss, 
  SiGreensock, 
  SiFramer, 
  SiFirebase 
} from 'react-icons/si';
import { FiLayers, FiCode, FiZap, FiPenTool, FiCheckCircle, FiPlay } from 'react-icons/fi';

const CAPABILITIES = [
  { icon: <FiLayers size={18} />, label: 'Full Stack Development' },
  { icon: <FiCode size={18} />, label: 'React Development' },
  { icon: <FiZap size={18} />, label: 'Performance Optimization' },
  { icon: <FiPenTool size={18} />, label: 'UI/UX Design' },
  { icon: <FiCheckCircle size={18} />, label: 'Code Reviews' },
  { icon: <FiPlay size={18} />, label: 'Advanced Motion' },
];

const TECH_STACK = [
  { name: 'React', icon: <SiReact size={22} color="#1a1a2e" /> },
  { name: 'Next.js', icon: <SiNextdotjs size={22} color="#1a1a2e" /> },
  { name: 'TypeScript', icon: <SiTypescript size={22} color="#1a1a2e" /> },
  { name: 'Node.js', icon: <SiNodedotjs size={22} color="#1a1a2e" /> },
  { name: 'Express', icon: <SiExpress size={22} color="#1a1a2e" /> },
  { name: 'Python', icon: <SiPython size={22} color="#1a1a2e" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={22} color="#1a1a2e" /> },
  { name: 'GSAP', icon: <SiGreensock size={22} color="#1a1a2e" /> },
  { name: 'Framer Motion', icon: <SiFramer size={22} color="#1a1a2e" /> },
  { name: 'Firebase', icon: <SiFirebase size={22} color="#1a1a2e" /> },
];

export default function ToolkitSection() {
  const { ref: sectionRef, visible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      id="toolkit"
      ref={sectionRef}
    >
      <hr className={styles.divider} />

      <div className={styles.content}>
        {/* Left: Heading + Tech stack grid */}
        <div className={styles.leftColumn}>
          <div className={styles.header}>
            <h2 className={styles.heading}>
              Engineering
              <br />
              <span className={styles.headingAccent}>Toolkit</span>
            </h2>
          </div>

          <p className={styles.stackLabel}>My tech stack</p>
          <div className={styles.techGrid}>
            {TECH_STACK.map((tech, i) => (
              <div
                key={tech.name}
                className={styles.techItem}
                title={tech.name}
                style={{ transitionDelay: `${0.3 + i * 0.05}s` }}
              >
                <span className={styles.techIcon}>{tech.icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Capabilities list */}
        <div className={styles.rightColumn}>
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.label}
              className={styles.capabilityRow}
              style={{ transitionDelay: `${0.2 + i * 0.08}s` }}
            >
              <div className={styles.capabilityIcon}>{cap.icon}</div>
              <span className={styles.capabilityLabel}>{cap.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
