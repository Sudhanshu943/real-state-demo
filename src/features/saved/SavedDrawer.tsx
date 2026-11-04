import { Link } from 'react-router-dom';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useExperience } from '../../app/providers';
import { formatPriceINR, formatArea } from '../../domain/selectors';

export function SavedDrawer() {
  const { state, dispatch, project } = useExperience();

  if (state.activeOverlay?.kind !== 'saved') return null;

  const savedUnits = project.units.filter((u) => state.preferences.savedIds.includes(u.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Saved Residences"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(24, 34, 31, 0.5)',
        backdropFilter: 'blur(3px)'
      }}
      onClick={() => dispatch({ type: 'CLOSE_OVERLAY' })}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: 'var(--color-paper)',
          boxShadow: '-8px 0 24px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid var(--color-line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h2 className="font-serif" style={{ fontSize: '24px' }}>
              Saved Residences
            </h2>
            <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
              {savedUnits.length} {savedUnits.length === 1 ? 'home' : 'homes'} saved for this session
            </span>
          </div>
          <button
            onClick={() => dispatch({ type: 'CLOSE_OVERLAY' })}
            aria-label="Close Saved Drawer"
            style={{ padding: '8px', color: 'var(--color-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* List Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {savedUnits.length === 0 ? (
            <div style={{ padding: '48px 16px', textAlign: 'center', color: 'var(--color-muted)' }}>
              <p style={{ fontSize: '15px', marginBottom: '8px' }}>
                Save homes to revisit them here.
              </p>
              <span style={{ fontSize: '13px' }}>
                Explore the building and select any residence to bookmark.
              </span>
            </div>
          ) : (
            savedUnits.map((unit) => {
              const collection = project.collections.find((c) => c.id === unit.collectionId);
              const isCompared = state.preferences.compareIds.includes(unit.id);
              const price = formatPriceINR(unit.samplePriceINR);
              const area = formatArea(unit.internalAreaM2);

              return (
                <div
                  key={unit.id}
                  style={{
                    border: '1px solid var(--color-line)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '16px',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-bronze)', textTransform: 'uppercase' }}>
                        {collection?.name}
                      </span>
                      <h3 className="font-serif" style={{ fontSize: '20px' }}>
                        Residence {unit.id}
                      </h3>
                      <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
                        Level {unit.floor} · {unit.position.toUpperCase()} Aspect
                      </span>
                    </div>

                    <button
                      onClick={() => dispatch({ type: 'UNSAVE', unitId: unit.id })}
                      aria-label={`Remove residence ${unit.id} from saved`}
                      style={{ color: 'var(--color-muted)', padding: '4px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderTop: '1px solid var(--color-line)', paddingTop: '8px' }}>
                    <span>{area.metric} internal</span>
                    <strong>{price.compact}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <Link
                      to={`/explore/homes/${unit.id}`}
                      onClick={() => dispatch({ type: 'CLOSE_OVERLAY' })}
                      style={{
                        flex: 1,
                        padding: '8px',
                        backgroundColor: 'var(--color-ink)',
                        color: '#fff',
                        textAlign: 'center',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>View</span>
                      <ArrowRight size={13} />
                    </Link>

                    <button
                      onClick={() => {
                        if (isCompared) {
                          dispatch({ type: 'REMOVE_COMPARE', unitId: unit.id });
                        } else {
                          dispatch({ type: 'ADD_COMPARE', unitId: unit.id });
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: '1px solid var(--color-line)',
                        backgroundColor: isCompared ? 'var(--color-green)' : 'transparent',
                        color: isCompared ? '#fff' : 'var(--color-ink)',
                        textAlign: 'center',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        fontWeight: 500
                      }}
                    >
                      {isCompared ? 'Comparing' : 'Compare'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {savedUnits.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--color-line)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link
              to="/compare"
              onClick={() => dispatch({ type: 'CLOSE_OVERLAY' })}
              style={{
                padding: '12px',
                backgroundColor: 'var(--color-green)',
                color: '#fff',
                textAlign: 'center',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Open Comparison ({state.preferences.compareIds.length}/2)
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
