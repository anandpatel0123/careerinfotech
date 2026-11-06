import { useEffect, useRef, useState, type ReactNode, type SubmitEvent } from 'react';
import { AlertCircle, ArrowLeft, Building2, ChevronDown, Laptop, MessageCircleWarning } from 'lucide-react';
import { CATEGORIES, COURSES, findCourse } from '../../data/courses';
import { SITE, telHref } from '../../data/site';
import {
  MESSAGE_MAX_LENGTH,
  firstInvalidField,
  normalizeMobile,
  validateEnquiry,
  validateField,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
  type LearningMode,
} from '../../lib/validation';
import { buildEnquiryMessage, openWhatsApp, whatsappUrl } from '../../lib/whatsapp';
import { Dialog } from '../ui/Dialog';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

interface EnquiryDialogProps {
  open: boolean;
  formKey: number;
  initialCourseId?: string;
  onClose: () => void;
}

export function EnquiryDialog({ open, formKey, initialCourseId, onClose }: EnquiryDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} labelledBy="enquiry-dialog-title">
      <EnquiryFlow key={formKey} initialCourseId={initialCourseId} onClose={onClose} />
    </Dialog>
  );
}

const FIELD_IDS: Record<EnquiryField, string> = {
  name: 'enquiry-name',
  mobile: 'enquiry-mobile',
  courseId: 'enquiry-course',
};

const LEARNING_MODES: { value: LearningMode; hint: string; icon: typeof Laptop }[] = [
  { value: 'Offline', hint: 'At our centre', icon: Building2 },
  { value: 'Online', hint: 'From home', icon: Laptop },
];

