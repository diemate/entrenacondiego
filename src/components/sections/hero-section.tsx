import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Timer, Layers3, ShieldCheck } from "lucide-react";
import { Card, CardProps } from "../card";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export const BenefitsSection = () => {
  const items: CardProps[] = [
    {
      title: "Beneficios rápidos",
      description:
        "Programas pensados para personas ocupadas que quieren mejorar sin complicaciones.",
      Icon: Timer,
    },
    {
      title: "Enfoque 360°",
      description:
        "Entrenamiento, nutrición y hábitos integrados: un enfoque 360° para tu salud.",
      Icon: Layers3,
    },
    {
      title: "Resultados fiables",
      description:
        "Método probado + formación certificada = resultados fiables.",
      Icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="beneficios"
      className="relative z-20 -mt-24 py-0 pb-0"
      aria-label="Beneficios principales"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <AnimateOnScroll key={item.title} delay={i * 80}>
              <Card
                title={item.title}
                description={item.description}
                Icon={item.Icon}
              />
            </AnimateOnScroll>
          ))}
        </div>
        <AnimateOnScroll delay={240} className="mt-10 text-center">
          <p className="text-lg md:text-xl max-w-[65ch] mx-auto text-muted-foreground leading-relaxed font-medium">
            No se trata sólo de entrenar más — se trata de entrenar mejor, con coherencia, con resultados fiables.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

const HeroSection = () => {
  return (
    <>
      {/*
        Hero: split layout
        - Desktop: text on left · hero image fills right half
        - Mobile: full-width with image as dark background behind text
        All copy is unchanged; only layout, spacing, and visual treatment updated.
      */}
      <section
        id="home"
        className="relative overflow-hidden bg-[hsl(var(--surface-inverse))] text-white"
      >
        {/* Brand gradient accent (decorative) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/5 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Mobile: blurred image fills section behind text */}
        <div className="absolute inset-0 lg:hidden" aria-hidden="true">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            className="object-cover brightness-[0.30]"
            priority
          />
        </div>

        {/* Desktop: image panel — right half, absolute so it fills full section height */}
        <div
          className="absolute top-0 right-0 bottom-0 w-1/2 hidden lg:block"
          aria-hidden="true"
        >
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Left-edge blend: multi-stop smooth fade into dark background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, hsl(var(--surface-inverse)) 0%, hsl(var(--surface-inverse) / 0.96) 15%, hsl(var(--surface-inverse) / 0.82) 30%, hsl(var(--surface-inverse) / 0.55) 50%, hsl(var(--surface-inverse) / 0.20) 70%, transparent 85%)',
            }}
          />
          {/* Bottom-edge blend: softens transition toward BenefitsSection */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[hsl(var(--surface-inverse))] to-transparent" />
        </div>

        {/* Content — sits above all background layers */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start min-h-[90vh] pb-36">
            {/* Text column: full width on mobile, left half on desktop */}
            <div className="w-full lg:w-1/2 flex flex-col justify-start pt-24 lg:pt-28 lg:pr-12">

              <AnimateOnScroll>
                <p className="text-xs font-bold uppercase tracking-[0.20em] text-accent mb-6">
                  Entrenador Personal · Dietista · Asesor de Hábitos
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll delay={80}>
                <h1 className="font-headline text-[1.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-[-0.02em] uppercase mb-8">
                  La <span className="text-accent">PRECISIÓN</span> de la{" "}
                  ingeniería aplicada a tu entrenamiento
                </h1>
              </AnimateOnScroll>

              <AnimateOnScroll delay={160}>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-[50ch]">
                  Deja de improvisar. Transforma tu cuerpo y mente con hábitos sólidos
                  y sencillos.
                </p>
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-fit bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl text-base px-8 py-6 transition-all duration-[250ms] hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <a href="#contact">Agenda tu Sesión de Diagnóstico GRATUITA</a>
                </Button>
              </AnimateOnScroll>

            </div>
          </div>
        </div>
      </section>

      <BenefitsSection />
    </>
  );
};

export default HeroSection;
