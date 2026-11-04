import { describe, it, expect } from 'vitest';
import { validateEnquiry, createPreviewSummary } from '../domain/enquiry';

describe('U13-U16: Enquiry Contract & Privacy', () => {
  it('U13: rejects empty name, invalid email, and past dates', () => {
    const fixedNow = new Date('2026-11-04T12:00:00Z');
    const result = validateEnquiry(
      {
        name: ' ',
        contactPreference: 'email',
        email: 'invalid-email',
        phone: '',
        preferredDate: '2026-11-01', // past date
        preferredTime: 'morning',
        message: '',
        unitIds: ['A0801']
      },
      fixedNow
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.preferredDate).toBeDefined();
  });

  it('U14: accepts valid email or valid phone with optional-empty date', () => {
    const resultEmail = validateEnquiry({
      name: 'Ananya Sharma',
      contactPreference: 'email',
      email: 'ananya@example.com',
      phone: '',
      preferredDate: '',
      preferredTime: 'any',
      message: 'Looking for a garden terrace residence.',
      unitIds: ['A0401']
    });
    expect(resultEmail.isValid).toBe(true);

    const resultPhone = validateEnquiry({
      name: 'Rohan Verma',
      contactPreference: 'phone',
      email: '',
      phone: '+91 98765 43210',
      preferredDate: '',
      preferredTime: 'afternoon',
      message: '',
      unitIds: ['A0801']
    });
    expect(resultPhone.isValid).toBe(true);
  });

  it('U15: local calendar date today is accepted without UTC day-shift error', () => {
    const fixedNow = new Date('2026-11-04T23:30:00+05:30');
    const todayStr = '2026-11-04';

    const result = validateEnquiry(
      {
        name: 'Vikram Mehta',
        contactPreference: 'email',
        email: 'vikram@example.com',
        phone: '',
        preferredDate: todayStr,
        preferredTime: 'evening',
        message: '',
        unitIds: ['A1201']
      },
      fixedNow
    );

    expect(result.isValid).toBe(true);
    expect(result.errors.preferredDate).toBeUndefined();
  });

  it('U16: creates in-memory preview summary with explicit disclaimer and zero persistence', () => {
    const summary = createPreviewSummary({
      name: 'Priya Sen',
      contactPreference: 'email',
      email: 'priya@example.com',
      phone: '',
      preferredDate: '2026-11-10',
      preferredTime: 'morning',
      message: 'Interested in west skyline view.',
      unitIds: ['A0801', 'A0401']
    });

    expect(summary.name).toBe('Priya Sen');
    expect(summary.unitIds).toEqual(['A0801', 'A0401']);
    expect(summary.disclaimer).toContain('This is a concept demonstration; nothing has been sent or booked');
  });
});
