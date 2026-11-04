import { useExperience } from '../../app/providers';
import { formatPriceINR, formatArea } from '../../domain/selectors';

interface ExteriorFallbackProps {
  selectedFloor?: number;
  selectedUnitId?: string;
  onSelectFloor: (floor: number) => void;
  onSelectUnit: (unitId: string) => void;
}

export function ExteriorFallback({
  selectedFloor,
  selectedUnitId,
  onSelectFloor,
  onSelectUnit
}: ExteriorFallbackProps) {
  const { project, dispatch } = useExperience();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#F0ECE4',
        padding: '32px 24px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{ maxWidth: '680px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span className="text-eyebrow">Simplified Mode</span>
            <h2 className="font-serif" style={{ fontSize: '28px' }}>
              Building Elevation & Residences
            </h2>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_RENDER_PREFERENCE', preference: 'auto' })}
            style={{
              padding: '8px 14px',
              backgroundColor: 'var(--color-green)',
              color: '#fff',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            Switch to 3D View
          </button>
        </div>

        {/* 2D Architectural Slabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
          {[12, 8, 4].map((floorNum) => {
            const isSelected = selectedFloor === floorNum;
            const unitsOnFloor = project.units.filter((u) => u.floor === floorNum);

            return (
              <div
                key={floorNum}
                style={{
                  border: `2px solid ${isSelected ? 'var(--color-green)' : 'var(--color-line)'}`,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSelected ? 'rgba(40, 70, 60, 0.05)' : '#FFFFFF',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <button
                    onClick={() => onSelectFloor(floorNum)}
                    style={{ textAlign: 'left', background: 'none' }}
                  >
                    <strong style={{ fontSize: '18px', fontFamily: 'var(--font-serif)' }}>
                      Level {floorNum}
                    </strong>
                    <span style={{ fontSize: '12px', color: 'var(--color-muted)', display: 'block' }}>
                      {unitsOnFloor[0]?.collectionId.toUpperCase()} COLLECTION
                    </span>
                  </button>
                  <button
                    onClick={() => onSelectFloor(floorNum)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: isSelected ? 'var(--color-green)' : 'transparent',
                      color: isSelected ? '#fff' : 'var(--color-ink)',
                      border: '1px solid var(--color-line)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px'
                    }}
                  >
                    {isSelected ? 'Level Selected' : 'Select Level'}
                  </button>
                </div>

                {/* Units on Floor */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {unitsOnFloor.map((unit) => {
                    const isUnitSelected = selectedUnitId === unit.id;
                    const price = formatPriceINR(unit.samplePriceINR);
                    const area = formatArea(unit.internalAreaM2);

                    return (
                      <button
                        key={unit.id}
                        onClick={() => onSelectUnit(unit.id)}
                        style={{
                          padding: '12px',
                          border: `1px solid ${isUnitSelected ? 'var(--color-green)' : 'var(--color-line)'}`,
                          backgroundColor: isUnitSelected ? 'var(--color-green)' : '#F9F8F5',
                          color: isUnitSelected ? '#fff' : 'var(--color-ink)',
                          borderRadius: 'var(--radius-sm)',
                          textAlign: 'left',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <strong>Residence {unit.id}</strong>
                          <span style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                            {unit.position}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', opacity: 0.9 }}>
                          {area.metric} · {price.compact}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
