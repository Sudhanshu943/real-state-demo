import { RotateCcw, X } from 'lucide-react';
import type { RoomId } from '../../domain/types';

interface TourShellProps {
  unitId: string;
  activeRoomId: RoomId;
  onRoomChange: (roomId: RoomId) => void;
  onExit: () => void;
  onResetView?: () => void;
}

export function TourShell({
  unitId,
  activeRoomId,
  onRoomChange,
  onExit,
  onResetView
}: TourShellProps) {
  const rooms: { id: RoomId; label: string }[] = [
    { id: 'living', label: 'Living Room' },
    { id: 'bedroom', label: 'Primary Bedroom' },
    { id: 'balcony', label: 'Balcony' }
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
        zIndex: 50
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pointerEvents: 'auto'
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(24, 34, 31, 0.85)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '12px 18px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-bronze-light)' }}>
              Skyline Show Residence
            </span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>·</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Residence {unitId} Context</span>
          </div>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', display: 'block' }}>
            Representative Skyline interior; layout and view vary by home.
          </span>
        </div>

        <button
          onClick={onExit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            backgroundColor: 'rgba(24, 34, 31, 0.9)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255,255,255,0.15)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          <X size={15} />
          <span>Exit Tour</span>
        </button>
      </div>

      {/* Bottom Controls Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          pointerEvents: 'auto'
        }}
      >
        {/* Room Switcher Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            backgroundColor: 'rgba(24, 34, 31, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {rooms.map((room) => {
            const isActive = room.id === activeRoomId;
            return (
              <button
                key={room.id}
                onClick={() => onRoomChange(room.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: isActive ? 'var(--color-green)' : 'transparent',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                {room.label}
              </button>
            );
          })}
        </div>

        {/* Reset View Action */}
        {onResetView && (
          <button
            onClick={onResetView}
            title="Reset Camera Orientation"
            style={{
              padding: '10px 12px',
              backgroundColor: 'rgba(24, 34, 31, 0.85)',
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={14} />
            <span>Reset View</span>
          </button>
        )}
      </div>
    </div>
  );
}
