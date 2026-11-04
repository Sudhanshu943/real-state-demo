import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bookmark, Menu, X, ArrowUpRight } from 'lucide-react';
import { useExperience } from '../../app/providers';

interface HeaderProps {
  variant?: 'light' | 'dark' | 'transparent';
  isOverlay?: boolean;
  activeSection?: string;
}

export function Header({ variant = 'light', isOverlay = false, activeSection }: HeaderProps) {
  const { state, dispatch } = useExperience();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const savedCount = state.preferences.savedIds.length;
  const isDark = isOverlay || variant === 'dark';

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.hash = '#/';
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getLinkStyle = (sectionId?: string) => {
    const isActive = activeSection === sectionId;
    return {
      fontSize: '14px',
      letterSpacing: '0.04em',
      color: isActive
        ? (isDark ? 'var(--color-bronze-light)' : 'var(--color-green)')
        : 'inherit',
      fontWeight: isActive ? 600 : 400,
      background: 'none',
      border: 'none',
      borderBottom: isActive ? `2px solid ${isDark ? 'var(--color-bronze-light)' : 'var(--color-green)'}` : '2px solid transparent',
      paddingBottom: '2px',
      cursor: 'pointer',
      transition: 'all 200ms ease'
    };
  };

  return (
    <header
      style={{
        height: 'var(--header-height)',
        padding: '0 var(--gutter)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: isDark ? 'rgba(16, 24, 21, 0.55)' : 'rgba(244, 240, 232, 0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'var(--color-line)'}`,
        color: isDark ? 'var(--color-white)' : 'var(--color-ink)',
        transition: 'background-color 300ms ease, border-color 300ms ease, color 300ms ease'
      }}
    >
      {/* Wordmark */}
      <Link
        to="/"
        style={{
          display: 'flex',
          flexDirection: 'column',
          textDecoration: 'none',
          color: 'inherit'
        }}
        aria-label="AUREL Concept Residences Homepage"
      >
        <span
          className="font-serif"
          style={{
            fontSize: '24px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            lineHeight: 1
          }}
        >
          AUREL
        </span>
        <span
          style={{
            fontSize: '9px',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: isDark ? 'var(--color-bronze-light)' : 'var(--color-bronze)',
            marginTop: '3px'
          }}
        >
          Residences
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <nav
        aria-label="Primary Navigation"
        style={{
          display: 'none',
          gap: '32px',
          alignItems: 'center'
        }}
        className="desktop-nav"
      >
        <button
          onClick={() => scrollToSection('vision')}
          style={getLinkStyle('vision')}
        >
          Vision
        </button>
        <Link
          to="/explore/building"
          style={getLinkStyle('residences')}
        >
          Residences
        </Link>
        <button
          onClick={() => scrollToSection('location')}
          style={getLinkStyle('location')}
        >
          Location
        </button>
        <button
          onClick={() => scrollToSection('amenities')}
          style={getLinkStyle('amenities')}
        >
          Amenities
        </button>
        <Link
          to="/compare"
          style={getLinkStyle('compare')}
        >
          Compare
        </Link>
      </nav>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Saved Items Counter Button */}
        <button
          onClick={() => dispatch({ type: 'OPEN_OVERLAY', overlay: { kind: 'saved' } })}
          aria-label={`Saved residences (${savedCount})`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'var(--color-line)'}`,
            fontSize: '13px',
            color: 'inherit',
            background: 'transparent'
          }}
        >
          <Bookmark size={15} fill={savedCount > 0 ? 'var(--color-bronze)' : 'none'} color={savedCount > 0 ? 'var(--color-bronze)' : 'currentColor'} />
          <span>Saved</span>
          {savedCount > 0 && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-green)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600
              }}
            >
              {savedCount}
            </span>
          )}
        </button>

        {/* Viewing Request CTA */}
        <button
          onClick={() => dispatch({ type: 'OPEN_OVERLAY', overlay: { kind: 'enquiry', unitIds: [] } })}
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            backgroundColor: 'var(--color-green)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.02em',
            cursor: 'pointer'
          }}
          className="desktop-cta"
        >
          <span>Request a Viewing</span>
          <ArrowUpRight size={14} />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
          style={{
            padding: '8px',
            color: 'inherit',
            display: 'block'
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          style={{
            position: 'fixed',
            inset: '80px 0 0 0',
            backgroundColor: 'var(--color-paper)',
            color: 'var(--color-ink)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 24px',
            gap: '24px'
          }}
        >
          <button
            onClick={() => scrollToSection('vision')}
            style={{ textAlign: 'left', fontSize: '20px', fontFamily: 'var(--font-serif)', padding: '12px 0', borderBottom: '1px solid var(--color-line)' }}
          >
            Vision
          </button>
          <Link
            to="/explore/building"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', padding: '12px 0', borderBottom: '1px solid var(--color-line)' }}
          >
            Explore Building
          </Link>
          <button
            onClick={() => scrollToSection('location')}
            style={{ textAlign: 'left', fontSize: '20px', fontFamily: 'var(--font-serif)', padding: '12px 0', borderBottom: '1px solid var(--color-line)' }}
          >
            Location & District
          </button>
          <button
            onClick={() => scrollToSection('amenities')}
            style={{ textAlign: 'left', fontSize: '20px', fontFamily: 'var(--font-serif)', padding: '12px 0', borderBottom: '1px solid var(--color-line)' }}
          >
            Amenities
          </button>
          <Link
            to="/compare"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', padding: '12px 0', borderBottom: '1px solid var(--color-line)' }}
          >
            Compare Residences ({state.preferences.compareIds.length})
          </Link>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              dispatch({ type: 'OPEN_OVERLAY', overlay: { kind: 'enquiry', unitIds: [] } });
            }}
            style={{
              marginTop: 'auto',
              padding: '16px',
              backgroundColor: 'var(--color-green)',
              color: '#fff',
              borderRadius: 'var(--radius-sm)',
              fontSize: '16px',
              fontWeight: 500
            }}
          >
            Request a Viewing
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
