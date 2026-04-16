import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const AboutSection = () => {
  return (
    <section id="about" className="bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <AnimateOnScroll className="md:col-span-2">
            <Card className="overflow-hidden shadow-xl border border-border rounded-2xl">
              <CardContent className="p-0">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Diego Jimenez"
                    data-ai-hint="Retrato de Diego Jimenez"
                    width={600}
                    height={800}
                    className="object-cover w-full h-full transition-transform duration-[700ms] ease-out hover:scale-[1.03]"
                  />
                </div>
              </CardContent>
            </Card>
          </AnimateOnScroll>

          {/* Content */}
          <AnimateOnScroll delay={100} className="md:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-4">
              Sobre Mí
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold leading-[1.15] tracking-[-0.02em] mb-6">
              Diego Jiménez: 20 años convirtiendo la pasión en hábitos y
              Resultados
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed max-w-[65ch]">
              <p>
                Mi nombre es Diego Jiménez. Aunque mi carrera profesional
                comenzó en la Ingeniería Agrónoma (donde desarrollé mi rigor y
                visión estratégica por más de 15 años), mi verdadera escuela ha
                estado en la montaña, en la pista y bajo las pesas.
              </p>
              <p>
                Desde que tengo recuerdos, he vivido y respirado el deporte.
                Subir montañas, correr maratones y el entrenamiento de fuerza no
                solo me dieron fuerza y resistencia física, sino que me
                enseñaron a forjar hábitos inquebrantables que me ayudaron a
                llegar todo lo lejos que proponía.
              </p>
              <p>
                Actualmente, estoy casado, soy padre de dos hijos y sigo
                cuidando mi salud y fuerza, al mismo tiempo que les cuido a
                ellos, por ello quiero compartir contigo todo lo que me ha
                funcionado, para que tú también disfrutes de una vida activa,
                plena y llena de energía. Como Entrenador Personal Certificado,
                Dietista y Asesor de Hábitos Saludables, mi misión es simple:
                aplicar la metodología probada y el enfoque estructurado que he
                adquirido (como ingeniero y como atleta) para que tú también
                alcances tu máximo potencial físico. No ofrezco trucos rápidos,
                ofrezco un cambio sostenible y con resultados medibles.
              </p>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-all duration-[250ms] hover:shadow-lg hover:-translate-y-0.5"
              >
                <a href="#contact">
                  ¿Listo para empezar? Descubre cómo podemos trabajar juntos
                </a>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
