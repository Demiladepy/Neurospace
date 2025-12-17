import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { clsx } from 'clsx';
import { AuthProvider } from '@/contexts/AuthContext';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NeuroSpace | The 360° Learning Guardian',
  description: 'Agentic AI environment for special education.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(outfit.className, 'min-h-screen bg-slate-50 text-slate-900')}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
