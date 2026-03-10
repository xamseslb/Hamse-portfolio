import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata = {
  title: 'Hamse – Full Stack Developer',
  description: 'Hamse – Full Stack Developer, 22, OsloMet. Building AI systems, web apps and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
