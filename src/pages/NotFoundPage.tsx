import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center'
    }}>
      <span className="text-eyebrow" style={{ marginBottom: '12px' }}>Page Not Found</span>
      <h1 className="font-serif" style={{ fontSize: '48px', marginBottom: '16px' }}>
        A Path Less Traveled
      </h1>
      <p style={{ maxWidth: '440px', color: 'var(--color-muted)', marginBottom: '32px' }}>
        The perspective you requested is not part of this concept demonstration.
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link
          to="/"
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--color-green)',
            color: 'var(--color-white)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 500
          }}
        >
          Return to Overview
        </Link>
        <Link
          to="/explore/building"
          style={{
            padding: '12px 24px',
            border: '1px solid var(--color-line)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 500
          }}
        >
          Explore Building
        </Link>
      </div>
    </div>
  );
}
