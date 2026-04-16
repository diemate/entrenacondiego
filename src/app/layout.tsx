import type { Metadata } from 'next';
import { Syne, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { StructuredData } from '@/components/structured-data';

// ── Fonts (self-hosted by Next.js — eliminates render-blocking cross-origin
//    font requests and removes the Google Fonts privacy concern for EU users) ──
const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

// ── Site-wide defaults (overridden per page via generateMetadata / metadata) ──
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://entrenacondiego.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'entrenaconDiego — Entrenador Personal en Madrid y Vallecas',
    template: '%s | entrenaconDiego',
  },
  description:
    'Entrenador personal certificado en Madrid y Vallecas. Programas 100% personalizados de entrenamiento, nutrición y hábitos. Método 4R probado. Sesión diagnóstico GRATUITA.',
  keywords: [
    'entrenador personal Madrid',
    'entrenador personal Vallecas',
    'entrenador personal online',
    'asesoría nutricional Madrid',
    'entrenamiento personalizado Madrid',
    'preparador físico Madrid',
    'hábitos saludables',
    'pérdida de peso Madrid',
    'entrenamiento fuerza Madrid',
  ],
  authors: [{ name: 'Diego Jiménez' }],
  creator: 'Diego Jiménez',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'entrenaconDiego',
    title: 'entrenaconDiego — Entrenador Personal en Madrid y Vallecas',
    description:
      'Entrenador personal certificado en Madrid y Vallecas. Programas 100% personalizados de entrenamiento, nutrición y hábitos. Método 4R probado. Sesión diagnóstico GRATUITA.',
    // opengraph-image.tsx generates the OG image automatically (1200×630)
  },
  twitter: {
    card: 'summary_large_image',
    title: 'entrenaconDiego — Entrenador Personal en Madrid y Vallecas',
    description:
      'Entrenador personal certificado en Madrid y Vallecas. Programas personalizados de entrenamiento, nutrición y hábitos.',
    // opengraph-image.tsx image is reused for Twitter cards automatically
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn('scroll-smooth', syne.variable, inter.variable)}>
      <body className={cn('font-body antialiased')}>
        <StructuredData />
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
