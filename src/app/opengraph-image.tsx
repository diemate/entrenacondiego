import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import path from 'path';

export const alt = 'entrenaconDiego — Entrenador Personal en Madrid y Vallecas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/jpeg';

export default async function Image() {
  const heroData = await readFile(path.join(process.cwd(), 'public/images/hero.jpg'));
  const heroSrc = `data:image/jpeg;base64,${heroData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        {/* Hero photo — full bleed background */}
        <img
          src={heroSrc}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />

        {/* Left-to-right gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(100deg, rgba(11,26,14,0.92) 0%, rgba(11,26,14,0.80) 50%, rgba(11,26,14,0.30) 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '56px 72px',
            gap: '0',
            maxWidth: '660px',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '3px',
                height: '20px',
                background: '#D97A13',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                color: '#D97A13',
                fontSize: '18px',
                fontWeight: '600',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Entrenador Personal · Madrid
            </span>
          </div>

          {/* Brand name */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              lineHeight: '1.05',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                color: '#ffffff',
                fontSize: '86px',
                fontWeight: '800',
                letterSpacing: '-0.03em',
              }}
            >
              entrena
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0' }}>
              <span
                style={{
                  color: '#4ade80',
                  fontSize: '86px',
                  fontWeight: '800',
                  letterSpacing: '-0.03em',
                }}
              >
                con
              </span>
              <span
                style={{
                  color: '#ffffff',
                  fontSize: '86px',
                  fontWeight: '800',
                  letterSpacing: '-0.03em',
                }}
              >
                Diego
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p
            style={{
              color: 'rgba(255,255,255,0.80)',
              fontSize: '24px',
              fontWeight: '400',
              lineHeight: '1.45',
              margin: '0 0 32px 0',
            }}
          >
            Entrenamiento, nutrición y hábitos.
            <br />
            Método 4R probado para resultados reales.
          </p>

          {/* CTA badge */}
          <div style={{ display: 'flex' }}>
            <span
              style={{
                background: '#D97A13',
                color: '#ffffff',
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '20px',
                fontWeight: '700',
                letterSpacing: '0.02em',
              }}
            >
              Sesión diagnóstico GRATUITA
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
