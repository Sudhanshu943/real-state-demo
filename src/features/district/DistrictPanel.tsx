import { useNavigate } from 'react-router-dom';
import { ArrowRight, RotateCcw, Building2 } from 'lucide-react';
import { useExperience } from '../../app/providers';
import { DemoDisclosure } from '../../components/DemoDisclosure';

interface DistrictPanelProps {
  selectedLandmarkId?: string;
  onSelectLandmark: (id?: string) => void;
}

export function DistrictPanel({
  selectedLandmarkId,
  onSelectLandmark
}: DistrictPanelProps) {
  const { project } = useExperience();
  const navigate = useNavigate();

  const selectedLandmark = project.landmarks.find((l) => l.id === selectedLandmarkId);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-line)',
        padding: '24px',
        overflowY: 'auto'
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <span className="text-eyebrow">Neighbourhood Context</span>
        <h2 className="font-serif" style={{ fontSize: '28px', margin: '4px 0 8px 0' }}>
          The AUREL District
        </h2>
        <DemoDisclosure text="Illustrative setting, not a geographic map" />
      </div>

      {/* Selected Landmark Detail */}
      {selectedLandmark ? (
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(168, 135, 95, 0.08)',
            border: '1px solid rgba(168, 135, 95, 0.2)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <h3 className="font-serif" style={{ fontSize: '20px', color: 'var(--color-ink)' }}>
              {selectedLandmark.name}
            </h3>
            <button
              onClick={() => onSelectLandmark(undefined)}
              style={{ fontSize: '12px', color: 'var(--color-bronze)', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <RotateCcw size={12} />
              <span>Overview</span>
            </button>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.5 }}>
            {selectedLandmark.description}
          </p>
        </div>
      ) : (
        <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
          Explore the five authored points of interest in this illustrative urban garden setting. Select any landmark from the scene or the list below to focus.
        </p>
      )}

      {/* Landmarks List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)', fontWeight: 600 }}>
          District Destinations
        </span>
        {project.landmarks.map((landmark) => {
          const isSelected = selectedLandmarkId === landmark.id;
          return (
            <button
              key={landmark.id}
              onClick={() => onSelectLandmark(landmark.id)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                border: `1px solid ${isSelected ? 'var(--color-bronze)' : 'var(--color-line)'}`,
                backgroundColor: isSelected ? 'rgba(168, 135, 95, 0.08)' : '#FBF9F5',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              <div>
                <strong style={{ fontSize: '14px', color: isSelected ? 'var(--color-bronze)' : 'var(--color-ink)' }}>
                  {landmark.name}
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--color-muted)', display: 'block' }}>
                  Illustrative landmark
                </span>
              </div>
              <ArrowRight size={14} color={isSelected ? 'var(--color-bronze)' : 'var(--color-muted)'} />
            </button>
          );
        })}
      </div>

      {/* Enter Development Action */}
      <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
        <button
          onClick={() => navigate('/explore/building')}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: 'var(--color-green)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <Building2 size={16} />
          <span>Enter Development (Explore Building)</span>
        </button>
      </div>
    </div>
  );
}
