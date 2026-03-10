import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import ProjectsGrid from '@/components/ProjectsGrid';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />
      <main>
        <HeroSection />
        <ProjectsGrid />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
