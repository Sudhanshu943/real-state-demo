import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, ChevronUp, ChevronDown } from 'lucide-react';
import { useExperience } from '../app/providers';
import { parseHashRoute } from '../domain/navigation';
import { filterUnits, sortUnits } from '../domain/selectors';
import type { Filters, RoomId } from '../domain/types';
import { SceneHost } from '../scene/SceneHost';
import { ExteriorFallback } from '../features/explorer/ExteriorFallback';
import { DistrictIllustration } from '../features/district/DistrictIllustration';
import { TourFallback } from '../features/tour/TourFallback';
import { FloorPicker } from '../features/explorer/FloorPicker';
import { FilterBar } from '../features/explorer/FilterBar';
import { UnitCard } from '../features/explorer/UnitCard';
import { UnitDetail } from '../features/explorer/UnitDetail';
import { DistrictPanel } from '../features/district/DistrictPanel';
import { TourShell } from '../features/tour/TourShell';
import { Header } from '../features/home/Header';

export function ExplorePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { project, dispatch } = useExperience();

  // Parse selection from URL hash
  const parsed = parseHashRoute(location.pathname + location.search);
  const selection = parsed.selection;

  // Auto-normalize invalid routes if needed
  useEffect(() => {
    if (parsed.isInvalid) {
      if (parsed.redirectNotice) {
        dispatch({ type: 'SET_NOTICE', notice: parsed.redirectNotice });
      }
      navigate(parsed.normalizedPath.replace(/^#/, ''), { replace: true });
    }
  }, [parsed, navigate, dispatch]);

  // Filters State
  const [filters, setFilters] = useState<Filters>({
    collection: 'all',
    aspect: 'all',
    status: 'all'
  });

  // Mobile Bottom Sheet expanded state
  const [mobileSheetExpanded, setMobileSheetExpanded] = useState(false);

  // Camera preset state
  const [cameraPreset, setCameraPreset] = useState<'overview' | 'arrival' | 'gardens' | 'skyline'>('overview');

  // Filtered and sorted units
  const currentFloor = selection.kind === 'floor' ? selection.floor : undefined;
  const filteredUnits = sortUnits(filterUnits(project.units, filters, currentFloor));

  // Navigation handlers
  const handleSelectFloor = (floor: number) => {
    navigate(`/explore/floors/${floor}`);
  };

  const handleClearFloor = () => {
    navigate('/explore/building');
  };

  const handleSelectUnit = (unitId: string) => {
    navigate(`/explore/homes/${unitId}`);
    setMobileSheetExpanded(true);
  };

  const handleSelectLandmark = (landmarkId?: string) => {
    if (landmarkId) {
      navigate(`/explore/district?landmark=${landmarkId}`);
    } else {
      navigate('/explore/district');
    }
  };

  const handleExploreTour = (roomId: RoomId = 'living') => {
    if (selection.kind === 'unit') {
      navigate(`/explore/homes/${selection.unitId}/tour/${roomId}`);
    }
  };

  const handleRoomChange = (roomId: RoomId) => {
    if (selection.kind === 'tour') {
      // Room changes within a tour use replace to avoid cluttering history
      navigate(`/explore/homes/${selection.unitId}/tour/${roomId}`, { replace: true });
    }
  };

  const handleExitTour = () => {
    if (selection.kind === 'tour') {
      navigate(`/explore/homes/${selection.unitId}`);
    }
  };

  // Render 2D fallback component corresponding to current selection
  const render2DFallback = () => {
    if (selection.kind === 'district') {
      return (
        <DistrictIllustration
          selectedLandmarkId={selection.landmarkId}
          onSelectLandmark={handleSelectLandmark}
        />
      );
    }
    if (selection.kind === 'tour') {
      return (
        <TourFallback
          roomId={selection.roomId}
          onRoomChange={handleRoomChange}
          onExit={handleExitTour}
        />
      );
    }
    return (
      <ExteriorFallback
        selectedFloor={currentFloor}
        selectedUnitId={selection.kind === 'unit' ? selection.unitId : undefined}
        onSelectFloor={handleSelectFloor}
        onSelectUnit={handleSelectUnit}
      />
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100svh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: 'var(--color-paper)'
      }}
    >
      <Header />

      {/* Main Viewport Workspace */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        {/* Left: 3D Scene Host */}
        <div style={{ flex: 1, minWidth: 0, position: 'relative', height: '100%' }}>
          <SceneHost
            selection={selection}
            onSelectFloor={handleSelectFloor}
            onSelectUnit={handleSelectUnit}
            onSelectLandmark={handleSelectLandmark}
            onRoomChange={handleRoomChange}
            presetCamera={cameraPreset}
            fallback2D={render2DFallback()}
          />

          {/* Mode Switcher Breadcrumb / Top Bar */}
          {selection.kind !== 'tour' && (
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 20,
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}
            >
              <Link
                to="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-line)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-ink)'
                }}
              >
                <ArrowLeft size={14} />
                <span>Home</span>
              </Link>

              {/* Mode Toggle: Building vs District */}
              <div
                style={{
                  display: 'flex',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-line)',
                  padding: '2px'
                }}
              >
                <button
                  onClick={() => navigate('/explore/building')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: selection.kind !== 'district' ? 'var(--color-green)' : 'transparent',
                    color: selection.kind !== 'district' ? '#FFFFFF' : 'var(--color-ink)',
                    fontSize: '12px',
                    fontWeight: 500
                  }}
                >
                  <Building2 size={13} />
                  <span>Building</span>
                </button>
                <button
                  onClick={() => navigate('/explore/district')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: selection.kind === 'district' ? 'var(--color-green)' : 'transparent',
                    color: selection.kind === 'district' ? '#FFFFFF' : 'var(--color-ink)',
                    fontSize: '12px',
                    fontWeight: 500
                  }}
                >
                  <MapPin size={13} />
                  <span>District</span>
                </button>
              </div>
            </div>
          )}

          {/* Exterior Camera Presets Bar */}
          {(selection.kind === 'building' || selection.kind === 'floor') && (
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 20,
                display: 'flex',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                padding: '4px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-line)'
              }}
              className="camera-presets-bar"
            >
              {(['overview', 'arrival', 'gardens', 'skyline'] as const).map((preset) => (
                <button
                  key={preset}
                  onClick={() => setCameraPreset(preset)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: cameraPreset === preset ? 'var(--color-ink)' : 'transparent',
                    color: cameraPreset === preset ? '#FFFFFF' : 'var(--color-ink)',
                    fontSize: '11px',
                    fontWeight: 500,
                    textTransform: 'capitalize'
                  }}
                >
                  {preset}
                </button>
              ))}
            </div>
          )}

          {/* Floating Floor Picker on Exterior View */}
          {(selection.kind === 'building' || selection.kind === 'floor') && (
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                zIndex: 20,
                maxWidth: '320px'
              }}
              className="desktop-floor-picker"
            >
              <FloorPicker
                selectedFloor={currentFloor}
                onSelectFloor={handleSelectFloor}
                onClearFloor={handleClearFloor}
              />
            </div>
          )}

          {/* Tour UI Shell (if in tour mode) */}
          {selection.kind === 'tour' && (
            <TourShell
              unitId={selection.unitId}
              activeRoomId={selection.roomId}
              onRoomChange={handleRoomChange}
              onExit={handleExitTour}
            />
          )}
        </div>

        {/* Right Information Panel (Desktop ≥ 1024px) / Bottom Sheet (Mobile < 768px) */}
        {selection.kind !== 'tour' && (
          <aside
            style={{
              width: '420px',
              flexShrink: 0,
              height: '100%',
              backgroundColor: 'var(--color-paper)',
              borderLeft: '1px solid var(--color-line)',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              overflowY: 'auto',
              zIndex: 30
            }}
            className="explorer-sidebar"
          >
            {/* Explicit Mobile Expand / Collapse Button */}
            <div className="mobile-expand-bar" style={{ display: 'none', marginBottom: '12px' }}>
              <button
                onClick={() => setMobileSheetExpanded(!mobileSheetExpanded)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: 'rgba(24, 34, 31, 0.05)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--color-ink)'
                }}
              >
                {mobileSheetExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                <span>{mobileSheetExpanded ? 'Collapse Sheet' : 'Expand Full Sheet'}</span>
              </button>
            </div>
            {selection.kind === 'district' ? (
              <DistrictPanel
                selectedLandmarkId={selection.landmarkId}
                onSelectLandmark={handleSelectLandmark}
              />
            ) : selection.kind === 'unit' ? (
              <UnitDetail
                unitId={selection.unitId}
                initialTab={selection.tab}
                onExploreTour={handleExploreTour}
              />
            ) : (
              /* Building / Floor Residences List View */
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h2 className="font-serif" style={{ fontSize: '26px' }}>
                      {currentFloor ? `Level ${currentFloor} Residences` : 'All Residences'}
                    </h2>
                    {currentFloor && (
                      <button
                        onClick={handleClearFloor}
                        style={{ fontSize: '12px', color: 'var(--color-green)', fontWeight: 600 }}
                      >
                        Show All Levels
                      </button>
                    )}
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
                    Explore our six curated architectural residences.
                  </span>
                </div>

                {/* Filter Controls */}
                <FilterBar
                  filters={filters}
                  onFilterChange={setFilters}
                  resultCount={filteredUnits.length}
                  totalCount={project.units.length}
                  selectedFloor={currentFloor}
                  onClearFloor={handleClearFloor}
                  onClearFilters={() => setFilters({ collection: 'all', aspect: 'all', status: 'all' })}
                />

                {/* Units List */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
                  {filteredUnits.length === 0 ? (
                    <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--color-muted)' }}>
                      <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                        No example homes match these filters.
                      </p>
                      <button
                        onClick={() => {
                          setFilters({ collection: 'all', aspect: 'all', status: 'all' });
                          if (currentFloor) handleClearFloor();
                        }}
                        style={{
                          fontSize: '13px',
                          color: 'var(--color-green)',
                          fontWeight: 600,
                          textDecoration: 'underline'
                        }}
                      >
                        Reset filters
                      </button>
                    </div>
                  ) : (
                    filteredUnits.map((unit) => (
                      <UnitCard
                        key={unit.id}
                        unit={unit}
                        isSelected={false}
                        onSelect={() => handleSelectUnit(unit.id)}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .mobile-expand-bar {
            display: block !important;
          }
          .explorer-sidebar {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: ${mobileSheetExpanded ? '80svh' : '45svh'} !important;
            border-left: none !important;
            border-top: 1px solid var(--color-line) !important;
            box-shadow: 0 -8px 24px rgba(0,0,0,0.12) !important;
            z-index: 50 !important;
            transition: height var(--transition-base) !important;
          }
          .desktop-floor-picker {
            top: 70px !important;
            bottom: auto !important;
            left: 16px !important;
            right: 16px !important;
            max-width: none !important;
            z-index: 20 !important;
          }
          .camera-presets-bar {
            display: none !important;
          }
          .scene-mode-switcher {
            top: 20px !important;
            bottom: auto !important;
            right: 20px !important;
            left: auto !important;
            z-index: 60 !important;
          }
        }
      `}</style>
    </div>
  );
}
