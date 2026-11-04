import { X } from 'lucide-react';
import { useExperience } from '../../app/providers';

export function ReplaceCompareModal() {
  const { state, dispatch, project } = useExperience();

  if (state.activeOverlay?.kind !== 'replace-compare' || !state.activeOverlay.candidateId) {
    return null;
  }

  const candidateId = state.activeOverlay.candidateId;
  const currentCompared = state.preferences.compareIds.map((id) =>
    project.units.find((u) => u.id === id)
  ).filter(Boolean);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="replace-compare-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(24, 34, 31, 0.6)',
        backdropFilter: 'blur(4px)',
        padding: '20px'
      }}
      onClick={() => dispatch({ type: 'CLOSE_OVERLAY' })}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-paper)',
          maxWidth: '480px',
          width: '100%',
          padding: '32px',
          borderRadius: 'var(--radius-md)',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.18)'
        }}
      >
        <button
          onClick={() => dispatch({ type: 'CLOSE_OVERLAY' })}
          aria-label="Cancel replacement"
          style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--color-muted)' }}
        >
          <X size={20} />
        </button>

        <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
          Comparison Limit (2 Maximum)
        </span>
        <h2 id="replace-compare-title" className="font-serif" style={{ fontSize: '24px', marginBottom: '12px' }}>
          Replace a Comparison Slot
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
          You can compare up to two homes simultaneously. Select which residence you would like to swap out for <strong>Residence {candidateId}</strong>. The swapped home will remain safely in your saved list.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {currentCompared.map((unit) => {
            if (!unit) return null;
            const collection = project.collections.find((c) => c.id === unit.collectionId);

            return (
              <button
                key={unit.id}
                onClick={() =>
                  dispatch({
                    type: 'REPLACE_COMPARE',
                    oldId: unit.id,
                    newId: candidateId
                  })
                }
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  border: '1px solid var(--color-line)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div>
                  <strong style={{ fontSize: '15px', display: 'block' }}>
                    Residence {unit.id}
                  </strong>
                  <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
                    {collection?.name} · Level {unit.floor}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-green)',
                    fontWeight: 600
                  }}
                >
                  Swap with this
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => dispatch({ type: 'CLOSE_OVERLAY' })}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid var(--color-line)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px',
            color: 'var(--color-ink)'
          }}
        >
          Cancel and keep current comparison
        </button>
      </div>
    </div>
  );
}
