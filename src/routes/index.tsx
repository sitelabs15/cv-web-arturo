import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Menu, X, MessageCircle, Mail, Download, ArrowRight,
  Sparkles, Palette, Film, Layers, Printer, CheckCircle2,
  Briefcase, GraduationCap, MapPin, Languages, Clock, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  fadeIn,
  fadeUp,
  fadeDown,
  scaleIn,
  blurIn,
  staggerContainer,
  staggerItem,
  usePrefersReducedMotion,
  PREMIUM_EASE,
  easeSnappy,
  easeOutQuint,
  easeInOutExpo,
} from "@/lib/animations";

import heroBg from "@/assets/hero-bg.jpg";
import portrait from "@/assets/portrait.jpg";
import portraitNoBg from "@/assets/portrait-nobg.png";
import work1 from "@/assets/Diseño-1.png";
import work2 from "@/assets/Diseño-2.png";
import work3 from "@/assets/Diseño-3.png";
import work4 from "@/assets/Diseño-5.png";
import work5 from "@/assets/Diseño-4.png";
import { AntigravityPanel } from "@/components/AntigravityPanel";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP =
  "https://wa.me/522221711844?text=Hola%20Arturo%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20platicar.";
const EMAIL = "arturourbina6161@gmail.com";

const HARD_SKILLS = [
  { name: "Photoshop", level: 95 },
  { name: "Illustrator", level: 92 },
  { name: "After Effects", level: 82 },
  { name: "InDesign", level: 78 },
  { name: "Premiere / DaVinci", level: 80 },
  { name: "CapCut", level: 85 },
  { name: "Branding", level: 90 },
  { name: "Diseño para redes", level: 95 },
  { name: "WordPress", level: 72 },
  { name: "HTML básico", level: 60 },
  { name: "IA aplicada", level: 75 },
];

const SOFT_SKILLS = [
  { icon: CheckCircle2, title: "Organización y deadlines", desc: "Calendarios mensuales, batch production y entregas en tiempo." },
  { icon: Sparkles, title: "Proactividad y mejora continua", desc: "Propongo líneas gráficas y optimizo procesos." },
  { icon: MessageCircle, title: "Comunicación efectiva", desc: "Trabajo cercano con marketing, ventas y dirección creativa." },
  { icon: Layers, title: "Resolución de problemas", desc: "Criterio para resolver con calidad bajo presión." },
  { icon: Briefcase, title: "Enfoque a objetivos", desc: "Cada pieza responde a un objetivo de comunicación." },
];

