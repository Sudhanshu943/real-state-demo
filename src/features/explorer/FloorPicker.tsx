import { useExperience } from '../../app/providers';

interface FloorPickerProps {
  selectedFloor?: number;
  onSelectFloor: (floor: number) => void;
  onClearFloor?: () => void;
}

export function FloorPicker({
  selectedFloor,
  onSelectFloor,
  onClearFloor
}: FloorPickerProps) {
  const { project } = useExperience();

  const floorLabels: Record<number, string> = {
    4: 'Garden Collection',
    8: 'Skyline Collection',
    12: 'Terrace Penthouse'
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(8px)',
        padding: '12px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-line)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)', fontWeight: 600 }}>
          Interactive Levels
        </span>
        {selectedFloor && onClearFloor && (
          <button
            onClick={onClearFloor}
            style={{ fontSize: '11px', color: 'var(--color-green)', fontWeight: 600 }}
          >
            All Floors
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        {project.building.exampleFloors.slice().reverse().map((floorNum) => {
          const isSelected = selectedFloor === floorNum;
          return (
            <button
              key={floorNum}
              onClick={() => onSelectFloor(floorNum)}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${isSelected ? 'var(--color-green)' : 'var(--color-line)'}`,
                backgroundColor: isSelected ? 'var(--color-green)' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : 'var(--color-ink)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <strong style={{ fontSize: '14px', lineHeight: 1 }}>Level {floorNum}</strong>
              <span style={{ fontSize: '10px', marginTop: '2px', opacity: isSelected ? 0.9 : 0.7 }}>
                {floorLabels[floorNum]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
