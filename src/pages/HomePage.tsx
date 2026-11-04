import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, MapPin, Eye, ChevronDown } from 'lucide-react';
import { Header } from '../features/home/Header';
import { Footer } from '../features/home/Footer';
import { useExperience } from '../app/providers';
import { DemoDisclosure } from '../components/DemoDisclosure';
import { HomeScrollScene } from '../scene/HomeScrollScene';
import { SceneBoundary } from '../scene/SceneBoundary';

export function HomePage() {
  const { project, state, dispatch } = useExperience();
  const scrollTrackRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isPastStage, setIsPastStage] = useState(false);

  const savedCount = state.preferences.savedIds.length;
  const skylineCollection = project.collections.find((c) => c.id === 'skyline');
  const gardenCollection = project.collections.find((c) => c.id === 'garden');
  const penthouseCollection = project.collections.find((c) => c.id === 'penthouse');

  // Detect user motion preferences
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(media.matches);
    const onChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // Time-damped native scroll calculation and active section spy with settled idle pause
  useEffect(() => {
    let animId: number | null = null;
    let targetP = 0;
    let currentP = 0;
    let lastTime = performance.now();
    let isRunning = false;

    const calculateScroll = () => {
      if (!scrollTrackRef.current) return;
      const rect = scrollTrackRef.current.getBoundingClientRect();
      const trackHeight = scrollTrackRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const totalScrollable = trackHeight - viewportHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      targetP = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      // Dynamic header state: past the pinned stage when track top has scrolled near bottom
      setIsPastStage(rect.bottom <= 120);

      // Section spy for active header navigation
      const sections = ['enquiry', 'location', 'amenities', 'residences', 'vision'];
      let found = false;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          if (elRect.top <= 200 && elRect.bottom >= 150) {
            setActiveSection(id === 'enquiry' ? 'location' : id);
            found = true;
            break;
          }
        }
      }
      if (!found && rect.bottom > 120) {
        setActiveSection('hero');
      }

      // Start animation loop if not already running and not settled
      if (!isRunning && Math.abs(targetP - currentP) > 0.0005) {
        isRunning = true;
        lastTime = performance.now();
        animId = requestAnimationFrame(updateLoop);
      }
    };

    const updateLoop = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (isReducedMotion) {
        currentP = targetP;
      } else {
        const factor = 1 - Math.exp(-delta * 12);
        currentP += (targetP - currentP) * factor;
      }

      // Check if settled
      if (Math.abs(targetP - currentP) <= 0.0005) {
        currentP = targetP;
        setScrollProgress(currentP);
        isRunning = false;
        animId = null;
        return;
      }

      setScrollProgress(currentP);
      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', calculateScroll, { passive: true });
    window.addEventListener('resize', calculateScroll);
    calculateScroll();

    return () => {
      window.removeEventListener('scroll', calculateScroll);
      window.removeEventListener('resize', calculateScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isReducedMotion]);

  // Working Skip to Content handler
  const handleSkipToDetails = () => {
    if (!scrollTrackRef.current) return;
    const rect = scrollTrackRef.current.getBoundingClientRect();
    const targetY = window.scrollY + rect.bottom;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Synchronized story beat opacities with gentle overlap
  const s = scrollProgress;
  const beat1Opacity = Math.max(1 - s * 4.2, 0);
  const beat2Opacity = Math.min(Math.max((s - 0.20) * 12, 0), Math.max((0.52 - s) * 12, 0));
  const beat3Opacity = Math.min(Math.max((s - 0.50) * 12, 0), Math.max((0.80 - s) * 14, 0));
  const beat4Opacity = Math.min(Math.max((s - 0.80) * 16, 0), Math.max(1 - (s - 0.93) * 16, 0));

  // Current chapter metadata
  const currentChapter =
    s < 0.25
      ? { num: '01/04', title: 'Exterior' }
      : s < 0.52
      ? { num: '02/04', title: 'The Loggia' }
      : s < 0.82
      ? { num: '03/04', title: 'Living Salon' }
      : { num: '04/04', title: 'Sunset Outlook' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-paper)' }}>
      {/* Integrated Dynamic Header: Transparent/Dark Overlay over live 3D, transitioning smoothly to compact ivory past stage */}
      <Header isOverlay={!isPastStage} activeSection={activeSection} />

      <main style={{ flex: 1 }}>
        {/* ================================================================ */}
        {/* 1. FULL-VIEWPORT LIVE 3D HERO & PINNED ARCHITECTURAL SCROLL TRACK */}
        {/* ================================================================ */}
        <section
          ref={scrollTrackRef}
          style={{
            position: 'relative',
            height: isReducedMotion ? '100vh' : '360vh',
            backgroundColor: '#18221F'
          }}
        >
          {/* Sticky 100vh Viewport */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              width: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Live 3D Scene Layer */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <SceneBoundary
                fallback={
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'radial-gradient(circle at 65% 35%, #2B3B35 0%, #16201D 50%, #0E1513 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F4F0E8',
                      padding: '40px'
                    }}
                  >
                    <div style={{ maxWidth: '480px', textAlign: 'center' }}>
                      <span className="text-eyebrow" style={{ color: 'var(--color-bronze-light)' }}>
                        AUREL RESIDENCES
                      </span>
                      <h2 className="font-serif" style={{ fontSize: '36px', margin: '16px 0' }}>
                        Architectural sanctuary above the city.
                      </h2>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
                        12 bespoke residences sculpted from limestone, glass and private garden loggias.
                      </p>
                    </div>
                  </div>
                }
              >
                <HomeScrollScene scrollProgress={scrollProgress} isReducedMotion={isReducedMotion} />
              </SceneBoundary>
            </div>

            {/* Left Protective Dark Gradient Scrim to ensure crisp typography contrast */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: 'min(580px, 78vw)',
                background: 'linear-gradient(to right, rgba(14, 21, 18, 0.92) 0%, rgba(14, 21, 18, 0.6) 60%, rgba(14, 21, 18, 0) 100%)',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            />

            {/* Subtle Synchronized Chapter Indicator (e.g. 01/04 · Exterior) */}
            <div
              style={{
                position: 'absolute',
                top: '90px',
                right: 'var(--gutter)',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 16px',
                backgroundColor: 'rgba(16, 24, 21, 0.70)',
                backdropFilter: 'blur(12px)',
                borderRadius: '100px',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                opacity: s < 0.92 ? 1 : Math.max(0, (0.97 - s) / 0.05),
                transition: 'opacity 200ms ease'
              }}
            >
              <span style={{ fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.14em', color: 'var(--color-bronze-light)', fontWeight: 600 }}>
                {currentChapter.num}
              </span>
              <span style={{ width: '1px', height: '10px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#FFFFFF', fontWeight: 500 }}>
                {currentChapter.title}
              </span>
            </div>

            {/* Synchronized Content Beats Layer */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                flex: 1,
                pointerEvents: 'none',
                maxWidth: 'var(--max-width)',
                width: '100%',
                margin: '0 auto',
                padding: '96px var(--gutter) 40px var(--gutter)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* BEAT 1: Initial Hero Masthead (s = 0.00 to 0.25) */}
              <div
                style={{
                  opacity: beat1Opacity,
                  transform: `translateY(-${s * 45}px)`,
                  transition: 'opacity 140ms ease-out',
                  pointerEvents: beat1Opacity > 0.05 ? 'auto' : 'none',
                  maxWidth: '680px',
                  marginTop: 'auto',
                  marginBottom: '28px'
                }}
              >
                <span
                  className="text-eyebrow"
                  style={{
                    color: 'var(--color-bronze-light)',
                    display: 'inline-block',
                    marginBottom: '16px'
                  }}
                >
                  AUREL / CONCEPT RESIDENCES
                </span>

                <h1
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(44px, 6.2vw, 84px)',
                    lineHeight: 1.02,
                    letterSpacing: '-0.02em',
                    marginBottom: '20px',
                    fontWeight: 500,
                    color: '#FFFFFF',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }}
                >
                  A different perspective on home.
                </h1>

                <p
                  style={{
                    fontSize: 'clamp(17px, 1.8vw, 21px)',
                    lineHeight: 1.5,
                    color: 'rgba(244, 240, 232, 0.95)',
                    marginBottom: '32px',
                    maxWidth: '560px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.4)'
                  }}
                >
                  Garden terraces. Thoughtful spaces. A quieter rhythm above the city.
                </p>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Link
                    to="/explore/building"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 28px',
                      backgroundColor: 'var(--color-green)',
                      color: '#FFFFFF',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    <Building2 size={16} />
                    <span>Explore Building</span>
                  </Link>

                  <Link
                    to="/explore/floors/8"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 24px',
                      border: '1px solid rgba(255, 255, 255, 0.35)',
                      backgroundColor: 'rgba(24, 34, 31, 0.75)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    <span>View Level 8</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <DemoDisclosure text="An illustrative luxury property experience — concept demonstration only." />
                </div>
              </div>

              {/* BEAT 2: Facade & Terrace Reveal (s = 0.25 to 0.52) */}
              <div
                style={{
                  position: 'absolute',
                  top: '22%',
                  left: 'var(--gutter)',
                  maxWidth: '460px',
                  backgroundColor: 'rgba(22, 32, 28, 0.88)',
                  backdropFilter: 'blur(16px)',
                  padding: '32px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#FFFFFF',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.45)',
                  opacity: beat2Opacity,
                  transform: `translateY(${s < 0.25 ? 20 : s > 0.48 ? -20 : 0}px)`,
                  transition: 'opacity 160ms ease-out',
                  pointerEvents: beat2Opacity > 0.1 ? 'auto' : 'none'
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--color-bronze-light)',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '8px'
                  }}
                >
                  Level 8 · The Skyline Suite
                </span>
                <h3 className="font-serif" style={{ fontSize: '30px', lineHeight: 1.15, marginBottom: '14px' }}>
                  Sculpted from stone, glass and living green.
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(244, 240, 232, 0.88)', marginBottom: '20px' }}>
                  Articulated limestone piers, deep bronze window reveals, and private landscaped loggias that invite natural daylight and fresh ventilation into every space.
                </p>
                <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px', fontSize: '13px' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-bronze-light)', fontSize: '18px' }}>192 m²</strong>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Internal Area</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-bronze-light)', fontSize: '18px' }}>12 m²</strong>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Private Terrace</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-bronze-light)', fontSize: '18px' }}>2.9m</strong>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Finished Ceiling</span>
                  </div>
                </div>
              </div>

              {/* BEAT 3: Living Salon Interior Reveal (s = 0.52 to 0.82) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '72px',
                  right: 'var(--gutter)',
                  maxWidth: '480px',
                  backgroundColor: 'rgba(22, 32, 28, 0.90)',
                  backdropFilter: 'blur(16px)',
                  padding: '32px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#FFFFFF',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                  opacity: beat3Opacity,
                  transform: `translateY(${s < 0.55 ? 20 : s > 0.78 ? -20 : 0}px)`,
                  transition: 'opacity 160ms ease-out',
                  pointerEvents: beat3Opacity > 0.1 ? 'auto' : 'none'
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--color-bronze-light)',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '8px'
                  }}
                >
                  Show Residence Interior
                </span>
                <h3 className="font-serif" style={{ fontSize: '30px', lineHeight: 1.15, marginBottom: '14px' }}>
                  Spaces of quiet elegance.
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(244, 240, 232, 0.88)', marginBottom: '20px' }}>
                  Smoked oak parquetry, bespoke fluted walnut joinery, and honed travertine framed by panoramic acoustic glazing that seamlessly opens onto private outdoor living.
                </p>
                <Link
                  to="/explore/homes/A0801/tour/living"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 22px',
                    backgroundColor: 'var(--color-bronze)',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  <Eye size={15} />
                  <span>Launch Full 3D Walkthrough</span>
                </Link>
              </div>

              {/* BEAT 4: Balcony Horizon & Release (s >= 0.80) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '72px',
                  left: 'var(--gutter)',
                  maxWidth: '460px',
                  backgroundColor: 'rgba(22, 32, 28, 0.90)',
                  backdropFilter: 'blur(16px)',
                  padding: '28px 32px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#FFFFFF',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.45)',
                  opacity: beat4Opacity,
                  transform: `translateY(${s < 0.82 ? 15 : 0}px)`,
                  transition: 'opacity 160ms ease-out',
                  pointerEvents: beat4Opacity > 0.1 ? 'auto' : 'none'
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--color-bronze-light)',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '6px'
                  }}
                >
                  Outdoor Living
                </span>
                <h3 className="font-serif" style={{ fontSize: '28px', lineHeight: 1.15, marginBottom: '12px' }}>
                  Sunset horizon above the city.
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(244, 240, 232, 0.88)', lineHeight: 1.6, marginBottom: '18px' }}>
                  Honed travertine terraces open to sweeping western sky views, framed by crystal acoustic glass balustrades and private plantings.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Link
                    to="/explore/building"
                    style={{
                      padding: '10px 20px',
                      backgroundColor: 'var(--color-green)',
                      color: '#FFFFFF',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: 500
                    }}
                  >
                    Select a Residence
                  </Link>
                </div>
              </div>

              {/* Bottom Nav / Skip Link (Gracefully fades out before pin release) */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: '12px',
                  opacity: Math.max(0, Math.min(1, (0.88 - s) * 10)),
                  pointerEvents: s < 0.86 ? 'auto' : 'none',
                  transition: 'opacity 200ms ease'
                }}
              >
                <span>Scroll to explore architectural reveal</span>
                <button
                  onClick={handleSkipToDetails}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--color-bronze-light)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 500,
                    background: 'none',
                    border: 'none'
                  }}
                >
                  <span>Skip to details</span>
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Seamless Dark-to-Paper Gradient Dissolve at Pin Release */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '140px',
                background: 'linear-gradient(to bottom, rgba(24, 34, 31, 0) 0%, rgba(244, 240, 232, 0.85) 75%, var(--color-paper) 100%)',
                zIndex: 15,
                pointerEvents: 'none',
                opacity: Math.min(Math.max((s - 0.86) * 7, 0), 1)
              }}
            />
          </div>
        </section>

        {/* ================================================================ */}
        {/* 2. VISION & AUTHORED MATERIALITY SWATCH BOARD                     */}
        {/* ================================================================ */}
        <section
          id="vision"
          style={{
            padding: '120px var(--gutter)',
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            scrollMarginTop: '80px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '64px',
              alignItems: 'center'
            }}
          >
            {/* Architectural Statement */}
            <div>
              <span className="text-eyebrow" style={{ display: 'block', marginBottom: '12px' }}>
                The Architectural Vision
              </span>
              <h2 className="font-serif" style={{ fontSize: 'clamp(32px, 4vw, 54px)', lineHeight: 1.15, marginBottom: '24px' }}>
                Sculpted in pale stone and quiet bronze.
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>
                AUREL reinterprets urban sanctuary living through a disciplined balance of solid limestone piers, deep floor-to-ceiling glass reveals, and private landscaped loggias that invite daylight and tranquility into everyday life.
              </p>

              {/* 3 Fact Labels */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid var(--color-line)', paddingTop: '24px' }}>
                <div>
                  <strong className="font-serif" style={{ fontSize: '28px', display: 'block', color: 'var(--color-green)' }}>
                    12
                  </strong>
                  <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>Residential levels</span>
                </div>
                <div>
                  <strong className="font-serif" style={{ fontSize: '28px', display: 'block', color: 'var(--color-bronze)' }}>
                    3
                  </strong>
                  <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>Curated collections</span>
                </div>
                <div>
                  <strong className="font-serif" style={{ fontSize: '28px', display: 'block', color: 'var(--color-green)' }}>
                    4.6m
                  </strong>
                  <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>Arrival portico</span>
                </div>
              </div>
            </div>

            {/* Authored Materiality Swatch Board with Genuine Texture Close-ups */}
            <div
              style={{
                backgroundColor: '#FAF8F4',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-line)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 32px rgba(0,0,0,0.03)'
              }}
            >
              {/* Architectural Facade Detail Close-up */}
              <div style={{ width: '100%', height: '260px', overflow: 'hidden', backgroundColor: '#1E2824' }}>
                <img
                  src="/assets/images/facade-detail.svg"
                  alt="AUREL Facade reveal and bronze mullion composition"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '32px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <span className="text-eyebrow" style={{ marginBottom: '6px' }}>Craft & Materiality</span>
                  <h3 className="font-serif" style={{ fontSize: '26px' }}>
                    Curated Material Palette
                  </h3>
                </div>

                {/* 4 Genuine Material Textures */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {/* 1. Roman Travertine */}
                  <div style={{ padding: '14px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-line)' }}>
                    <div style={{ width: '100%', height: '80px', borderRadius: 'var(--radius-xs)', overflow: 'hidden', marginBottom: '10px', border: '1px solid rgba(0,0,0,0.08)' }}>
                      <img src="/assets/images/texture-travertine.svg" alt="Honed Roman Travertine limestone texture close-up" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <strong style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Honed Travertine</strong>
                    <span style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.4, display: 'block' }}>
                      Porous Italian limestone piers offering natural thermal mass and acoustic quietness.
                    </span>
                  </div>

                  {/* 2. Satin Bronze */}
                  <div style={{ padding: '14px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-line)' }}>
                    <div style={{ width: '100%', height: '80px', borderRadius: 'var(--radius-xs)', overflow: 'hidden', marginBottom: '10px', border: '1px solid rgba(0,0,0,0.08)' }}>
                      <img src="/assets/images/texture-bronze.svg" alt="Satin Architectural Bronze texture close-up" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <strong style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Satin Bronze</strong>
                    <span style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.4, display: 'block' }}>
                      Custom extruded window mullions, soffit details and fluted privacy louvers.
                    </span>
                  </div>

                  {/* 3. Smoked Oak */}
                  <div style={{ padding: '14px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-line)' }}>
                    <div style={{ width: '100%', height: '80px', borderRadius: 'var(--radius-xs)', overflow: 'hidden', marginBottom: '10px', border: '1px solid rgba(0,0,0,0.08)' }}>
                      <img src="/assets/images/texture-oak.svg" alt="Smoked European Oak parquetry texture close-up" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <strong style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Smoked Oak</strong>
                    <span style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.4, display: 'block' }}>
                      Chevron timber parquetry with natural matte plant-based oil treatment.
                    </span>
                  </div>

                  {/* 4. Acoustic Glazing */}
                  <div style={{ padding: '14px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-line)' }}>
                    <div style={{ width: '100%', height: '80px', borderRadius: 'var(--radius-xs)', overflow: 'hidden', marginBottom: '10px', border: '1px solid rgba(0,0,0,0.08)' }}>
                      <img src="/assets/images/texture-glazing.svg" alt="Low-Iron Acoustic Glazing texture close-up" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <strong style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Acoustic Glazing</strong>
                    <span style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.4, display: 'block' }}>
                      Proposed concept double-glazed insulated units engineered for tranquil interiors.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 3. CURATED RESIDENCE COLLECTIONS (Editorial Asymmetrical Layout)  */}
        {/* ================================================================ */}
        <section
          id="residences"
          style={{
            padding: '96px var(--gutter)',
            backgroundColor: '#FAF8F4',
            borderTop: '1px solid var(--color-line)',
            borderBottom: '1px solid var(--color-line)',
            scrollMarginTop: '80px'
          }}
        >
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="text-eyebrow">The Residence Collections</span>
                <h2 className="font-serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '4px 0 0 0' }}>
                  Three Distinct Expressions
                </h2>
              </div>
              <Link
                to="/explore/building"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-green)',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                <span>Explore all {project.units.length} example homes in 3D</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Asymmetrical Editorial Composition: 1 Featured Large + 2 Supporting */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
              {/* Featured Large Card: Skyline Residence (Level 8) */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-line)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.04)'
                }}
              >
                <div>
                  <div style={{ width: '100%', height: '320px', overflow: 'hidden', backgroundColor: '#1A2521', position: 'relative' }}>
                    <img
                      src="/assets/images/collection-skyline.svg"
                      alt="The Skyline Residence Level 8 architectural rendering"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'var(--color-green)', color: '#FFFFFF', padding: '6px 14px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}>
                      FEATURED CONCEPT
                    </div>
                  </div>

                  <div style={{ padding: '36px 36px 20px 36px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-bronze)', fontWeight: 600 }}>
                      {skylineCollection?.bedrooms || 3} Bedrooms · Level 8 · Corner Aspect
                    </span>
                    <h3 className="font-serif" style={{ fontSize: '32px', margin: '8px 0 14px 0' }}>
                      {skylineCollection?.name || 'Skyline Residence'}
                    </h3>
                    <p style={{ fontSize: '15px', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '28px' }}>
                      A panoramic corner suite featuring deep limestone piers, dual-aspect glazed living, and a private landscaped sunset terrace over the cultural district.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-line)', paddingTop: '20px', fontSize: '14px' }}>
                      <div>
                        <span style={{ color: 'var(--color-muted)', display: 'block', fontSize: '12px' }}>Internal Living</span>
                        <strong style={{ fontSize: '18px', color: 'var(--color-ink)' }}>{skylineCollection?.internalAreaM2 || 192} m²</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-muted)', display: 'block', fontSize: '12px' }}>Private Terrace</span>
                        <strong style={{ fontSize: '18px', color: 'var(--color-ink)' }}>{skylineCollection?.terraceAreaM2 || 12} m²</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-muted)', display: 'block', fontSize: '12px' }}>Ceiling Height</span>
                        <strong style={{ fontSize: '18px', color: 'var(--color-ink)' }}>2.9m</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0 36px 36px 36px' }}>
                  <Link
                    to="/explore/floors/8"
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 'var(--color-green)',
                      color: '#FFFFFF',
                      borderRadius: 'var(--radius-sm)',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>Explore Level 8 &amp; Floor Plans</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Stacked Supporting Panels: Garden & Penthouse */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {/* 1. Garden Residence (Level 4) */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-line)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    flex: 1
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 40%) 1fr' }}>
                    <div style={{ height: '100%', minHeight: '180px', backgroundColor: '#1A2521' }}>
                      <img
                        src="/assets/images/collection-garden.svg"
                        alt="Garden Residence architectural rendering"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-bronze)', fontWeight: 600 }}>
                          {gardenCollection?.bedrooms || 2} Bedrooms · Level 4
                        </span>
                        <h4 className="font-serif" style={{ fontSize: '22px', margin: '4px 0 8px 0' }}>
                          {gardenCollection?.name || 'Garden Residence'}
                        </h4>
                        <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                          Two-bedroom sanctuary opening onto an expansive {gardenCollection?.terraceAreaM2 || 24} m² planted garden terrace.
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-line)', paddingTop: '12px' }}>
                        <div>
                          <strong style={{ fontSize: '14px' }}>{gardenCollection?.internalAreaM2 || 160} m²</strong>
                          <span style={{ fontSize: '11px', color: 'var(--color-muted)', marginLeft: '6px' }}>+ {gardenCollection?.terraceAreaM2 || 24} m² terrace</span>
                        </div>
                        <Link
                          to="/explore/floors/4"
                          style={{
                            padding: '8px 14px',
                            backgroundColor: 'var(--color-ink)',
                            color: '#FFFFFF',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '12px',
                            fontWeight: 500,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>Level 4</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Terrace Penthouse (Level 12) */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-line)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    flex: 1
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 40%) 1fr' }}>
                    <div style={{ height: '100%', minHeight: '180px', backgroundColor: '#141E1A' }}>
                      <img
                        src="/assets/images/collection-penthouse.svg"
                        alt="Terrace Penthouse architectural rendering"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-bronze)', fontWeight: 600 }}>
                          {penthouseCollection?.bedrooms || 3} Bedrooms · Level 12 · Crown
                        </span>
                        <h4 className="font-serif" style={{ fontSize: '22px', margin: '4px 0 8px 0' }}>
                          {penthouseCollection?.name || 'Terrace Penthouse'}
                        </h4>
                        <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                          Top-floor crown residence opening onto an expansive {penthouseCollection?.terraceAreaM2 || 36} m² rooftop terrace with panoramic city vistas.
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-line)', paddingTop: '12px' }}>
                        <div>
                          <strong style={{ fontSize: '14px' }}>{penthouseCollection?.internalAreaM2 || 192} m²</strong>
                          <span style={{ fontSize: '11px', color: 'var(--color-muted)', marginLeft: '6px' }}>+ {penthouseCollection?.terraceAreaM2 || 36} m² terrace</span>
                        </div>
                        <Link
                          to="/explore/floors/12"
                          style={{
                            padding: '8px 14px',
                            backgroundColor: 'var(--color-ink)',
                            color: '#FFFFFF',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '12px',
                            fontWeight: 500,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>Level 12</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 4. BALANCED 2x2 AMENITIES GRID (No orphaned layout cards)         */}
        {/* ================================================================ */}
        <section
          id="amenities"
          style={{
            padding: '96px var(--gutter)',
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            scrollMarginTop: '80px'
          }}
        >
          <div style={{ marginBottom: '48px' }}>
            <span className="text-eyebrow">Resident Amenities</span>
            <h2 className="font-serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '4px 0 12px 0' }}>
              Spaces Designed for Rest &amp; Community
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '16px', maxWidth: '640px', lineHeight: 1.6 }}>
              A curated suite of private residential facilities sculpted from honed limestone, bronze detailing, and mature botanical plantings.
            </p>
          </div>

          {/* Intentionally Composed 2x2 Grid (No orphaned row on desktop) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: '28px' }}>
            {/* 1. Roof Sky Garden */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-line)',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ width: '100%', height: '220px', backgroundColor: '#1A2420' }}>
                <img
                  src="/assets/images/amenity-roof.svg"
                  alt="The Roof Sky Garden at Level 12"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '28px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-bronze)', fontWeight: 600 }}>
                  Level 12 · Sky Terrace
                </span>
                <h3 className="font-serif" style={{ fontSize: '24px', margin: '4px 0 10px 0' }}>
                  The Roof Garden
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
                  An elevated open-air sanctuary featuring an architectural bronze pergola, olive trees in custom travertine planters, and a sunset fire table.
                </p>
                <div style={{ fontSize: '12px', color: 'var(--color-green)', fontWeight: 600 }}>
                  Private sky lounge &amp; observation terrace
                </div>
              </div>
            </div>

            {/* 2. Resident Lounge & Library */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-line)',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ width: '100%', height: '220px', backgroundColor: '#1C2622' }}>
                <img
                  src="/assets/images/amenity-lounge.svg"
                  alt="The Resident Lounge & Library at Level 2"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '28px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-bronze)', fontWeight: 600 }}>
                  Level 2 · Private Salon
                </span>
                <h3 className="font-serif" style={{ fontSize: '24px', margin: '4px 0 10px 0' }}>
                  Lounge &amp; Library
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
                  A double-height limestone fireplace, bespoke fluted walnut bookcases, velvet reading armchairs, and private meeting alcoves.
                </p>
                <div style={{ fontSize: '12px', color: 'var(--color-green)', fontWeight: 600 }}>
                  Curated architectural collection &amp; tasting salon
                </div>
              </div>
            </div>

            {/* 3. Movement & Wellness Studio */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-line)',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ width: '100%', height: '220px', backgroundColor: '#1C2522' }}>
                <img
                  src="/assets/images/amenity-wellness.svg"
                  alt="The Wellness Studio at Level 2"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '28px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-bronze)', fontWeight: 600 }}>
                  Level 2 · Movement
                </span>
                <h3 className="font-serif" style={{ fontSize: '24px', margin: '4px 0 10px 0' }}>
                  Wellness Studio
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
                  Light oak sprung movement flooring, fluted timber acoustic paneling, and floor-to-ceiling glass looking onto a private bamboo courtyard.
                </p>
                <div style={{ fontSize: '12px', color: 'var(--color-green)', fontWeight: 600 }}>
                  Sprung timber floor &amp; meditation terrace
                </div>
              </div>
            </div>

            {/* 4. Arrival Portico */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-line)',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ width: '100%', height: '220px', backgroundColor: '#141E1A' }}>
                <img
                  src="/assets/images/amenity-arrival.svg"
                  alt="The Arrival Portico at Ground level"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '28px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-bronze)', fontWeight: 600 }}>
                  Ground Level · Arrival
                </span>
                <h3 className="font-serif" style={{ fontSize: '24px', margin: '4px 0 10px 0' }}>
                  Arrival Portico
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
                  A 4.6m porte-cochère supported by monolithic travertine piers, flanked by peaceful reflecting pools and a recessed bronze reception portal.
                </p>
                <div style={{ fontSize: '12px', color: 'var(--color-green)', fontWeight: 600 }}>
                  Covered vehicular drop-off &amp; porte-cochère entry
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 5. DISTRICT & LOCATION SECTION (Concise labels, 0 invented km)    */}
        {/* ================================================================ */}
        <section
          id="location"
          style={{
            padding: '96px var(--gutter)',
            backgroundColor: '#FAF8F4',
            borderTop: '1px solid var(--color-line)',
            borderBottom: '1px solid var(--color-line)',
            scrollMarginTop: '80px'
          }}
        >
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="text-eyebrow">Surroundings &amp; District</span>
                <h2 className="font-serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '4px 0 0 0' }}>
                  Cultural District &amp; Connectivity
                </h2>
              </div>
              <Link
                to="/explore/district"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-green)',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                <MapPin size={15} />
                <span>Launch Interactive 3D District Map</span>
              </Link>
            </div>

            {/* District Composition: Left Map Preview, Right Compact Numbered Destinations */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                gap: '32px',
                alignItems: 'stretch'
              }}
            >
              {/* Rendered District Map Visual */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-line)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ width: '100%', height: '320px', backgroundColor: '#E2DDD2', position: 'relative' }}>
                  <img
                    src="/assets/images/district-map.svg"
                    alt="AUREL Cultural District Plan with Canal and Parks"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, color: 'var(--color-green)', letterSpacing: '0.06em' }}>
                    MASTERPLAN CONTEXT
                  </div>
                </div>
                <div style={{ padding: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-line)' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '16px', color: 'var(--color-ink)' }}>The Cultural Quarter &amp; Canal Corridor</strong>
                    <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>Tree-lined boulevards, civic plazas and botanical waterfront</span>
                  </div>
                  <Link
                    to="/explore/district"
                    style={{
                      padding: '10px 18px',
                      backgroundColor: 'var(--color-green)',
                      color: '#FFFFFF',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Launch 3D</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Compact Numbered Destination List (01 to 05) - Eliminates Orphaned Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-line)',
                  padding: '32px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--color-line)' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-bronze)', fontWeight: 600 }}>
                    Authored District Highlights
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
                    Illustrative concept setting
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {project.landmarks.map((l, idx) => (
                    <div
                      key={l.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '32px 1fr auto',
                        gap: '16px',
                        alignItems: 'center',
                        padding: '14px 0',
                        borderBottom: idx < project.landmarks.length - 1 ? '1px solid var(--color-line)' : 'none'
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-bronze)', fontWeight: 600 }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <strong style={{ fontSize: '14px', color: 'var(--color-ink)', display: 'block' }}>
                          {l.name}
                        </strong>
                        <span style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.4 }}>
                          {l.description}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: 'var(--color-green)',
                          fontWeight: 600,
                          backgroundColor: 'rgba(32, 60, 48, 0.08)',
                          padding: '4px 10px',
                          borderRadius: '100px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {l.id === 'garden-park' ? 'Park & Nature' :
                         l.id === 'transit-square' ? 'Transit Node' :
                         l.id === 'arts-court' ? 'Cultural Arts' :
                         l.id === 'market-lane' ? 'Dining & Retail' : 'Commercial'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 6. INTEGRATED CLOSING VIEWING CTA (Deliberate End Composition)    */}
        {/* ================================================================ */}
        <section
          id="enquiry"
          style={{
            padding: '96px var(--gutter)',
            maxWidth: 'var(--max-width)',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              backgroundColor: '#16221E',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '64px 48px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
              boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Subtle Architectural Glow Accent */}
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(200, 150, 90, 0.15) 0%, rgba(0,0,0,0) 70%)',
                pointerEvents: 'none'
              }}
            />

            {/* Left Column: Architectural Invitation */}
            <div>
              <span className="text-eyebrow" style={{ color: 'var(--color-bronze-light)', display: 'block', marginBottom: '12px' }}>
                PRIVATE CONSULTATION
              </span>
              <h2 className="font-serif" style={{ fontSize: 'clamp(32px, 3.8vw, 52px)', lineHeight: 1.1, marginBottom: '20px' }}>
                Begin your personal walkthrough.
              </h2>
              <p style={{ color: 'rgba(244, 240, 232, 0.85)', fontSize: '16px', lineHeight: 1.6, marginBottom: '28px', maxWidth: '480px' }}>
                Experience the spatial quietness, refined material palette, and elevated views of AUREL firsthand through an art-directed private consultation.
              </p>
              <div style={{ display: 'flex', gap: '24px', color: 'rgba(255, 255, 255, 0.65)', fontSize: '13px' }}>
                <div>
                  <span style={{ display: 'block', color: 'var(--color-bronze-light)', fontWeight: 600, fontSize: '14px' }}>Digital Walkthrough</span>
                  <span>Interactive 3D show suite</span>
                </div>
                <div>
                  <span style={{ display: 'block', color: 'var(--color-bronze-light)', fontWeight: 600, fontSize: '14px' }}>Concept Gallery</span>
                  <span>Contextual design enquiry</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              <button
                onClick={() => dispatch({ type: 'OPEN_OVERLAY', overlay: { kind: 'enquiry', unitIds: [] } })}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 32px',
                  backgroundColor: 'var(--color-green)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 8px 24px rgba(40, 70, 60, 0.4)'
                }}
              >
                <span>Schedule a Private Viewing</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link
                  to="/explore/building"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: 500,
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <Building2 size={15} />
                  <span>Explore Interactive Building</span>
                </Link>

                {savedCount > 0 && (
                  <button
                    onClick={() => dispatch({ type: 'OPEN_OVERLAY', overlay: { kind: 'saved' } })}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: 'var(--color-bronze-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      fontWeight: 500,
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>View Saved Homes ({savedCount})</span>
                  </button>
                )}
              </div>

              <div style={{ marginTop: '12px' }}>
                <DemoDisclosure text="An illustrative luxury property experience — concept demonstration only. No financial transactions or live bookings." />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