const EXPERIENCE = [
  {
    company: "Belahome", role: "Diseñador Gráfico · Marketing Digital · Soporte", years: "2024 — 2026",
    bullets: [
      "Contenido para redes, campañas, reels y video promocional.",
      "Diseño de productos textiles y materiales comerciales.",
      "Soporte a actualización de sitio web.",
      "Producción para impresión gran formato (plotter) y consistencia visual.",
    ],
  },
  {
    company: "Lenkabits", role: "Diseñador Digital · Marketing", years: "2023 — 2024",
    bullets: [
      "Publicaciones comerciales para redes (posts + carruseles).",
      "Foto/edición y presentación de producto.",
      "Video promocional para redes.",
      "Apoyo a estrategias de marketing y branding.",
    ],
  },
  {
    company: "ProVise", role: "Diseñador · Soporte Técnico", years: "2021 — 2023",
    bullets: [
      "Imágenes de venta, branding y materiales publicitarios.",
      "Producción de video para campañas.",
      "Soporte técnico interno como valor agregado.",
    ],
  },
  {
    company: "JLJ Technical Support", role: "Diseño Corporativo · Sistemas", years: "2019 — 2021",
    bullets: [
      "Membretes, folletos, lonas, uniformes y material corporativo.",
      "Presentación de datos y reportes ejecutivos.",
      "Instalación de redes y cámaras (perfil resolutivo).",
    ],
  },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [antigravity, setAntigravity] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Mouse tilt variables for 3D Parallax visual
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = event.clientX - rect.left - width / 2;
    const y = event.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["top", "sobre-mi", "skills", "experiencia", "contacto"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: "-35% 0px -45% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const nav = [
    { label: "Sobre mí", href: "#sobre-mi" },
    { label: "Skills", href: "#skills" },
    { label: "Experiencia", href: "#experiencia" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased relative">
      {/* NAVBAR */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-premium shadow-elegant py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
            <img
              src={portrait}
              alt="Arturo Urbina"
              className="h-9 w-9 rounded-full object-cover border border-primary/20 shadow-glow transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-semibold leading-tight text-foreground">Arturo Urbina</div>
              <div className="text-[11px] leading-tight text-muted-foreground transition-colors group-hover:text-foreground">Diseñador Digital</div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => {
              const isActive = activeSection === n.href;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  className={`relative py-1 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-1 ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-[oklch(0.55_0.22_255)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground btn-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <button
              aria-label="Abrir menú"
              className="grid h-10 w-10 place-items-center rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors hover:bg-surface"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Back backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              />

              {/* Sliding sheet */}
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: easeSnappy }}
                className="fixed inset-y-0 right-0 z-50 w-full max-w-sm glass-premium p-8 shadow-2xl flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-10">
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Menú</div>
                  <button
                    aria-label="Cerrar menú"
                    className="grid h-10 w-10 place-items-center rounded-full bg-surface border border-border text-foreground hover:text-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <motion.nav
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="flex flex-col gap-6 text-3xl font-extrabold tracking-tight"
                >
                  {nav.map((n) => {
                    const isActive = activeSection === n.href;
                    return (
                      <motion.div
                        key={n.href}
                        variants={staggerItem(prefersReducedMotion)}
                      >
                        <a
                          href={n.href}
                          onClick={() => setMenuOpen(false)}
                          className={`block py-1 transition-colors duration-300 ${
                            isActive
                              ? "text-primary text-stroke-white font-black"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {n.label}
                        </a>
                      </motion.div>
                    );
                  })}
                </motion.nav>

                <div className="pt-8 border-t border-border mt-auto">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground btn-glow"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden bg-mesh bg-aurora pt-32 pb-20 md:pt-40 md:pb-28">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-25 mix-blend-screen"
          width={1600}
          height={1200}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8 md:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-start"
          >
            <motion.div variants={staggerItem(prefersReducedMotion)}>
              <Badge variant="outline" className="mb-6 gap-2 rounded-full border-primary/40 bg-primary/10 px-3 py-1.5 text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Disponible para trabajar · Remoto
              </Badge>
            </motion.div>
            
            <motion.h1
              variants={staggerItem(prefersReducedMotion)}
              className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Contenido para redes que se ve{" "}
              <span className="text-gradient-violet">premium</span> y vende.
            </motion.h1>
            
            <motion.p
              variants={staggerItem(prefersReducedMotion)}
              className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
            >
              Diseñador Digital con <strong className="text-foreground">6+ años</strong> creando piezas
              gráficas y audiovisuales, branding y soporte a marketing. Domino Adobe
              (PS/AI/AE/ID) y entrego con orden, criterio y enfoque a objetivos.
            </motion.p>

            <motion.div
              variants={staggerItem(prefersReducedMotion)}
              className="mt-7 flex flex-wrap gap-2"
            >
              {["6+ años de experiencia", "Adobe + Video + Branding", "Remoto · Puebla, MX", "Inglés C1"].map((c) => (
                <span key={c} className="rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground">
                  {c}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={staggerItem(prefersReducedMotion)}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="https://portafolio-web-arturo-lvsuna9eb-arturourbina6161-2033s-projects.vercel.app/" target="_blank" rel="noreferrer">
                <Button size="lg" className="rounded-full px-6 btn-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  Ver portafolio <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="rounded-full border-border bg-surface/60 px-6 btn-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp
                </Button>
              </a>
              <button
                onClick={() => window.print()}
                className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
              >
                Descargar CV (PDF)
              </button>
            </motion.div>
          </motion.div>

          {/* Phone-feed visual with 3D Mouse Tilt Parallax */}
          <div
            className="relative mx-auto w-full max-w-[420px]"
            onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
            onMouseLeave={prefersReducedMotion ? undefined : handleMouseLeave}
            style={{ perspective: 1000 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                rotateX: prefersReducedMotion ? 0 : rotateX,
                rotateY: prefersReducedMotion ? 0 : rotateY,
                transformStyle: "preserve-3d",
              }}
              transition={{ delay: 0.45, duration: 0.65, ease: PREMIUM_EASE }}
              className="relative w-full"
            >
              {/* Glow Behind */}
              <div 
                className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/30 to-[oklch(0.55_0.22_255)]/20 blur-3xl"
                style={{ transform: "translateZ(-40px)" }}
              />
              
              {/* Main Phone Feed */}
              <div 
                className={`relative mx-auto aspect-[9/19] w-full max-w-[320px] rounded-[2.6rem] border border-white/10 bg-surface p-3 shadow-elegant transition-all duration-300 ${antigravity ? "animate-antigravity-1" : ""}`}
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-background" />
                <div className="h-full w-full overflow-hidden rounded-[2rem] border border-white/5">
                  <div className="flex h-full flex-col gap-2 overflow-hidden bg-background p-2">
                    <img src={work2} alt="" className="h-1/3 w-full rounded-xl object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <img src={work1} alt="" className="h-1/3 w-full rounded-xl object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <img src={work5} alt="" className="h-1/3 w-full rounded-xl object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                </div>
              </div>

              {/* Floating Mockup Right */}
              <div 
                className={`absolute -right-2 top-10 hidden w-36 overflow-hidden rounded-2xl border border-white/10 shadow-elegant sm:block transition-all duration-300 ${antigravity ? "animate-antigravity-2" : ""}`}
                style={{ transform: "translateZ(80px) rotate(6deg)" }}
              >
                <img src={work3} alt="" className="w-full object-contain hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>

              {/* Floating Mockup Left */}
              <div 
                className={`absolute -left-4 bottom-6 hidden w-32 overflow-hidden rounded-2xl border border-white/10 shadow-elegant sm:block transition-all duration-300 ${antigravity ? "animate-antigravity-3" : ""}`}
                style={{ transform: "translateZ(60px) rotate(-6deg)" }}
              >
                <img src={work4} alt="" className="h-40 w-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Double Marquee */}
        <div className="relative mt-20 flex flex-col gap-5 overflow-hidden border-y border-border bg-surface/40 py-6">
          {/* First Marquee - Left */}
          <div className="flex overflow-hidden">
            <div className="flex w-[200%] gap-12 animate-marquee whitespace-nowrap text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex shrink-0 items-center gap-12">
                  <span>Belahome</span><span>·</span>
                  <span>Lenkabits</span><span>·</span>
                  <span>ProVise</span><span>·</span>
                  <span>JLJ Technical Support</span><span>·</span>
                  <span>Adobe Creative Suite</span><span>·</span>
                  <span>WordPress</span><span>·</span>
                  <span>After Effects</span><span>·</span>
                  <span>DaVinci Resolve</span><span>·</span>
                  <span>Premiere Pro</span><span>·</span>
                </div>
              ))}
            </div>
          </div>
          {/* Second Marquee - Right (Reverse) */}
          <div className="flex overflow-hidden">
            <div className="flex w-[200%] gap-12 animate-marquee-reverse whitespace-nowrap text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex shrink-0 items-center gap-12">
                  <span>Diseño Gráfico</span><span>·</span>
                  <span>Branding & Identidad</span><span>·</span>
                  <span>Edición de Video</span><span>·</span>
                  <span>Motion Graphics</span><span>·</span>
                  <span>Social Media Content</span><span>·</span>
                  <span>Soporte Técnico</span><span>·</span>
                  <span>UI/UX Básica</span><span>·</span>
                  <span>Producción Digital</span><span>·</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <ScrollReveal id="sobre-mi" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 border-b border-border/40">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          {/* Left: Silhouette Image with Premium Glow Backdrop */}
          <div className="md:col-span-5 relative group flex justify-center">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 via-[oklch(0.55_0.22_255)]/10 to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-surface/40 p-5 shadow-elegant backdrop-blur-md max-w-[340px] ${antigravity ? "animate-antigravity-1" : ""}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10" />
              <img
                src={portraitNoBg}
                alt="Arturo Urbina"
                className="w-full h-auto object-cover max-h-[460px] scale-100 group-hover:scale-[1.02] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-20"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <SectionHeader eyebrow="Sobre mí" title="Diseño y Soluciones Digitales" align="left" />
            
            <div className="mt-8 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Hola, soy <strong className="text-foreground font-semibold">Arturo Urbina</strong>, un perfil creativo y tecnológico con experiencia en diseño gráfico, soporte técnico, marketing digital, redes sociales, impresión, edición de video y desarrollo web.
              </p>
              <p>
                Desde los 18 años he trabajado en diferentes áreas que me han permitido aprender a resolver problemas reales, tratar con clientes, crear contenido visual, reparar equipos, diseñar marcas y desarrollar soluciones digitales para negocios.
              </p>
              <p>
                Me gusta combinar <strong className="text-foreground font-semibold">creatividad, tecnología e inteligencia artificial</strong> para crear proyectos funcionales, modernos y con impacto visual. Mi objetivo es seguir creciendo profesionalmente en áreas donde pueda aportar ideas, diseño, estrategia y soluciones digitales.
              </p>
            </div>
            
            {/* Quick stats / highlights inside about section */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border/60 pt-8">
              <div>
                <div className="text-3xl font-extrabold text-gradient-violet">18+</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Años de edad al iniciar carrera</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-gradient-violet">Multidisciplinar</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Diseño, Sistemas y Web</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* LO QUE HAGO */}
      <ScrollReveal className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader
          eyebrow="Lo que hago"
          title="Diseño que comunica claro y produce resultados"
          desc="Cuatro pilares para entregar contenido premium a tiempo, con criterio y enfoque al objetivo de cada marca."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Palette, t: "Artes para redes", d: "Posts, carruseles y stories con sistema y voz de marca." },
            { icon: Film, t: "Reels y Video", d: "Edición ágil en Premiere, DaVinci y CapCut. Motion en AE." },
            { icon: Layers, t: "Branding", d: "Identidad, líneas gráficas y manuales aplicables." },
            { icon: Printer, t: "Impresión / Web Jr", d: "Gran formato, materiales comerciales y soporte WordPress." },
          ].map(({ icon: Icon, t, d }, i) => (
            <motion.div
              key={t}
              tabIndex={0}
              whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.015 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.995 }}
              transition={{ duration: 0.45, ease: easeSnappy }}
              className={`card-hover group rounded-2xl border border-border bg-surface/60 p-6 focus-visible:ring-2 focus-visible:ring-primary cursor-pointer select-none ${
                antigravity ? (i % 3 === 0 ? "animate-antigravity-1" : i % 3 === 1 ? "animate-antigravity-2" : "animate-antigravity-3") : ""
              }`}
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.55_0.22_255)] text-white shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* PORTAFOLIO */}
      <ScrollReveal id="portafolio" className="border-y border-border bg-surface/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8 text-center">
          <SectionHeader
            eyebrow="Portafolio"
            title="Mi portafolio completo"
            desc="Visita mi web dedicada para explorar todos mis proyectos y trabajos a detalle."
          />
          <div className="mt-10">
            <a href="https://portafolio-web-arturo-lvsuna9eb-arturourbina6161-2033s-projects.vercel.app/" target="_blank" rel="noreferrer">
              <Button size="lg" className="rounded-full px-8 btn-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Ver portafolio completo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* SKILLS */}
      <ScrollReveal id="skills" className="border-y border-border bg-surface/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Habilidades"
            title="Stack creativo y mentalidad de equipo"
            desc="Hard skills enfocadas a producción y soft skills para colaborar con marketing y dirección creativa."
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">Hard skills</h3>
              <div className="space-y-6">
                {HARD_SKILLS.map((s) => (
                  <SkillProgressBar key={s.name} name={s.name} level={s.level} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">Soft skills</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {SOFT_SKILLS.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    tabIndex={0}
                    whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.015 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.995 }}
                    transition={{ duration: 0.45, ease: easeSnappy }}
                    className={`card-hover rounded-2xl border border-border bg-surface/70 p-5 focus-visible:ring-2 focus-visible:ring-primary cursor-pointer select-none ${
                      antigravity ? (i % 3 === 0 ? "animate-antigravity-2" : i % 3 === 1 ? "animate-antigravity-3" : "animate-antigravity-1") : ""
                    }`}
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 font-semibold">{title}</h4>
                    <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* PROCESO */}
      <ScrollReveal className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader
          eyebrow="Proceso"
          title="Cómo produzco contenido que entrega"
          desc="Un sistema claro para escalar la producción mensual sin perder calidad."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "01", t: "Brief + objetivos", d: "Alineación clara con marketing y dirección creativa." },
            { n: "02", t: "Research + tendencia", d: "Marca, audiencia, referencia visual y best-in-class." },
            { n: "03", t: "Concepto → batch", d: "Línea gráfica, plantillas y producción por lotes." },
            { n: "04", t: "Entrega + iteración", d: "Versiones por formato, naming consistente y revisión." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              tabIndex={0}
              whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.015 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.995 }}
              transition={{ duration: 0.45, ease: easeSnappy }}
              className={`card-hover rounded-2xl border border-border bg-surface/60 p-6 focus-visible:ring-2 focus-visible:ring-primary cursor-pointer select-none ${
                antigravity ? (i % 3 === 0 ? "animate-antigravity-2" : i % 3 === 1 ? "animate-antigravity-1" : "animate-antigravity-3") : ""
              }`}
            >
              <div className="text-5xl font-extrabold text-gradient-violet">{s.n}</div>
              <h3 className="mt-4 font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface/50 p-6 md:p-8">
          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Checklist de calidad</div>
          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
            {["Naming de archivos consistente", "Plantillas por marca", "Calendario mensual de contenido", "Versiones por formato (1:1, 4:5, 9:16)"].map((i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{i}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* EXPERIENCIA - REDESIGNED TO PREMIUM SPLIT ROW TABLE LAYOUT */}
      <ScrollReveal id="experiencia" className="border-y border-border bg-surface/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Experiencia"
            title="6+ años produciendo para marcas reales"
            desc="Diseño aplicado a redes, branding, video y materiales comerciales."
          />
          <div className="border-t border-border mt-16 divide-y divide-border/60">
            {EXPERIENCE.map((e, i) => (
              <motion.div
                key={e.company}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: easeOutQuint, delay: i * 0.12 }}
                className={`group py-8 px-4 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.015] transition-colors duration-300 rounded-xl ${
                  antigravity ? (i % 3 === 0 ? "animate-antigravity-1" : i % 3 === 1 ? "animate-antigravity-2" : "animate-antigravity-3") : ""
                }`}
              >
                {/* Left Column: Number + Name */}
                <div className="flex items-center gap-6 min-w-[280px]">
                  <span className="text-5xl font-black text-stroke-white group-hover:text-primary transition-colors duration-300 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{e.company}</h3>
                    <p className="text-sm text-muted-foreground">{e.role}</p>
                  </div>
                </div>

                {/* Center Column: Bullets */}
                <div className="flex-1 max-w-2xl">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Year */}
                <div className="text-right">
                  <span className="rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted-foreground font-semibold uppercase tracking-wider group-hover:border-primary/50 group-hover:text-foreground transition-all duration-300">
                    {e.years}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* EDUCACIÓN + TOOLKIT */}
      <ScrollReveal className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Educación" title="Formación" align="left" />
            <div className="mt-8 space-y-4">
              {[
                { t: "Ingeniería en Software Web y Diseño", s: "DASC · Instituto Tecnológico Universitario" },
                { t: "Diseño Gráfico", s: "Instituto de Artes Visuales del Estado de Puebla" },
              ].map((ed, i) => (
                <motion.div
                  key={ed.t}
                  tabIndex={0}
                  whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.015 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.995 }}
                  transition={{ duration: 0.45, ease: easeSnappy }}
                  className={`card-hover flex items-start gap-4 rounded-2xl border border-border bg-surface/60 p-5 focus-visible:ring-2 focus-visible:ring-primary cursor-pointer select-none ${
                    antigravity ? (i % 2 === 0 ? "animate-antigravity-1" : "animate-antigravity-3") : ""
                  }`}
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{ed.t}</div>
                    <div className="text-sm text-muted-foreground">{ed.s}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader eyebrow="Toolkit" title="Stack de trabajo" align="left" />
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Photoshop", "Illustrator", "After Effects", "InDesign",
                "Premiere Pro", "DaVinci Resolve", "CapCut", "Canva",
                "WordPress", "Elementor", "HTML/CSS", "Figma", "IA aplicada",
              ].map((t) => (
                <motion.span
                  key={t}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2, borderColor: "rgba(124, 58, 237, 0.4)" }}
                  transition={{ duration: 0.2, ease: easeSnappy }}
                  className="rounded-full border border-border bg-surface/60 px-3.5 py-2 text-sm text-foreground cursor-default select-none transition-colors"
                >
                  {t}
                </motion.span>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: MapPin, t: "Ubicación", v: "Puebla, MX · Remoto" },
                { icon: Languages, t: "Idiomas", v: "Español · Inglés C1" },
                { icon: Clock, t: "Disponibilidad", v: "L–V · Zona CDMX" },
              ].map(({ icon: Icon, t, v }, i) => (
                <Card key={t} tabIndex={0} className={`rounded-2xl border-border bg-surface/60 p-4 focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300 hover:border-primary/30 ${
                  antigravity ? (i % 3 === 0 ? "animate-antigravity-3" : i % 3 === 1 ? "animate-antigravity-1" : "animate-antigravity-2") : ""
                }`}>
                  <Icon className="h-4 w-4 text-primary" />
                  <div className="mt-3 text-[11px] uppercase tracking-widest text-muted-foreground">{t}</div>
                  <div className="mt-1 text-sm font-medium">{v}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* CTA + CONTACTO */}
      <ScrollReveal id="contacto" className="relative overflow-hidden bg-mesh py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-8 md:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 -bottom-20 h-72 w-72 rounded-full bg-[oklch(0.55_0.22_255)]/30 blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
                <Badge variant="outline" className="rounded-full border-primary/40 bg-primary/10 text-primary">
                  Contacto
                </Badge>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">
                  Listo para diseñar <span className="text-gradient-violet">contenido que convierta</span>.
                </h2>
                <p className="mt-5 max-w-lg text-muted-foreground">
                  Puedo integrarme a tu flujo creativo, entregar a tiempo y proponer
                  líneas gráficas frescas para cada marca del portafolio.
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <a
                    href={`mailto:${EMAIL}?subject=Entrevista%20—%20Dise%C3%B1ador%20de%20Contenido&body=Hola%20Arturo%2C%20me%20gustar%C3%ADa%20agendar%20una%20entrevista.`}
                  >
                    <Button size="lg" className="rounded-full px-6 btn-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      Agendar entrevista <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </a>
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">
                    <Button size="lg" variant="outline" className="rounded-full border-border bg-surface px-6 btn-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp
                    </Button>
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
                  <a href={`tel:+522221711844`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1">
                    <Phone className="h-4 w-4 text-primary" /> +52 222 171 1844
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1">
                    <Mail className="h-4 w-4 text-primary" /> {EMAIL}
                  </a>
                </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* FOOTER */}
      <ScrollReveal as="footer" className="border-t border-border bg-background py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-8">
          <div className="flex items-center gap-3">
            <img src={portrait} alt="Arturo Urbina" className="h-10 w-10 rounded-full object-cover" loading="lazy" />
            <div>
              <div className="text-sm font-semibold">Carlos Arturo Urbina Reyes</div>
              <div className="text-xs text-muted-foreground">Diseñador Digital · Puebla, MX</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-full border border-border bg-surface px-3 py-1.5 hover:text-foreground icon-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">WhatsApp</a>
            <a href={`mailto:${EMAIL}`} className="rounded-full border border-border bg-surface px-3 py-1.5 hover:text-foreground icon-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Email</a>
            <button onClick={() => window.print()} className="rounded-full border border-border bg-surface px-3 py-1.5 hover:text-foreground cursor-pointer icon-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <span className="inline-flex items-center gap-1"><Download className="h-3.5 w-3.5" /> CV PDF</span>
            </button>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Arturo Urbina. Todos los derechos reservados.</p>
      </ScrollReveal>

      {/* WhatsApp Floating — portaled to body so it escapes all transform/stacking contexts */}
      {typeof document !== "undefined" && createPortal(
        <div className="whatsapp-fab-wrapper fixed bottom-5 right-5 z-[9999] flex items-center gap-3">
          <span className="fab-tooltip rounded-full bg-surface border border-border px-4 py-2 text-sm font-semibold text-foreground shadow-elegant whitespace-nowrap select-none">
            ¡Envíame un mensaje!
          </span>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="animate-fab-bounce grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-success to-[oklch(0.55_0.18_150)] text-white shadow-elegant btn-glow"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
        </div>,
        document.body
      )}

      {/* Antigravity Controller Easter Egg Panel */}
      <AntigravityPanel antigravity={antigravity} setAntigravity={setAntigravity} />
    </div>
  );
}

