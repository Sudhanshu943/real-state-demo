import { useExperience } from '../../app/providers';

interface DistrictIllustrationProps {
  selectedLandmarkId?: string;
  onSelectLandmark: (id: string) => void;
}

export function DistrictIllustration({
  selectedLandmarkId,
  onSelectLandmark
}: DistrictIllustrationProps) {
  const { project, dispatch } = useExperience();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#EAE6DC',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto'
      }}
    >
      <div style={{ maxWidth: '720px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <span className="text-eyebrow">Schematic District</span>
            <h2 className="font-serif" style={{ fontSize: '26px' }}>
              Illustrative Setting & Landmarks
            </h2>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_RENDER_PREFERENCE', preference: 'auto' })}
            style={{
              padding: '6px 12px',
              backgroundColor: 'var(--color-green)',
              color: '#fff',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px'
            }}
          >
            3D District
          </button>
        </div>

        {/* 2D SVG Map */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-line)',
            padding: '24px',
            marginBottom: '24px'
          }}
        >
          <svg viewBox="-150 -120 300 240" style={{ width: '100%', height: 'auto', maxHeight: '380px' }}>
            {/* Background Ground Grid */}
            <rect x="-150" y="-120" width="300" height="240" fill="#F7F5F0" />

            {/* Park Area */}
            <circle cx="-95" cy="-60" r="32" fill="#DCE8E0" />
            <text x="-95" y="-58" textAnchor="middle" fontSize="8" fill="#28463C" fontWeight="bold">
              Garden Park
            </text>

            {/* Center AUREL Development Marker */}
            <rect x="-15" y="-12" width="30" height="24" fill="#28463C" rx="2" />
            <text x="0" y="2" textAnchor="middle" fontSize="7" fill="#FFFFFF" fontWeight="bold">
              AUREL
            </text>
            <text x="0" y="8" textAnchor="middle" fontSize="5" fill="#A8875F">
              TOWER
            </text>

            {/* Landmark Pins */}
            {project.landmarks.map((landmark) => {
              const [x, , z] = landmark.position;
              const isSelected = selectedLandmarkId === landmark.id;

              return (
                <g
                  key={landmark.id}
                  transform={`translate(${x}, ${z})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelectLandmark(landmark.id)}
                >
                  <circle
                    r={isSelected ? 9 : 7}
                    fill={isSelected ? '#A8875F' : '#28463C'}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  <text
                    y="16"
                    textAnchor="middle"
                    fontSize="7"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    fill={isSelected ? '#A8875F' : '#18221F'}
                  >
                    {landmark.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Landmark Selection Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {project.landmarks.map((landmark) => {
            const isSelected = selectedLandmarkId === landmark.id;
            return (
              <button
                key={landmark.id}
                onClick={() => onSelectLandmark(landmark.id)}
                style={{
                  padding: '12px',
                  border: `1px solid ${isSelected ? 'var(--color-bronze)' : 'var(--color-line)'}`,
                  backgroundColor: isSelected ? 'rgba(168, 135, 95, 0.08)' : '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <strong style={{ fontSize: '14px', display: 'block', color: isSelected ? 'var(--color-bronze)' : 'var(--color-ink)' }}>
                  {landmark.name}
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--color-muted)', display: 'block', marginTop: '4px' }}>
                  {landmark.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
