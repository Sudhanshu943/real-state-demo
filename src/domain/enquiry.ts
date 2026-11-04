export interface EnquiryFormValues {
  name: string;
  contactPreference: 'email' | 'phone';
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'any';
  message: string;
  unitIds: string[];
}

export interface EnquiryValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  message?: string;
}

export interface EnquiryPreviewSummary {
  timestamp: string;
  name: string;
  contactMethod: string;
  contactValue: string;
  preferredDate?: string;
  preferredTime: string;
  message?: string;
  unitIds: string[];
  disclaimer: string;
}

export function validateEnquiry(values: EnquiryFormValues, now = new Date()): {
  isValid: boolean;
  errors: EnquiryValidationErrors;
} {
  const errors: EnquiryValidationErrors = {};

  const trimmedName = values.name.trim();
  if (!trimmedName || trimmedName.length < 2) {
    errors.name = 'Please provide a name of at least 2 characters.';
  } else if (trimmedName.length > 80) {
    errors.name = 'Name must be 80 characters or fewer.';
  }

  if (values.contactPreference === 'email') {
    const trimmedEmail = values.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      errors.email = 'Please provide a valid email address.';
    }
  } else {
    // Phone
    const digitsOnly = values.phone.replace(/[\s\-()+.]/g, '');
    if (!digitsOnly || digitsOnly.length < 7 || digitsOnly.length > 15 || !/^\d+$/.test(digitsOnly)) {
      errors.phone = 'Please provide a valid phone number (7 to 15 digits).';
    }
  }

  if (values.preferredDate) {
    // Compare YYYY-MM-DD in user's local timezone
    const todayStr = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0')
    ].join('-');

    if (values.preferredDate < todayStr) {
      errors.preferredDate = 'Preferred viewing date cannot be in the past.';
    }
  }

  if (values.message && values.message.length > 500) {
    errors.message = 'Message must be 500 characters or fewer.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function createPreviewSummary(values: EnquiryFormValues): EnquiryPreviewSummary {
  const dateFormatted = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date());

  return {
    timestamp: dateFormatted,
    name: values.name.trim(),
    contactMethod: values.contactPreference === 'email' ? 'Email' : 'Phone',
    contactValue: values.contactPreference === 'email' ? values.email.trim() : values.phone.trim(),
    preferredDate: values.preferredDate || undefined,
    preferredTime: values.preferredTime === 'any' ? 'No specific preference' : values.preferredTime,
    message: values.message.trim() || undefined,
    unitIds: [...values.unitIds],
    disclaimer: 'Request preview ready. This is a concept demonstration; nothing has been sent or booked.'
  };
}