/* ---------- helpers ---------- */

function SectionHeader({
  eyebrow, title, desc, align = "center",
}: { eyebrow: string; title: string; desc?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] uppercase tracking-widest text-primary">
        <span className="h-1 w-1 rounded-full bg-primary" /> {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </div>
  );
}


/* ---------- animations helper components ---------- */

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  as?: "section" | "div" | "footer";
}

function ScrollReveal({ children, className, id, delay = 0, as = "section" }: ScrollRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const Component = (motion as any)[as];

  return (
    <Component
      id={id}
      className={className}
      initial={{ 
        opacity: 0, 
        y: prefersReducedMotion ? 0 : 24, 
        filter: prefersReducedMotion ? "none" : "blur(6px)" 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)" 
      }}
      viewport={{ once: true, amount: 0.25 }} // Matches reference viewport amount
      transition={{ 
        duration: 0.65, 
        ease: easeOutQuint,
        delay: delay
      }}
    >
      {children}
    </Component>
  );
}

interface SkillProgressBarProps {
  name: string;
  level: number;
}

function SkillProgressBar({ name, level }: SkillProgressBarProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="mb-6 relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-foreground">{name}</span>
      </div>
      <div className="relative h-1 bg-surface rounded-full overflow-visible">
        {/* Animated Bar Fill */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            type: prefersReducedMotion ? "tween" : "spring",
            stiffness: 70,
            damping: 15,
            delay: 0.1,
          }}
          className="absolute h-full bg-gradient-to-r from-primary to-[oklch(0.55_0.22_255)] rounded-full"
        >
          {/* Floating Tooltip Percentage Label */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.5, duration: 0.25 }}
            className="absolute right-0 -translate-y-full -top-3 translate-x-1/2 bg-surface-2 border border-border text-[10px] font-bold py-1 px-2 rounded-md shadow-lg text-primary select-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[var(--surface-2)]"
          >
            {level}%
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
