"use client";

import Link from "next/link";
import { Menu, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navLinks = [
  { href: "#about", label: "Sobre Mí" },
  { href: "#services", label: "Servicios" },
  { href: "#methodology", label: "Método" },
  { href: "#planes-y-tarifas", label: "Planes y Tarifas" },
  { href: "#contact", label: "Contacto" },
];

const Header = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const closeSheet = () => setSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-headline font-bold text-foreground group"
          aria-label="entrenaconDiego — inicio"
        >
          <div className="flex items-center justify-center bg-primary rounded-lg p-1.5 transition-transform duration-[150ms] group-hover:scale-105">
            <Mountain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="inline-block text-lg tracking-tight">
            entrenaconDiego
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-[150ms] hover:text-foreground
                         after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-primary
                         after:scale-x-0 after:transition-transform after:duration-[250ms]
                         hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + mobile menu */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden md:flex bg-accent text-accent-foreground hover:bg-accent/90 shadow-md transition-all duration-[250ms] hover:shadow-lg hover:-translate-y-px"
          >
            <a href="#contact">Agenda tu Sesión</a>
          </Button>

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card">
              <nav className="grid gap-1 mt-10">
                <Link
                  href="/"
                  className="flex items-center gap-2.5 font-headline font-bold text-foreground mb-6 px-2"
                  onClick={closeSheet}
                >
                  <div className="flex items-center justify-center bg-primary rounded-lg p-1.5">
                    <Mountain className="h-5 w-5 text-primary-foreground" />
                  </div>
                  entrenaconDiego
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors duration-[150ms] hover:bg-secondary hover:text-foreground"
                    onClick={closeSheet}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 px-2">
                  <Button
                    asChild
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={closeSheet}
                  >
                    <a href="#contact">Agenda tu Sesión</a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
