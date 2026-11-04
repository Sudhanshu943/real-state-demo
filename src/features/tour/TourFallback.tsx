import type { RoomId } from '../../domain/types';
import { useExperience } from '../../app/providers';

interface TourFallbackProps {
  roomId: RoomId;
  onRoomChange: (roomId: RoomId) => void;
  onExit: () => void;
}

export function TourFallback({ roomId, onRoomChange, onExit }: TourFallbackProps) {
  const { dispatch } = useExperience();

  const rooms: { id: RoomId; label: string; desc: string }[] = [
    {
      id: 'living',
      label: 'Living Room',
      desc: 'Framed by floor-to-ceiling glass, opening directly to the private garden terrace.'
    },
    {
      id: 'bedroom',
      label: 'Primary Bedroom',
      desc: 'A quiet, light-filled retreat with bespoke oak millwork and peaceful north views.'
    },
    {
      id: 'balcony',
      label: 'Garden Balcony',
      desc: 'An expansive outdoor loggia with stone paving and panoramic district perspectives.'
    }
  ];

  const current = rooms.find((r) => r.id === roomId) || rooms[0];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#18221F',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 24px',
        overflowY: 'auto'
      }}
    >
      <div style={{ maxWidth: '720px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span className="text-eyebrow" style={{ color: 'var(--color-bronze-light)' }}>
              Skyline Show Residence
            </span>
            <h2 className="font-serif" style={{ fontSize: '28px', color: '#FFFFFF' }}>
              {current.label}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => dispatch({ type: 'SET_RENDER_PREFERENCE', preference: 'auto' })}
              style={{
                padding: '6px 12px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#fff',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px'
              }}
            >
              Enable 3D
            </button>
            <button
              onClick={onExit}
              style={{
                padding: '6px 12px',
                backgroundColor: 'var(--color-bronze)',
                color: '#fff',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px'
              }}
            >
              Exit Tour
            </button>
          </div>
        </div>

        {/* Room Switcher Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {rooms.map((r) => (
            <button
              key={r.id}
              onClick={() => onRoomChange(r.id)}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: r.id === roomId ? 'var(--color-green)' : 'rgba(255,255,255,0.06)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Visual Room Composition Graphic */}
        <div
          style={{
            height: '340px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255,255,255,0.15)',
            backgroundColor: '#1E2B27',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '32px',
            textAlign: 'center',
            marginBottom: '20px'
          }}
        >
          <span className="text-eyebrow" style={{ color: 'var(--color-bronze-light)', marginBottom: '8px' }}>
            Authored Perspective
          </span>
          <h3 className="font-serif" style={{ fontSize: '32px', marginBottom: '12px', color: '#F4F0E8' }}>
            {current.label}
          </h3>
          <p style={{ maxWidth: '440px', color: 'rgba(244, 240, 232, 0.75)', fontSize: '14px', lineHeight: 1.6 }}>
            {current.desc}
          </p>
        </div>

        <p style={{ fontSize: '12px', color: 'rgba(244,240,232,0.5)', textAlign: 'center' }}>
          Representative Skyline interior; layout, views, and terrace configurations vary by home.
        </p>
      </div>
    </div>
  );
}
