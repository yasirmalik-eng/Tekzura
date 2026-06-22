import { type FormEvent, useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { services, siteConfig } from '../../content/site';
import { type LeadFields, type LeadSource, isValidEmail, submitLead } from '../../lib/leads';

const budgetOptions = [
  'Under $5k',
  '$5k – $15k',
  '$15k – $50k',
  '$50k+',
  'Not sure yet',
];

const timelineOptions = [
  'As soon as possible',
  '1–3 months',
  '3–6 months',
  'Just exploring',
];

const emptyFields: LeadFields = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
};

type Errors = Partial<Record<keyof LeadFields, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

interface LeadFormProps {
  source?: LeadSource;
  ariaLabel?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
}

function validate(fields: LeadFields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = 'Please enter your name.';
  if (!fields.email.trim()) errors.email = 'Please enter your email.';
  else if (!isValidEmail(fields.email)) errors.email = 'Please enter a valid email address.';
  if (!fields.service) errors.service = 'Please choose what you want to build.';
  if (fields.message.trim().length < 10) errors.message = 'Please add a few more details (at least 10 characters).';
  return errors;
}

export default function LeadForm({
  source = 'get-started',
  ariaLabel = 'Start your project',
  submitLabel = 'Send Project Request',
  successTitle = 'Thanks — your request is on its way.',
  successMessage = 'We have received your project details and will get back to you within one business day.',
}: LeadFormProps) {
  const [fields, setFields] = useState<LeadFields>(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const dirtyRef = useRef(false);

  // Warn before leaving with unsaved changes (skips once submitted successfully).
  useEffect(() => {
    function onBeforeUnload(event: BeforeUnloadEvent) {
      if (dirtyRef.current && status !== 'success') {
        event.preventDefault();
        event.returnValue = '';
      }
    }
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [status]);

  function update<K extends keyof LeadFields>(key: K, value: string) {
    dirtyRef.current = true;
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function focusFirstError(nextErrors: Errors) {
    const order: (keyof LeadFields)[] = ['name', 'email', 'service', 'message'];
    const firstKey = order.find((key) => nextErrors[key]);
    if (firstKey) formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;
    if (String(new FormData(event.currentTarget).get('botcheck') || '').trim()) return;

    const nextErrors = validate(fields);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirstError(nextErrors);
      return;
    }

    setServerError('');
    setStatus('submitting');

    const result = await submitLead(fields, source);

    if (result.ok) {
      dirtyRef.current = false;
      setStatus('success');
      return;
    }

    setStatus('error');
    setServerError('Something went wrong sending your request. Please try again, or email us directly.');
  }

  if (status === 'success') {
    return (
      <div className="lead-success" role="status" aria-live="polite">
        <span className="lead-success-icon" aria-hidden="true"><CheckCircle2 /></span>
        <h3>{successTitle}</h3>
        <p>
          {successMessage}
          {' '}Prefer to talk sooner?
        </p>
        <a className="button button-primary" href={siteConfig.calendly} target="_blank" rel="noreferrer">
          Book a Growth Strategy Call
        </a>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form ref={formRef} className="lead-form" onSubmit={handleSubmit} noValidate aria-label={ariaLabel}>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="lead-honeypot" aria-hidden="true" />

      <div className="lead-row">
        <div className="lead-field">
          <label htmlFor="lead-name">Full name</label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'lead-name-error' : undefined}
            placeholder="Jane Cooper"
          />
          {errors.name && <span className="lead-error" id="lead-name-error"><AlertCircle aria-hidden="true" />{errors.name}</span>}
        </div>

        <div className="lead-field">
          <label htmlFor="lead-email">Work email</label>
          <input
            id="lead-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            value={fields.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'lead-email-error' : undefined}
            placeholder="jane@company.com"
          />
          {errors.email && <span className="lead-error" id="lead-email-error"><AlertCircle aria-hidden="true" />{errors.email}</span>}
        </div>
      </div>

      <div className="lead-row">
        <div className="lead-field">
          <label htmlFor="lead-company">Company <span className="lead-optional">(optional)</span></label>
          <input
            id="lead-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={fields.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="Company or project name"
          />
        </div>

        <div className="lead-field">
          <label htmlFor="lead-service">What do you want to build?</label>
          <select
            id="lead-service"
            name="service"
            value={fields.service}
            onChange={(e) => update('service', e.target.value)}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? 'lead-service-error' : undefined}
          >
            <option value="" disabled>Select a focus…</option>
            {services.map((service) => (
              <option key={service.slug} value={service.shortTitle}>{service.shortTitle}</option>
            ))}
            <option value="Something else">Something else</option>
          </select>
          {errors.service && <span className="lead-error" id="lead-service-error"><AlertCircle aria-hidden="true" />{errors.service}</span>}
        </div>
      </div>

      <div className="lead-row">
        <div className="lead-field">
          <label htmlFor="lead-budget">Budget range <span className="lead-optional">(optional)</span></label>
          <select id="lead-budget" name="budget" value={fields.budget} onChange={(e) => update('budget', e.target.value)}>
            <option value="">Select a range…</option>
            {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>

        <div className="lead-field">
          <label htmlFor="lead-timeline">Timeline <span className="lead-optional">(optional)</span></label>
          <select id="lead-timeline" name="timeline" value={fields.timeline} onChange={(e) => update('timeline', e.target.value)}>
            <option value="">Select a timeline…</option>
            {timelineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      </div>

      <div className="lead-field">
        <label htmlFor="lead-message">Project details</label>
        <textarea
          id="lead-message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'lead-message-error' : undefined}
          placeholder="Tell us what you are building, the problem it solves, and where you are today…"
        />
        {errors.message && <span className="lead-error" id="lead-message-error"><AlertCircle aria-hidden="true" />{errors.message}</span>}
      </div>

      {serverError && (
        <p className="lead-server-error" role="alert">
          <AlertCircle aria-hidden="true" />
          {serverError} <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
      )}

      <div className="lead-actions">
        <button type="submit" className="button button-primary lead-submit" disabled={submitting}>
          {submitting ? <><Loader2 className="lead-spinner" aria-hidden="true" /> Sending…</> : <><Send aria-hidden="true" /> {submitLabel}</>}
        </button>
        <p className="lead-reassure">We reply within one business day. No spam, ever.</p>
      </div>
    </form>
  );
}
