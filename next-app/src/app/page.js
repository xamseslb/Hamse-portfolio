import styles from './page.module.css';
import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import LatestProjects from '@/components/LatestProjects';
import AboutSection from '@/components/AboutSection';
import ToolkitSection from '@/components/ToolkitSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Nav />
        <HeroSection />
        <LatestProjects />
        <AboutSection />
        <ToolkitSection />
        <ContactSection />
      </div>
    </div>
  );
}
