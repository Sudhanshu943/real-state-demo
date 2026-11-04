import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, ArrowUpRight, Scale, Eye } from 'lucide-react';
import { Header } from '../features/home/Header';
import { Footer } from '../features/home/Footer';
import { useExperience } from '../app/providers';
import { formatPriceINR, formatArea, getStatusBadgeText } from '../domain/selectors';
import { DemoDisclosure } from '../components/DemoDisclosure';
import { PlanDialog } from '../features/plans/PlanDialog';

export function ComparePage() {
  const { state, dispatch, project } = useExperience();
  const [selectedPlanUnitId, setSelectedPlanUnitId] = useState<string | null>(null);

  const compareUnits = state.preferences.compareIds
    .map((id) => project.units.find((u) => u.id === id))
    .filter((u): u is typeof project.units[0] => Boolean(u));

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-paper)' }}>
      <Header />

      <main style={{ flex: 1, padding: '48px var(--gutter)', maxWidth: 'var(--max-width)', margin: '0 auto', width: '100%' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Link
            to="/explore/building"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: 'var(--color-muted)',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Building Explorer</span>
          </Link>

          <DemoDisclosure text="Sample pricing and availability — concept demonstration only" />
        </div>

        {/* Title */}
        <div style={{ marginBottom: '36px' }}>
          <span className="text-eyebrow">Direct Residence Comparison</span>
          <h1 className="font-serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '4px 0 8px 0' }}>
            Compare Residences ({compareUnits.length}/2)
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '15px' }}>
            Evaluate specifications side-by-side. You can select up to two residences from the building explorer.
          </p>
        </div>

        {/* Content Matrix */}
        {compareUnits.length === 0 ? (
          /* Empty State */
          <div
            style={{
              padding: '80px 24px',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-line)'
            }}
          >
            <Scale size={40} style={{ color: 'var(--color-bronze)', marginBottom: '16px', opacity: 0.8 }} />
            <h2 className="font-serif" style={{ fontSize: '24px', marginBottom: '8px' }}>
              No Residences Selected for Comparison
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '14px', maxWidth: '420px', margin: '0 auto 24px auto' }}>
              Explore the building model or residence list, then click the comparison icon on any residence card to view its metrics here.
            </p>
            <Link
              to="/explore/building"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: 'var(--color-green)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Explore Residences
            </Link>
          </div>
        ) : compareUnits.length === 1 ? (
          /* Single Unit State */
          <div>
            <div
              style={{
                padding: '16px 20px',
                backgroundColor: 'rgba(168, 135, 95, 0.1)',
                border: '1px solid rgba(168, 135, 95, 0.25)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ fontSize: '14px', color: 'var(--color-ink)' }}>
                One residence selected. <strong>Choose one more residence</strong> from the building explorer to compare side-by-side.
              </span>
              <Link
                to="/explore/building"
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--color-green)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                Add Second Residence
              </Link>
            </div>

            {/* Single Unit Preview Card */}
            <div style={{ maxWidth: '440px' }}>
              {renderUnitColumn(compareUnits[0])}
            </div>
          </div>
        ) : (
          /* Two Units Comparison Table */
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              {compareUnits.map((unit) => renderUnitColumn(unit))}
            </div>

            {/* Combined Enquiry Action */}
            <div
              style={{
                padding: '24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-line)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div>
                <strong style={{ fontSize: '16px', display: 'block', marginBottom: '2px' }}>
                  Interested in comparing these two homes in person?
                </strong>
                <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
                  Request details and viewing schedules for Residence {compareUnits[0].id} and Residence {compareUnits[1].id}.
                </span>
              </div>
              <button
                onClick={() =>
                  dispatch({
                    type: 'OPEN_OVERLAY',
                    overlay: { kind: 'enquiry', unitIds: [compareUnits[0].id, compareUnits[1].id] }
                  })
                }
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 24px',
                  backgroundColor: 'var(--color-green)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                <span>Request Details for Both Homes</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Enlarged Plan Modal */}
      {selectedPlanUnitId && (
        <PlanDialog
          unitId={selectedPlanUnitId}
          isOpen={Boolean(selectedPlanUnitId)}
          onClose={() => setSelectedPlanUnitId(null)}
        />
      )}
    </div>
  );

  function renderUnitColumn(unit: typeof project.units[0]) {
    const collection = project.collections.find((c) => c.id === unit.collectionId);
    const price = formatPriceINR(unit.samplePriceINR);
    const internalArea = formatArea(unit.internalAreaM2);
    const terraceArea = formatArea(unit.terraceAreaM2);
    const status = getStatusBadgeText(unit.status);

    return (
      <div
        key={unit.id}
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-line)',
          borderRadius: 'var(--radius-sm)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-bronze)', textTransform: 'uppercase' }}>
              {collection?.name}
            </span>
            <h3 className="font-serif" style={{ fontSize: '26px', margin: '2px 0' }}>
              Residence {unit.id}
            </h3>
          </div>
          <button
            onClick={() => dispatch({ type: 'REMOVE_COMPARE', unitId: unit.id })}
            aria-label={`Remove Residence ${unit.id} from comparison`}
            style={{ color: 'var(--color-muted)', padding: '4px' }}
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Status Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>Sample Availability:</span>
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
            {status.label}
          </span>
        </div>

        {/* Specs Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', borderTop: '1px solid var(--color-line)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-muted)' }}>Level</span>
            <strong>Floor {unit.floor}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-muted)' }}>Orientation</span>
            <strong>{unit.position.toUpperCase()} Aspect</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-muted)' }}>Bedrooms</span>
            <strong>{unit.bedrooms} Bedrooms</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-muted)' }}>Internal Area</span>
            <strong>{internalArea.metric} ({internalArea.imperial})</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-muted)' }}>Outdoor Terrace</span>
            <strong>{terraceArea.metric} ({terraceArea.imperial})</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-muted)' }}>Sample Price</span>
            <strong style={{ fontSize: '16px', color: 'var(--color-ink)' }}>{price.compact}</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto', paddingTop: '16px' }}>
          <button
            onClick={() => setSelectedPlanUnitId(unit.id)}
            style={{
              padding: '10px',
              border: '1px solid var(--color-line)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Eye size={14} />
            <span>View Schematic Plan</span>
          </button>

          <Link
            to={`/explore/homes/${unit.id}`}
            style={{
              padding: '10px',
              backgroundColor: 'var(--color-ink)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: 500,
              textAlign: 'center'
            }}
          >
            Open in Building Explorer
          </Link>
        </div>
      </div>
    );
  }
}
