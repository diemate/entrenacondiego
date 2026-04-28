/**
 * StructuredData — Server Component
 *
 * Injects JSON-LD schema markup into <head> for:
 *   • LocalBusiness  (rich local search results + Google Maps)
 *   • Person         (Diego's professional profile)
 *   • Service × 3   (each of the three offerings)
 *
 * ⚠️  Before going live: replace the TODO placeholders below with real values
 *     (telephone, street address, postal code) and add them to .env.example.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://entrenacondiego.com';
const telephone = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? ''; // e.g. "+34 600 000 000"
const email = 'entrenacondiegojimenez@gmail.com';
const instagramUrl = 'https://www.instagram.com/entrenacondiego/';

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  '@id': `${siteUrl}/#business`,
  name: 'entrenaconDiego',
  description:
    'Entrenador personal certificado en Madrid y Vallecas. Programas 100% personalizados de entrenamiento, nutrición y hábitos saludables. Método 4R.',
  url: siteUrl,
  image: `${siteUrl}/images/avatar.jpg`,
  telephone,
  email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vallecas',
    addressRegion: 'Madrid',
    addressCountry: 'ES',
  },
  areaServed: [
    { '@type': 'City', name: 'Madrid' },
    { '@type': 'City', name: 'Vallecas' },
    { '@type': 'Country', name: 'España' },
  ],
  sameAs: [instagramUrl],
  priceRange: '€€',
};

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#diego`,
  name: 'Diego Jiménez',
  jobTitle: 'Entrenador Personal',
  description:
    'Entrenador Personal Certificado, Dietista y Asesor de Hábitos Saludables con más de 20 años de experiencia deportiva y formación en Ingeniería Agronómica.',
  url: siteUrl,
  image: `${siteUrl}/images/avatar.jpg`,
  email,
  worksFor: { '@id': `${siteUrl}/#business` },
  sameAs: [instagramUrl],
};

const services = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Entrenamiento Personalizado',
    description:
      'Plan de entrenamiento 100% a medida con control de cargas, volumen, intensidad y progresión. Ajustes semanales y análisis de técnica por vídeo.',
    provider: { '@id': `${siteUrl}/#business` },
    areaServed: ['Madrid', 'Vallecas', 'España (online)'],
    serviceType: 'Entrenamiento Personal',
    url: `${siteUrl}/#planes-y-tarifas`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Asesoría Nutricional',
    description:
      'Menú 100% personalizado integrado con el entrenamiento. Recomendaciones según objetivos y estilo de vida.',
    provider: { '@id': `${siteUrl}/#business` },
    areaServed: ['Madrid', 'Vallecas', 'España (online)'],
    serviceType: 'Asesoría Nutricional',
    url: `${siteUrl}/#planes-y-tarifas`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Programa Integral 4R',
    description:
      'Plan estratégico completo que combina entrenamiento, nutrición y hábitos saludables con soporte ampliado y videollamada mensual.',
    provider: { '@id': `${siteUrl}/#business` },
    areaServed: ['Madrid', 'Vallecas', 'España (online)'],
    serviceType: 'Programa Integral de Entrenamiento y Nutrición',
    url: `${siteUrl}/#planes-y-tarifas`,
  },
];

export function StructuredData() {
  const schemas = [localBusiness, person, ...services];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled server-side data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
