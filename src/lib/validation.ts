export type LearningMode = 'Offline' | 'Online';

export interface EnquiryValues {
  name: string;
  mobile: string;
  courseId: string;
  mode: LearningMode;
  message: string;
}

export type EnquiryField = 'name' | 'mobile' | 'courseId';
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const MESSAGE_MAX_LENGTH = 500;

/** Letters from any script (so Hindi names work), plus spaces, dots, apostrophes and hyphens. */
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;
const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;

/** Accepts common ways of writing a number, such as +91 98765 43210 or 098765-43210. */
export function normalizeMobile(raw: string) {
  return raw
    .replace(/[\s().-]/g, '')
    .replace(/^\+?91(?=\d{10}$)/, '')
    .replace(/^0(?=\d{10}$)/, '');
}

export function validateField(field: EnquiryField, values: EnquiryValues): string | undefined {
  switch (field) {
    case 'name': {
      const name = values.name.trim();
      if (!name) return 'Please enter your full name.';
      if (name.length < 2) return 'Your name looks too short. Please enter your full name.';
      if (!NAME_PATTERN.test(name)) return 'Please use letters only in your name.';
      return undefined;
    }
    case 'mobile': {
      const mobile = normalizeMobile(values.mobile);
      if (!mobile) return 'Please enter your mobile number.';
      if (!INDIAN_MOBILE_PATTERN.test(mobile)) {
        return 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.';
      }
      return undefined;
    }
    case 'courseId':
      return values.courseId ? undefined : 'Please select a course.';
  }
}

const FIELD_ORDER: EnquiryField[] = ['name', 'mobile', 'courseId'];

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  for (const field of FIELD_ORDER) {
    const error = validateField(field, values);
    if (error) errors[field] = error;
  }

  return errors;
}

export const firstInvalidField = (errors: EnquiryErrors) =>
  FIELD_ORDER.find((field) => errors[field]);
