import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <Nav />
      <main>
        <HeroSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
