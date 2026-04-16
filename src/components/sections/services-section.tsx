import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Apple, Star } from 'lucide-react';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';

const services = [
  {
    icon: <Dumbbell className="h-8 w-8 text-primary" />,
    subtitle: 'Entrenamiento Personalizado',
    title: 'Programas de Entrenamiento Personalizados con Rigor de Ingeniero',
    description:
      'No más entrenamientos genéricos. Recibe un plan de fitness totalmente individualizado basado en tus objetivos específicos (pérdida de peso, fuerza, resistencia en montaña o running). Progresión lógica que garantiza resultados.',
    methodTags: ['Rigor', 'Resistencia'],
    badge: null,
  },
  {
    icon: <Apple className="h-8 w-8 text-primary" />,
    subtitle: 'Asesoría Nutricional',
    title: 'Diseño de una Dieta Personalizada para una Vida de Alto Rendimiento',
    description:
      'Un plan dietético integral adaptado a tu estilo de vida, tus preferencias y tus objetivos de salud y rendimiento. Nutrición que trabaja con tu entrenamiento, no contra él.',
    methodTags: ['Rigor', 'Rutina'],
    badge: null,
  },
  {
    icon: <Star className="h-8 w-8 text-accent" />,
    subtitle: 'Programa Integral 4R',
    title: 'Entrenamiento, Nutrición y Hábitos: Tu Plan Estratégico hacia Resultados Duraderos',
    description:
      'El único plan que combina los cuatro pilares del Método 4R en una estrategia unificada. Entrenamiento, nutrición, hábitos y soporte continuado para construir una vida de alto rendimiento.',
    methodTags: ['Rigor', 'Resistencia', 'Rutina', 'Resultados'],
    badge: 'Método 4R completo',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-4">
            Servicios
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold leading-[1.15] tracking-[-0.02em]">
            Elige el Plan que se Adapta a Ti
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Tres programas construidos sobre el Método 4R — desde el foco en entrenamiento o
            nutrición hasta el plan integral que lo abarca todo.
          </p>
        </AnimateOnScroll>

        {/* items-stretch (grid default) gives all cards equal height */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {services.map((service, i) => (
            <AnimateOnScroll key={service.subtitle} delay={i * 100} className="h-full">
              {/*
                Card layout (h-full, flex-col):
                  ┌─────────────────────────────────┐
                  │ [CardHeader] icon · subtitle     │
                  │              title               │
                  ├─────────────────────────────────┤
                  │ [CardContent flex-col flex-1]    │
                  │   description                    │
                  │   <flex-grow spacer>             │
                  │   ─────────────────────────────  │ ← tags always at same y-position
                  │   pill tags                      │
                  └─────────────────────────────────┘
              */}
              <Card className="h-full flex flex-col shadow-md hover:shadow-xl border border-border rounded-2xl transition-all duration-[250ms] hover:-translate-y-1 relative overflow-visible">
                {service.badge && (
                  <Badge className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 text-xs font-bold uppercase tracking-wide whitespace-nowrap shadow-md">
                    {service.badge}
                  </Badge>
                )}
                <CardHeader className="items-center text-center pt-10">
                  <div className="bg-primary/10 p-4 rounded-2xl mb-3 transition-colors duration-[250ms] group-hover:bg-primary/15">
                    {service.icon}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                    {service.subtitle}
                  </p>
                  <CardTitle className="font-headline text-xl font-bold mt-2 leading-snug tracking-tight">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 gap-4">
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>

                  {/* Spacer — pushes pill tags to a consistent vertical position */}
                  <div className="flex-1" />

                  {/* Pill tags row — always at the same vertical position */}
                  <div className="flex flex-wrap gap-2 pb-1">
                    {service.methodTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full leading-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={200} className="text-center mt-14">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-[250ms]"
          >
            <a href="#planes-y-tarifas">Ver Planes y Tarifas</a>
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default ServicesSection;
