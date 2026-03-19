import { ViewTransitions } from 'next-view-transitions';
import './globals.css';

export const metadata = {
  title: 'Hamse – Full Stack Developer',
  description: 'Hamse – Full Stack Developer, 22, OsloMet. Building AI systems, web apps and more.',
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="no">
        <body>{children}</body>
      </html>
    </ViewTransitions>
  );
}
