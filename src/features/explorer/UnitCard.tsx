import { Bookmark, Scale, ArrowRight } from 'lucide-react';
import type { Unit } from '../../domain/types';
import { useExperience } from '../../app/providers';
import { formatPriceINR, formatArea, getStatusBadgeText } from '../../domain/selectors';

interface UnitCardProps {
  unit: Unit;
  isSelected: boolean;
  onSelect: () => void;
}

export function UnitCard({ unit, isSelected, onSelect }: UnitCardProps) {
  const { state, dispatch, project } = useExperience();

  const collection = project.collections.find((c) => c.id === unit.collectionId);
  const isSaved = state.preferences.savedIds.includes(unit.id);
  const isCompared = state.preferences.compareIds.includes(unit.id);
  const statusInfo = getStatusBadgeText(unit.status);
  const price = formatPriceINR(unit.samplePriceINR);
  const area = formatArea(unit.internalAreaM2);

  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${isSelected ? 'var(--color-green)' : 'var(--color-line)'}`,
        boxShadow: isSelected ? '0 0 0 1px var(--color-green)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'all var(--transition-fast)'
      }}
    >
      {/* Compact Architectural Visual */}
      <div
        onClick={onSelect}
        style={{
          width: '100%',
          height: '110px',
          borderRadius: '2px',
          overflow: 'hidden',
          backgroundColor: '#1C2622',
          cursor: 'pointer'
        }}
      >
        <img
          src={`/assets/images/collection-${unit.collectionId}.svg`}
          alt={`${collection?.name || 'Residence'} architectural preview`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div onClick={onSelect} style={{ cursor: 'pointer' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-bronze)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {collection?.name}
          </span>
          <h3 className="font-serif" style={{ fontSize: '20px', margin: '2px 0' }}>
            Residence {unit.id}
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
            Level {unit.floor} · {unit.position.toUpperCase()} Aspect · {unit.bedrooms} Bed
          </span>
        </div>

        <span
          style={{
            padding: '3px 8px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            backgroundColor:
              unit.status === 'available'
                ? 'rgba(40, 70, 60, 0.1)'
                : unit.status === 'reserved'
                ? 'rgba(168, 135, 95, 0.15)'
                : 'rgba(167, 43, 43, 0.1)',
            color:
              unit.status === 'available'
                ? 'var(--color-green)'
                : unit.status === 'reserved'
                ? 'var(--color-bronze)'
                : 'var(--color-error)'
          }}
        >
          {statusInfo.label}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--color-line)', paddingTop: '8px', fontSize: '13px' }}>
        <span style={{ color: 'var(--color-muted)' }}>
          {area.metric} internal ({area.imperial})
        </span>
        <strong style={{ fontSize: '15px' }}>
          {price.compact}
        </strong>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        <button
          onClick={onSelect}
          style={{
            flex: 2,
            padding: '8px 12px',
            backgroundColor: isSelected ? 'var(--color-green)' : 'var(--color-ink)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          <span>{isSelected ? 'Viewing' : 'Inspect'}</span>
          <ArrowRight size={13} />
        </button>

        <button
          onClick={() => {
            if (isSaved) {
              dispatch({ type: 'UNSAVE', unitId: unit.id });
            } else {
              dispatch({ type: 'SAVE', unitId: unit.id });
            }
          }}
          aria-label={isSaved ? `Remove residence ${unit.id}` : `Save residence ${unit.id}`}
          style={{
            padding: '8px',
            border: `1px solid ${isSaved ? 'var(--color-bronze)' : 'var(--color-line)'}`,
            backgroundColor: isSaved ? 'rgba(168, 135, 95, 0.1)' : '#FFFFFF',
            color: isSaved ? 'var(--color-bronze)' : 'var(--color-ink)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        <button
          onClick={() => {
            if (isCompared) {
              dispatch({ type: 'REMOVE_COMPARE', unitId: unit.id });
            } else {
              dispatch({ type: 'ADD_COMPARE', unitId: unit.id });
            }
          }}
          aria-label={isCompared ? `Remove comparison for ${unit.id}` : `Compare ${unit.id}`}
          style={{
            padding: '8px',
            border: `1px solid ${isCompared ? 'var(--color-green)' : 'var(--color-line)'}`,
            backgroundColor: isCompared ? 'rgba(40, 70, 60, 0.1)' : '#FFFFFF',
            color: isCompared ? 'var(--color-green)' : 'var(--color-ink)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Scale size={15} />
        </button>
      </div>
    </div>
  );
}
