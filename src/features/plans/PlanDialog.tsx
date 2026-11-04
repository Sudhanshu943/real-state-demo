import { X } from 'lucide-react';
import { PlanView } from './PlanView';
import { useExperience } from '../../app/providers';
import type { RoomId } from '../../domain/types';

interface PlanDialogProps {
  unitId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectRoom?: (tourRoomId: RoomId) => void;
}

export function PlanDialog({ unitId, isOpen, onClose, onSelectRoom }: PlanDialogProps) {
  const { project } = useExperience();

  if (!isOpen) return null;

  const unit = project.units.find((u) => u.id === unitId);
  if (!unit) return null;

  const collection = project.collections.find((c) => c.id === unit.collectionId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged schematic plan for Residence ${unit.id}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 350,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(24, 34, 31, 0.65)',
        backdropFilter: 'blur(4px)',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-paper)',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-md)',
          padding: '32px',
          position: 'relative',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close Plan Dialog"
          style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--color-muted)' }}
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: '20px' }}>
          <span className="text-eyebrow">{collection?.name}</span>
          <h2 className="font-serif" style={{ fontSize: '28px', margin: '4px 0' }}>
            Residence {unit.id} Architectural Plan
          </h2>
          <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
            Level {unit.floor} · {unit.position.toUpperCase()} Aspect · {unit.internalAreaM2} m² internal area · {unit.terraceAreaM2} m² terrace
          </span>
        </div>

        {/* Scaled Plan View */}
        <div style={{ marginBottom: '20px' }}>
          <PlanView
            collectionId={unit.collectionId}
            orientation={unit.position}
            onSelectRoom={(r) => {
              onClose();
              onSelectRoom?.(r);
            }}
            showTourHotspots={unit.collectionId === 'skyline'}
          />
        </div>

        {/* Schematic Disclosure */}
        <div style={{ borderTop: '1px solid var(--color-line)', paddingTop: '16px', fontSize: '12px', color: 'var(--color-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Schematic concept plan — not for construction or legal measurement.</span>
          <span>Scale: 1m ≈ 25px</span>
        </div>
      </div>
    </div>
  );
}
