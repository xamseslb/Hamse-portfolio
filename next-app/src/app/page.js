import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />
      <HeroSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
