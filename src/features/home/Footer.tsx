import { Link } from 'react-router-dom';
import { useExperience } from '../../app/providers';
import { DemoDisclosure } from '../../components/DemoDisclosure';

export function Footer() {
  const { dispatch } = useExperience();

  const handleReset = () => {
    if (window.confirm('Reset saved homes, comparisons, and demo preferences?')) {
      dispatch({ type: 'RESET_DEMO' });
      window.location.hash = '#/';
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-dark-surface)',
        color: 'var(--color-paper)',
        padding: '64px var(--gutter) 40px var(--gutter)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        {/* Lower Links & Disclosures */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            marginBottom: '48px'
          }}
        >
          <div>
            <h3 className="font-serif" style={{ fontSize: '20px', marginBottom: '12px', letterSpacing: '0.08em' }}>
              AUREL
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(244, 240, 232, 0.65)', lineHeight: 1.6 }}>
              An original single-development architectural concept demonstrating interactive 3D luxury property presentation.
            </p>
          </div>

          <div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-bronze-light)', display: 'block', marginBottom: '12px' }}>
              Exploration
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <li>
                <Link to="/explore/district" style={{ color: 'rgba(244, 240, 232, 0.8)' }}>
                  District & Neighbourhood
                </Link>
              </li>
              <li>
                <Link to="/explore/building" style={{ color: 'rgba(244, 240, 232, 0.8)' }}>
                  Interactive Building
                </Link>
              </li>
              <li>
                <Link to="/explore/floors/8" style={{ color: 'rgba(244, 240, 232, 0.8)' }}>
                  Level 8 — Skyline Collection
                </Link>
              </li>
              <li>
                <Link to="/explore/homes/A0801/tour/living" style={{ color: 'rgba(244, 240, 232, 0.8)' }}>
                  Representative Show Residence
                </Link>
              </li>
              <li>
                <Link to="/compare" style={{ color: 'rgba(244, 240, 232, 0.8)' }}>
                  Compare Residences
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-bronze-light)', display: 'block', marginBottom: '12px' }}>
              Demo Information
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <li>
                <button
                  onClick={() => dispatch({ type: 'OPEN_OVERLAY', overlay: { kind: 'about-demo' } })}
                  style={{ color: 'rgba(244, 240, 232, 0.8)', textAlign: 'left', background: 'none' }}
                >
                  About this Demonstration
                </button>
              </li>
              <li>
                <button
                  onClick={handleReset}
                  style={{ color: 'rgba(244, 240, 232, 0.65)', textAlign: 'left', background: 'none' }}
                >
                  Reset Demo Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & honest demo notice */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '12px',
            color: 'rgba(244, 240, 232, 0.5)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px'
          }}
        >
          <DemoDisclosure text="Concept demonstration only. All prices in INR, dimensions, and availability are illustrative." />
          <p>
            © 2026 AUREL Concept Residences. No commercial offering, real booking, or verified geographic claims exist.
          </p>
        </div>
      </div>
    </footer>
  );
}