function EnquiryFlow({ initialCourseId, onClose }: { initialCourseId?: string; onClose: () => void }) {
  const [values, setValues] = useState<EnquiryValues>({
    name: '',
    mobile: '',
    courseId: initialCourseId ?? '',
    mode: 'Offline',
    message: '',
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const update = <K extends keyof EnquiryValues>(field: K, value: EnquiryValues[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);

    // Once a field shows an error, re-check it as the visitor corrects it.
    if (errors[field as EnquiryField]) {
      setErrors({ ...errors, [field]: validateField(field as EnquiryField, next) });
    }
  };

  const checkField = (field: EnquiryField) => {
    setErrors((current) => ({ ...current, [field]: validateField(field, values) }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);

    const invalid = firstInvalidField(nextErrors);
    if (invalid) {
      formRef.current?.querySelector<HTMLElement>(`#${FIELD_IDS[invalid]}`)?.focus();
      return;
    }

    const url = whatsappUrl(
      buildEnquiryMessage({
        name: values.name.trim().replace(/\s+/g, ' '),
        mobile: normalizeMobile(values.mobile),
        course: findCourse(values.courseId)?.name ?? '',
        mode: values.mode,
        message: values.message.trim(),
      }),
    );

    setHandoffUrl(url);
    openWhatsApp(url);
  };

  if (handoffUrl) {
    return <WhatsAppHandoff url={handoffUrl} onEdit={() => setHandoffUrl(null)} onClose={onClose} />;
  }

  return (
    <>
      <header className="enquiry__head">
        <h2 id="enquiry-dialog-title">Enquire Now</h2>
        <p>Share a few details and we will prepare your WhatsApp message.</p>
      </header>

      <form ref={formRef} className="enquiry__form" onSubmit={handleSubmit} noValidate>
        <div className="dialog__body enquiry__fields">
          <Field id={FIELD_IDS.name} label="Full Name" required error={errors.name}>
            {(aria) => (
              <input
                {...aria}
                type="text"
                autoComplete="name"
                data-initial-focus-desktop
                value={values.name}
                onChange={(event) => update('name', event.target.value)}
                onBlur={() => checkField('name')}
              />
            )}
          </Field>

          <Field
            id={FIELD_IDS.mobile}
            label="Mobile Number"
            required
            error={errors.mobile}
            hint="Enter your 10-digit mobile number."
          >
            {(aria) => (
              <input
                {...aria}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={16}
                value={values.mobile}
                onChange={(event) => update('mobile', event.target.value)}
                onBlur={() => checkField('mobile')}
              />
            )}
          </Field>

          <Field id={FIELD_IDS.courseId} label="Select Course" required error={errors.courseId}>
            {(aria) => (
              <div className="select">
                <select
                  {...aria}
                  value={values.courseId}
                  onChange={(event) => update('courseId', event.target.value)}
                  onBlur={() => checkField('courseId')}
                >
                  <option value="">Choose a course</option>
                  {CATEGORIES.map((category) => (
                    <optgroup key={category.id} label={category.label}>
                      {COURSES.filter((course) => course.category === category.id).map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" size={18} />
              </div>
            )}
          </Field>

          <fieldset className="field mode-picker">
            <legend className="field__label">Preferred Learning Mode</legend>
            <div className="mode-picker__options">
              {LEARNING_MODES.map(({ value, hint, icon: Icon }) => (
                <label key={value} className="mode-option">
                  <input
                    type="radio"
                    name="learning-mode"
                    value={value}
                    checked={values.mode === value}
                    onChange={() => update('mode', value)}
                  />
                  <span className="mode-option__box">
                    <Icon aria-hidden="true" size={20} />
                    <span>
                      <strong>{value}</strong>
                      <small>{hint}</small>
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <Field id="enquiry-message" label="Message" optional hint={`Up to ${MESSAGE_MAX_LENGTH} characters.`}>
            {(aria) => (
              <textarea
                {...aria}
                rows={3}
                maxLength={MESSAGE_MAX_LENGTH}
                value={values.message}
                onChange={(event) => update('message', event.target.value)}
              />
            )}
          </Field>
        </div>

        <div className="dialog__footer enquiry__footer">
          <button type="submit" className="btn btn--whatsapp btn--block">
            <WhatsAppIcon size={20} />
            Submit Enquiry
          </button>
          <p className="enquiry__note">
            This opens WhatsApp with your message ready. Your enquiry is only sent when you press{' '}
            <strong>Send</strong> in WhatsApp.
          </p>
        </div>
      </form>
    </>
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: (aria: {
    id: string;
    required?: boolean;
    'aria-invalid'?: true;
    'aria-describedby'?: string;
  }) => ReactNode;
}

function Field({ id, label, required, optional, hint, error, children }: FieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ');

  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required && (
          <span className="field__required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
        {optional && <span className="field__optional"> (optional)</span>}
      </label>
      {children({
        id,
        required,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy || undefined,
      })}
      {error && (
        <p className="field__error" id={errorId}>
          <AlertCircle aria-hidden="true" size={16} />
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      )}
    </div>
  );
}

interface WhatsAppHandoffProps {
  url: string;
  onEdit: () => void;
  onClose: () => void;
}

function WhatsAppHandoff({ url, onEdit, onClose }: WhatsAppHandoffProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="handoff">
      <span className="handoff__icon">
        <MessageCircleWarning aria-hidden="true" size={32} />
      </span>
      <h2 id="enquiry-dialog-title" ref={headingRef} tabIndex={-1}>
        One last step: press Send in WhatsApp
      </h2>
      <p>
        Your message is ready in WhatsApp, but it has <strong>not been sent yet</strong>. Please go to
        WhatsApp and press <strong>Send</strong> to complete your enquiry.
      </p>

      <a className="btn btn--whatsapp btn--block" href={url} target="_blank" rel="noopener">
        <WhatsAppIcon size={20} />
        Open WhatsApp Again
      </a>

      <div className="handoff__actions">
        <button type="button" className="btn btn--outline" onClick={onEdit}>
          <ArrowLeft aria-hidden="true" size={18} />
          Edit Details
        </button>
        <button type="button" className="btn btn--outline" onClick={onClose}>
          Close
        </button>
      </div>

      <p className="handoff__help">
        WhatsApp did not open? Call us on{' '}
        <a href={telHref(SITE.whatsappDisplay)}>{SITE.whatsappDisplay}</a>.
      </p>
    </div>
  );
}
