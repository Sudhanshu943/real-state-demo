import { useState } from 'react';
import { Bookmark, Scale, Eye, Maximize2, ArrowUpRight } from 'lucide-react';
import { useExperience } from '../../app/providers';
import { formatPriceINR, formatArea, getStatusBadgeText } from '../../domain/selectors';
import { DemoDisclosure } from '../../components/DemoDisclosure';
import { PlanView } from '../plans/PlanView';
import { PlanDialog } from '../plans/PlanDialog';
import type { RoomId } from '../../domain/types';

interface UnitDetailProps {
  unitId: string;
  initialTab?: 'overview' | 'plan';
  onExploreTour: (roomId?: RoomId) => void;
}

export function UnitDetail({
  unitId,
  initialTab = 'overview',
  onExploreTour
}: UnitDetailProps) {
  const { state, dispatch, project } = useExperience();
  const [activeTab, setActiveTab] = useState<'overview' | 'plan'>(initialTab);
  const [isPlanEnlarged, setIsPlanEnlarged] = useState(false);

  const unit = project.units.find((u) => u.id === unitId);
  if (!unit) return null;

  const collection = project.collections.find((c) => c.id === unit.collectionId);
  const isSaved = state.preferences.savedIds.includes(unit.id);
  const isCompared = state.preferences.compareIds.includes(unit.id);
  const statusInfo = getStatusBadgeText(unit.status);
  const price = formatPriceINR(unit.samplePriceINR);
  const internalArea = formatArea(unit.internalAreaM2);
  const terraceArea = formatArea(unit.terraceAreaM2);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-line)',
        overflowY: 'auto',
        padding: '24px'
      }}
    >
      {/* Header Info */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-bronze)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {collection?.name}
            </span>
            <h2 className="font-serif" style={{ fontSize: '32px', margin: '2px 0' }}>
              Residence {unit.id}
            </h2>
          </div>

          <span
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
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

        {/* Price & Disclosures */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-ink)' }}>
            {price.compact}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
            ({price.full})
          </span>
        </div>
        <DemoDisclosure text="Sample pricing and availability — concept demonstration only" />
      </div>

      {/* Primary Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => {
            if (isSaved) {
              dispatch({ type: 'UNSAVE', unitId: unit.id });
            } else {
              dispatch({ type: 'SAVE', unitId: unit.id });
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px',
            borderRadius: 'var(--radius-sm)',
            border: `1px solid ${isSaved ? 'var(--color-bronze)' : 'var(--color-line)'}`,
            backgroundColor: isSaved ? 'rgba(168, 135, 95, 0.1)' : '#FFFFFF',
            color: isSaved ? 'var(--color-bronze)' : 'var(--color-ink)',
            fontSize: '13px',
            fontWeight: 500
          }}
        >
          <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
          <span>{isSaved ? 'Saved' : 'Save Residence'}</span>
        </button>

        <button
          onClick={() => {
            if (isCompared) {
              dispatch({ type: 'REMOVE_COMPARE', unitId: unit.id });
            } else {
              dispatch({ type: 'ADD_COMPARE', unitId: unit.id });
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px',
            borderRadius: 'var(--radius-sm)',
            border: `1px solid ${isCompared ? 'var(--color-green)' : 'var(--color-line)'}`,
            backgroundColor: isCompared ? 'rgba(40, 70, 60, 0.1)' : '#FFFFFF',
            color: isCompared ? 'var(--color-green)' : 'var(--color-ink)',
            fontSize: '13px',
            fontWeight: 500
          }}
        >
          <Scale size={15} />
          <span>{isCompared ? 'Comparing' : 'Compare'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-line)', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            padding: '10px 16px',
            borderBottom: activeTab === 'overview' ? '2px solid var(--color-green)' : '2px solid transparent',
            color: activeTab === 'overview' ? 'var(--color-green)' : 'var(--color-muted)',
            fontWeight: 600,
            fontSize: '14px'
          }}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('plan')}
          style={{
            padding: '10px 16px',
            borderBottom: activeTab === 'plan' ? '2px solid var(--color-green)' : '2px solid transparent',
            color: activeTab === 'plan' ? 'var(--color-green)' : 'var(--color-muted)',
            fontWeight: 600,
            fontSize: '14px'
          }}
        >
          Schematic Plan
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Key Metrics Table */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: '#F9F8F5', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-muted)', display: 'block' }}>Internal Area</span>
              <strong style={{ fontSize: '16px' }}>{internalArea.metric}</strong>
              <span style={{ fontSize: '11px', color: 'var(--color-muted)', display: 'block' }}>{internalArea.imperial}</span>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F9F8F5', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-muted)', display: 'block' }}>Terrace Area</span>
              <strong style={{ fontSize: '16px' }}>{terraceArea.metric}</strong>
              <span style={{ fontSize: '11px', color: 'var(--color-muted)', display: 'block' }}>{terraceArea.imperial}</span>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F9F8F5', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-muted)', display: 'block' }}>Level / Floor</span>
              <strong style={{ fontSize: '16px' }}>Level {unit.floor}</strong>
              <span style={{ fontSize: '11px', color: 'var(--color-muted)', display: 'block' }}>12 Residential Levels</span>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F9F8F5', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-muted)', display: 'block' }}>Orientation</span>
              <strong style={{ fontSize: '16px' }}>{unit.position.toUpperCase()} Aspect</strong>
              <span style={{ fontSize: '11px', color: 'var(--color-muted)', display: 'block' }}>{unit.bedrooms} Bedrooms</span>
            </div>
          </div>

          <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.6 }}>
            {collection?.description}
          </p>

          {/* Show Residence 3D CTA */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'rgba(40, 70, 60, 0.05)',
              border: '1px solid rgba(40, 70, 60, 0.15)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '15px', color: 'var(--color-green)' }}>
                  Explore Show Residence
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--color-muted)', display: 'block' }}>
                  Representative Skyline interior; layout and view vary by home.
                </span>
              </div>
              <button
                onClick={() => onExploreTour('living')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  backgroundColor: 'var(--color-green)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                <Eye size={15} />
                <span>Enter 3D</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Plan Tab */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
              Schematic layout ({unit.position.toUpperCase()} Aspect)
            </span>
            <button
              onClick={() => setIsPlanEnlarged(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: 'var(--color-green)',
                fontWeight: 600
              }}
            >
              <Maximize2 size={13} />
              <span>Enlarge Plan</span>
            </button>
          </div>

          <PlanView
            collectionId={unit.collectionId}
            orientation={unit.position}
            onSelectRoom={(roomId) => onExploreTour(roomId)}
            showTourHotspots={unit.collectionId === 'skyline'}
          />

          <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>
            Schematic concept plan — not for measurement.
          </span>
        </div>
      )}

      {/* Bottom Sticky Action: Contextual Viewing */}
      <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
        <button
          onClick={() => dispatch({ type: 'OPEN_OVERLAY', overlay: { kind: 'enquiry', unitIds: [unit.id] } })}
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
          <span>{statusInfo.actionLabel}</span>
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Enlarged Modal */}
      <PlanDialog
        unitId={unit.id}
        isOpen={isPlanEnlarged}
        onClose={() => setIsPlanEnlarged(false)}
        onSelectRoom={(roomId) => onExploreTour(roomId)}
      />
    </div>
  );
}
