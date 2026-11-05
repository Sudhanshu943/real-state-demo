import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Eye, ChevronDown } from 'lucide-react';
import { HomeSections } from '../features/home/HomeSections';
import { Header } from '../features/home/Header';
import { Footer } from '../features/home/Footer';
import { DemoDisclosure } from '../components/DemoDisclosure';
import { HomeScrollScene } from '../scene/HomeScrollScene';
import { SceneBoundary } from '../scene/SceneBoundary';

export function HomePage() {
  const scrollTrackRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isPastStage, setIsPastStage] = useState(false);

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
    <div className="home-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-paper)' }}>
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
                className="hero-masthead"
                inert={beat1Opacity <= .05}
                aria-hidden={beat1Opacity <= .05}
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
                  AUREL / A GARDEN ADDRESS
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
                  A different<br />perspective.<br /><em>On home.</em>
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
                  Private terraces. Considered interiors. A little more room to breathe.
                </p>

                <div className="hero-actions" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
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

                <div className="hero-signature">
                  <span>01 — AUREL RESIDENCES</span>
                  <span>Twelve levels. Three collections. One considered address.</span>
                </div>
                <div style={{ marginTop: '24px' }}>
                  <DemoDisclosure text="Illustrative concept. Not a commercial offering." />
                </div>
              </div>

              {/* BEAT 2: Facade & Terrace Reveal (s = 0.25 to 0.52) */}
              <div
                className="story-card"
                inert={beat2Opacity <= .05}
                aria-hidden={beat2Opacity <= .05}
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
                  Recessed windows, shaded loggias, and planted edges. An architecture shaped by light and everyday living.
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
                className="story-card"
                inert={beat3Opacity <= .05}
                aria-hidden={beat3Opacity <= .05}
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
                  Soft linen, warm oak, and honed stone. A generous living salon, opening onto your own terrace.
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
                className="story-card"
                inert={beat4Opacity <= .05}
                aria-hidden={beat4Opacity <= .05}
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
                  A sheltered place to pause, with planted edges, open sky, and a neighbourhood beyond.
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
                className="story-controls"
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

        <HomeSections />
      </main>

      <Footer />
    </div>
  );
}
