import { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldAlert } from 'lucide-react';
import { useExperience } from '../../app/providers';
import {
  validateEnquiry,
  createPreviewSummary,
  type EnquiryFormValues,
  type EnquiryValidationErrors,
  type EnquiryPreviewSummary
} from '../../domain/enquiry';

export function ViewingModal() {
  const { state, dispatch, project } = useExperience();

  const isEnquiryOpen = state.activeOverlay?.kind === 'enquiry';
  const initialUnitIds = state.activeOverlay?.unitIds || [];

  const [values, setValues] = useState<EnquiryFormValues>({
    name: '',
    contactPreference: 'email',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'any',
    message: '',
    unitIds: []
  });

  const [errors, setErrors] = useState<EnquiryValidationErrors>({});
  const [summary, setSummary] = useState<EnquiryPreviewSummary | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Snapshot context when modal opens and add Escape key listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleClose();
      }
    }

    if (isEnquiryOpen) {
      document.addEventListener('keydown', handleKeyDown);
      setValues((prev) => ({
        ...prev,
        unitIds: [...initialUnitIds]
      }));
      setErrors({});
      setSummary(null);
      setIsSubmitting(false);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnquiryOpen, initialUnitIds]);

  if (!isEnquiryOpen) return null;

  const handleClose = () => {
    // Purge memory
    setValues({
      name: '',
      contactPreference: 'email',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: 'any',
      message: '',
      unitIds: []
    });
    setErrors({});
    setSummary(null);
    dispatch({ type: 'CLOSE_OVERLAY' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = validateEnquiry(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    // Pure in-memory preview creation (no network, no storage)
    const preview = createPreviewSummary(values);
    setSummary(preview);
    setIsSubmitting(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-dialog-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(24, 34, 31, 0.65)',
        backdropFilter: 'blur(4px)',
        padding: '20px'
      }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-paper)',
          maxWidth: '540px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-md)',
          padding: '32px',
          position: 'relative',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close Viewing Request Dialog"
          style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--color-muted)' }}
        >
          <X size={20} />
        </button>

        {summary ? (
          /* Confirmation Preview State */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-green)', marginBottom: '16px' }}>
              <CheckCircle size={28} />
              <h2 id="enquiry-dialog-title" className="font-serif" style={{ fontSize: '28px', color: 'var(--color-ink)' }}>
                Viewing Request Preview
              </h2>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(40, 70, 60, 0.08)',
                border: '1px solid rgba(40, 70, 60, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                marginBottom: '24px'
              }}
            >
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-green)', marginBottom: '4px' }}>
                Demonstration Notice
              </p>
              <p style={{ fontSize: '13px', color: 'var(--color-ink)', lineHeight: 1.5 }}>
                {summary.disclaimer}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-line)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-muted)' }}>Generated at:</span>
                <strong>{summary.timestamp}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-line)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-muted)' }}>Name:</span>
                <strong>{summary.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-line)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-muted)' }}>{summary.contactMethod}:</span>
                <strong>{summary.contactValue}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-line)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-muted)' }}>Preferred Window:</span>
                <strong>{summary.preferredDate ? `${summary.preferredDate} (${summary.preferredTime})` : summary.preferredTime}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>
                  Referenced Residences:
                </span>
                {summary.unitIds.length === 0 ? (
                  <span style={{ fontStyle: 'italic', color: 'var(--color-muted)' }}>General development consultation</span>
                ) : (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {summary.unitIds.map((uid) => (
                      <span
                        key={uid}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid var(--color-line)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        Residence {uid}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {summary.message && (
                <div style={{ marginTop: '8px', borderTop: '1px solid var(--color-line)', paddingTop: '8px' }}>
                  <span style={{ color: 'var(--color-muted)', display: 'block', marginBottom: '4px' }}>
                    Notes:
                  </span>
                  <p style={{ fontSize: '13px', fontStyle: 'italic', backgroundColor: '#FFFFFF', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                    "{summary.message}"
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleClose}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'var(--color-ink)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Close and Clear Preview
            </button>
          </div>
        ) : (
          /* Form Entry State */
          <form onSubmit={handleSubmit} noValidate>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
              Concept Viewing
            </span>
            <h2 id="enquiry-dialog-title" className="font-serif" style={{ fontSize: '28px', marginBottom: '8px' }}>
              Request a Private Viewing
            </h2>

            {/* Context Chips */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>Context:</span>
              {values.unitIds.length === 0 ? (
                <span
                  style={{
                    padding: '3px 8px',
                    backgroundColor: 'rgba(24, 34, 31, 0.06)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px'
                  }}
                >
                  General Development Enquiry
                </span>
              ) : (
                values.unitIds.map((uid) => {
                  const unit = project.units.find((u) => u.id === uid);
                  const collection = project.collections.find((c) => c.id === unit?.collectionId);
                  return (
                    <span
                      key={uid}
                      style={{
                        padding: '3px 8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-line)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      Residence {uid} ({collection?.name})
                    </span>
                  );
                })
              )}
            </div>

            {/* Demo Notice */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                backgroundColor: 'rgba(168, 135, 95, 0.12)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '20px',
                fontSize: '12px',
                color: 'var(--color-ink)'
              }}
            >
              <ShieldAlert size={16} style={{ color: 'var(--color-bronze)', flexShrink: 0 }} />
              <span>
                <strong>Demonstration only:</strong> No data is submitted or stored outside your current session.
              </span>
            </div>

            {/* Name Field */}
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="enquiry-name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Your Name *
              </label>
              <input
                id="enquiry-name"
                type="text"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                placeholder="e.g. Vikram Singhania"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${errors.name ? 'var(--color-error)' : 'var(--color-line)'}`,
                  backgroundColor: '#FFFFFF'
                }}
              />
              {errors.name && (
                <span style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  {errors.name}
                </span>
              )}
            </div>

            {/* Contact Preference Toggle */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Preferred Contact Method
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <button
                  type="button"
                  onClick={() => setValues({ ...values, contactPreference: 'email' })}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${values.contactPreference === 'email' ? 'var(--color-green)' : 'var(--color-line)'}`,
                    backgroundColor: values.contactPreference === 'email' ? 'var(--color-green)' : '#FFFFFF',
                    color: values.contactPreference === 'email' ? '#FFFFFF' : 'var(--color-ink)',
                    fontSize: '13px',
                    fontWeight: 500
                  }}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setValues({ ...values, contactPreference: 'phone' })}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${values.contactPreference === 'phone' ? 'var(--color-green)' : 'var(--color-line)'}`,
                    backgroundColor: values.contactPreference === 'phone' ? 'var(--color-green)' : '#FFFFFF',
                    color: values.contactPreference === 'phone' ? '#FFFFFF' : 'var(--color-ink)',
                    fontSize: '13px',
                    fontWeight: 500
                  }}
                >
                  Phone
                </button>
              </div>

              {values.contactPreference === 'email' ? (
                <div>
                  <input
                    type="email"
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    placeholder="name@example.com"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1px solid ${errors.email ? 'var(--color-error)' : 'var(--color-line)'}`,
                      backgroundColor: '#FFFFFF'
                    }}
                  />
                  {errors.email && (
                    <span style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="tel"
                    value={values.phone}
                    onChange={(e) => setValues({ ...values, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1px solid ${errors.phone ? 'var(--color-error)' : 'var(--color-line)'}`,
                      backgroundColor: '#FFFFFF'
                    }}
                  />
                  {errors.phone && (
                    <span style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                      {errors.phone}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Date & Time Preferences */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label htmlFor="enquiry-date" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Target Date (Optional)
                </label>
                <input
                  id="enquiry-date"
                  type="date"
                  value={values.preferredDate}
                  onChange={(e) => setValues({ ...values, preferredDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${errors.preferredDate ? 'var(--color-error)' : 'var(--color-line)'}`,
                    backgroundColor: '#FFFFFF',
                    fontSize: '13px'
                  }}
                />
                {errors.preferredDate && (
                  <span style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                    {errors.preferredDate}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="enquiry-time" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Preferred Time Window
                </label>
                <select
                  id="enquiry-time"
                  value={values.preferredTime}
                  onChange={(e) => setValues({ ...values, preferredTime: e.target.value as any })}
                  style={{
                    width: '100%',
                    padding: '9px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-line)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '13px'
                  }}
                >
                  <option value="any">No preference</option>
                  <option value="morning">Morning (10:00 - 13:00)</option>
                  <option value="afternoon">Afternoon (13:00 - 17:00)</option>
                  <option value="evening">Evening (17:00 - 20:00)</option>
                </select>
              </div>
            </div>

            {/* Message Area */}
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="enquiry-message" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Specific Questions / Architectural Preferences
              </label>
              <textarea
                id="enquiry-message"
                rows={3}
                value={values.message}
                onChange={(e) => setValues({ ...values, message: e.target.value })}
                placeholder="Share any preferred terrace orientation or timing notes..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${errors.message ? 'var(--color-error)' : 'var(--color-line)'}`,
                  backgroundColor: '#FFFFFF',
                  fontSize: '13px',
                  resize: 'vertical'
                }}
              />
              {errors.message && (
                <span style={{ color: 'var(--color-error)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  {errors.message}
                </span>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  flex: 1,
                  padding: '14px',
                  backgroundColor: 'var(--color-green)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 500,
                  fontSize: '14px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                Preview Viewing Request
              </button>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  padding: '14px 20px',
                  border: '1px solid var(--color-line)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  color: 'var(--color-muted)'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
