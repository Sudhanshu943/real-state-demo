import { useEffect, useRef } from 'react';
import { X, ShieldCheck, Box, Compass } from 'lucide-react';

interface AboutDemoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutDemoDialog({ isOpen, onClose }: AboutDemoDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-demo-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(24, 34, 31, 0.65)',
        backdropFilter: 'blur(4px)',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-paper)',
          color: 'var(--color-ink)',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-md)',
          padding: '32px',
          position: 'relative',
          boxShadow: '0 24px 48px rgba(0,0,0,0.18)'
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close About Demo Dialog"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            color: 'var(--color-muted)',
            padding: '4px'
          }}
        >
          <X size={20} />
        </button>

        <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
          Demonstration Architecture
        </span>
        <h2 id="about-demo-title" className="font-serif" style={{ fontSize: '28px', marginBottom: '16px' }}>
          About AUREL
        </h2>

        <p style={{ color: 'var(--color-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
          AUREL is an original fictional residential development created to demonstrate high-craft interactive property presentation. Every element is built locally with zero external tracker dependencies.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Box size={20} style={{ color: 'var(--color-bronze)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '14px', display: 'block' }}>Procedural & Mesh 3D Pipeline</strong>
              <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
                The 12-storey tower is generated procedurally with Three.js. The show residence is an authored 3D mesh interior suite.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <ShieldCheck size={20} style={{ color: 'var(--color-green)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '14px', display: 'block' }}>Zero Data Tracking & Pure Privacy</strong>
              <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
                Viewing requests are held purely in volatile component memory and are never sent over any network or stored in browser storage.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Compass size={20} style={{ color: 'var(--color-bronze)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '14px', display: 'block' }}>Illustrative Metric Disclosures</strong>
              <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
                Sample pricing is illustrative (INR), internal areas are schematic envelopes (m²), and the neighbourhood map is an original illustrative setting.
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'var(--color-ink)',
            color: 'var(--color-paper)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 500
          }}
        >
          Understood
        </button>
      </div>
    </div>
  );
}
