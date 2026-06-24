import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Hash,
  Home,
  Loader2,
  Lock,
  Mail,
  MessageCircle,
  Receipt,
  Rocket,
  Send,
  SlidersHorizontal,
  Star,
  Tag,
  UploadCloud,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BUNDLE_DISCOUNT_RATE,
  calculatePackageQuote,
  formatCurrency,
  getPackageService,
  packageCategories,
  packageServices,
  type PackageServiceItem,
} from '../../content/packageBuilder';
import { services, siteConfig, type ServiceSlug } from '../../content/site';
import { isValidEmail, submitPackageQuote, type PackageQuoteFields } from '../../lib/leads';

type Step = 1 | 2 | 3;

const budgetOptions = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $3,000',
  '$3,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
];

const timelineOptions = [
  { id: 'asap', label: 'ASAP', desc: '1–2 weeks' },
  { id: 'soon', label: 'Soon', desc: '2–4 weeks' },
  { id: 'normal', label: 'Normal', desc: '1–2 months' },
  { id: 'flexible', label: 'Flexible', desc: 'No rush' },
];

const hearOptions = [
  { id: 'google', label: 'Google' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'referral', label: 'Referral' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'other', label: 'Other' },
];

interface DetailsState {
  name: string;
  business: string;
  email: string;
  whatsapp: string;
  location: string;
  businessDescription: string;
  projectDetails: string;
  existingWebsite: string;
  budget: string;
  timeline: string;
  hearAbout: string;
}

const emptyDetails: DetailsState = {
  name: '',
  business: '',
  email: '',
  whatsapp: '',
  location: '',
  businessDescription: '',
  projectDetails: '',
  existingWebsite: '',
  budget: budgetOptions[1],
  timeline: timelineOptions[1].label,
  hearAbout: hearOptions[0].label,
};

function createReference() {
  const year = new Date().getFullYear();
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  return `TKZ-${year}-${suffix}`;
}

function whatsappUrl(message: string) {
  const phone = siteConfig.phoneHref.replace(/\D/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function PackageSummary({
  quote,
  emptyLabel = 'Select services to see your estimate.',
  onEdit,
}: {
  quote: ReturnType<typeof calculatePackageQuote>;
  emptyLabel?: string;
  onEdit?: () => void;
}) {
  if (!quote.items.length) {
    return <p className="package-summary-empty">{emptyLabel}</p>;
  }

  return (
    <>
      {quote.items.map((item) => {
        const meta = services.find((service) => service.slug === item.slug);
        const Icon = meta?.icon;
        return (
          <div key={item.slug} className="package-summary-item">
            <span>{Icon ? <Icon aria-hidden="true" /> : null}{item.shortTitle}</span>
            <strong>{item.priceLabel.replace('From ', '')}</strong>
          </div>
        );
      })}
      {quote.hasBundleDiscount && (
        <div className="package-summary-discount">
          <Tag aria-hidden="true" />
          Bundle discount applied — <strong>save {Math.round(BUNDLE_DISCOUNT_RATE * 100)}%</strong>
        </div>
      )}
      <hr className="package-summary-divider" />
      <div className="package-summary-total">
        <span>Estimated total</span>
        <div>
          <strong>
            {quote.estimatedOneTimeTotal > 0 ? formatCurrency(quote.estimatedOneTimeTotal) : '—'}
            {quote.monthlySubtotal > 0 ? ` + ${formatCurrency(quote.monthlySubtotal)}/mo` : ''}
          </strong>
          <small>Final price confirmed after consultation</small>
        </div>
      </div>
      {onEdit && (
        <button type="button" className="package-summary-edit" onClick={onEdit}>
          <SlidersHorizontal aria-hidden="true" /> Edit services
        </button>
      )}
    </>
  );
}

function ServiceRow({
  item,
  selected,
  onToggle,
}: {
  item: PackageServiceItem;
  selected: boolean;
  onToggle: () => void;
}) {
  const meta = services.find((service) => service.slug === item.slug);
  const category = packageCategories.find((entry) => entry.id === item.categoryId);
  const Icon = meta?.icon;

  return (
    <button
      type="button"
      className={`package-service-row ${selected ? 'selected' : ''}`}
      onClick={onToggle}
      aria-pressed={selected}
    >
      <span className="package-service-check" aria-hidden="true">{selected ? <Check /> : null}</span>
      <span className="package-service-icon" style={{ background: category?.iconBg, color: category?.iconColor }}>
        {Icon ? <Icon aria-hidden="true" /> : null}
      </span>
      <span className="package-service-copy">
        <strong>
          {item.shortTitle}
          {item.popular ? <span className="package-service-popular">Popular</span> : null}
        </strong>
        <small>{item.description}</small>
      </span>
      <span className="package-service-price">{item.priceLabel}</span>
    </button>
  );
}

interface PackageBuilderProps {
  initialSelection?: ServiceSlug[];
}

export default function PackageBuilder({ initialSelection = [] }: PackageBuilderProps) {
  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<ServiceSlug[]>(initialSelection);
  const [details, setDetails] = useState<DetailsState>(emptyDetails);
  const [errors, setErrors] = useState<Partial<Record<keyof DetailsState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [reference, setReference] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const quote = useMemo(() => calculatePackageQuote(selected), [selected]);

  useEffect(() => {
    if (initialSelection.length) setSelected(initialSelection);
  }, [initialSelection]);

  function toggleService(slug: ServiceSlug) {
    setSelected((current) => (
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    ));
  }

  function updateDetail<K extends keyof DetailsState>(key: K, value: DetailsState[K]) {
    setDetails((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validateDetails() {
    const next: Partial<Record<keyof DetailsState, string>> = {};
    if (!details.name.trim()) next.name = 'Please enter your name.';
    if (!details.email.trim()) next.email = 'Please enter your email.';
    else if (!isValidEmail(details.email)) next.email = 'Please enter a valid email address.';
    if (!details.whatsapp.trim()) next.whatsapp = 'Please add your WhatsApp number.';
    if (!details.businessDescription.trim()) next.businessDescription = 'Tell us what your business does.';
    if (details.projectDetails.trim().length < 10) next.projectDetails = 'Please add a few more project details.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function buildQuoteFields(ref: string): PackageQuoteFields {
    const summaryLines = quote.items.map((item) => `${item.shortTitle}: ${item.priceLabel}`);
    if (quote.hasBundleDiscount) {
      summaryLines.push(`Bundle discount (${Math.round(BUNDLE_DISCOUNT_RATE * 100)}%): -${formatCurrency(quote.discountAmount)}`);
    }
    return {
      reference: ref,
      name: details.name.trim(),
      email: details.email.trim(),
      business: details.business.trim(),
      whatsapp: details.whatsapp.trim(),
      location: details.location.trim(),
      businessDescription: details.businessDescription.trim(),
      projectDetails: details.projectDetails.trim(),
      existingWebsite: details.existingWebsite.trim(),
      budget: details.budget,
      timeline: details.timeline,
      hearAbout: details.hearAbout,
      selectedServices: quote.items.map((item) => item.shortTitle),
      quoteSummary: summaryLines.join('\n'),
      estimatedOneTimeTotal: quote.estimatedOneTimeTotal > 0 ? formatCurrency(quote.estimatedOneTimeTotal) : 'n/a',
      monthlyTotal: quote.monthlySubtotal > 0 ? `${formatCurrency(quote.monthlySubtotal)}/mo` : 'n/a',
      attachmentName: attachmentName || undefined,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateDetails() || !selected.length || submitting) return;
    if (String(new FormData(event.currentTarget).get('botcheck') || '').trim()) return;

    setSubmitting(true);
    setServerError('');
    const ref = createReference();
    const fields = buildQuoteFields(ref);
    const result = await submitPackageQuote(fields);
    setSubmitting(false);

    if (result.ok) {
      setReference(ref);
      setStep(3);
      return;
    }

    setServerError('Something went wrong sending your quote. Please try again or email us directly.');
  }

  const groupedServices = packageCategories.map((category) => ({
    category,
    items: packageServices.filter((item) => item.categoryId === category.id),
  }));

  const discussMessage = `Hi Tekzura, I just submitted package quote ${reference || 'request'} for ${quote.items.map((item) => item.shortTitle).join(', ')}.`;

  const mobileTotalLabel = quote.items.length
    ? `${quote.estimatedOneTimeTotal > 0 ? formatCurrency(quote.estimatedOneTimeTotal) : ''}${quote.monthlySubtotal > 0 ? `${quote.estimatedOneTimeTotal > 0 ? ' + ' : ''}${formatCurrency(quote.monthlySubtotal)}/mo` : ''}`
    : 'Select services';

  return (
    <div className={`package-builder package-builder-step-${step}`}>
      <div className="package-builder-header">
        <span className="package-builder-badge">
          {step === 1 ? <SlidersHorizontal aria-hidden="true" /> : step === 2 ? <User aria-hidden="true" /> : <CheckCircle2 aria-hidden="true" />}
          {step === 1 ? 'Package builder' : step === 2 ? 'Step 2 of 3' : 'Quote submitted'}
        </span>
        <h1>
          {step === 1 && 'Build your custom package'}
          {step === 2 && 'Tell us about yourself'}
          {step === 3 && 'Your quote is being prepared'}
        </h1>
        <p>
          {step === 1 && 'Pick the services you need — get an instant estimate. No calls needed.'}
          {step === 2 && 'Just a few details — we will use this to prepare your custom quote.'}
          {step === 3 && 'We received your request and will send your custom quote within 24 hours.'}
        </p>
      </div>

      <ol className="package-steps" aria-label="Package builder progress">
        <li className={step > 1 ? 'done' : step === 1 ? 'active' : ''}>
          <span>{step > 1 ? <Check aria-hidden="true" /> : '1'}</span> Pick services
        </li>
        <li className="package-step-line" aria-hidden="true" />
        <li className={step > 2 ? 'done' : step === 2 ? 'active' : ''}>
          <span>{step > 2 ? <Check aria-hidden="true" /> : '2'}</span> Your details
        </li>
        <li className="package-step-line" aria-hidden="true" />
        <li className={step === 3 ? 'active' : ''}>
          <span>3</span> Get quote
        </li>
      </ol>

      {step === 1 && (
        <>
          <div className="package-builder-grid">
            <div className="package-builder-main">
              {groupedServices.map(({ category, items }) => (
                <div key={category.id} className="package-service-group">
                  <p className="package-service-group-label">{category.name}</p>
                  {items.map((item) => (
                    <ServiceRow
                      key={item.slug}
                      item={item}
                      selected={selected.includes(item.slug)}
                      onToggle={() => toggleService(item.slug)}
                    />
                  ))}
                </div>
              ))}
            </div>

            <aside className="package-summary-panel">
              <h2><Receipt aria-hidden="true" /> Your package summary</h2>
              <PackageSummary quote={quote} />
              <button
                type="button"
                className="button button-primary package-summary-cta"
                disabled={!selected.length}
                onClick={() => setStep(2)}
              >
                <Send aria-hidden="true" /> Get my free quote
              </button>
              <a className="package-whatsapp-btn" href={whatsappUrl('Hi Tekzura, I want to discuss a custom package.')} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" /> Discuss on WhatsApp
              </a>
            </aside>
          </div>

          <div className={`package-mobile-bar ${selected.length ? 'has-selection' : ''}`} aria-live="polite">
            <div className="package-mobile-bar-copy">
              <strong>{selected.length ? `${selected.length} service${selected.length === 1 ? '' : 's'} selected` : 'No services selected'}</strong>
              <span>{mobileTotalLabel}</span>
            </div>
            <button
              type="button"
              className="button button-primary package-mobile-bar-cta"
              disabled={!selected.length}
              onClick={() => setStep(2)}
            >
              <Send aria-hidden="true" /> Continue
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <form className="package-builder-grid package-builder-grid-step-2" onSubmit={handleSubmit} noValidate>
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="lead-honeypot" aria-hidden="true" />
          <div className="package-builder-main">
            <section className="package-form-section">
              <h2><User aria-hidden="true" /> Personal info</h2>
              <div className="package-form-row">
                <label className="package-field">
                  <span>Full name <em>*</em></span>
                  <input value={details.name} onChange={(e) => updateDetail('name', e.target.value)} placeholder="e.g. Ahmed Khan" />
                  {errors.name && <small className="package-field-error"><AlertCircle aria-hidden="true" />{errors.name}</small>}
                </label>
                <label className="package-field">
                  <span>Business name</span>
                  <input value={details.business} onChange={(e) => updateDetail('business', e.target.value)} placeholder="e.g. Khan Enterprises" />
                </label>
              </div>
              <div className="package-form-row">
                <label className="package-field">
                  <span>Email address <em>*</em></span>
                  <input type="email" value={details.email} onChange={(e) => updateDetail('email', e.target.value)} placeholder="you@email.com" />
                  {errors.email && <small className="package-field-error"><AlertCircle aria-hidden="true" />{errors.email}</small>}
                </label>
                <label className="package-field">
                  <span>WhatsApp number <em>*</em></span>
                  <input value={details.whatsapp} onChange={(e) => updateDetail('whatsapp', e.target.value)} placeholder="+92 300 0000000" />
                  {errors.whatsapp && <small className="package-field-error"><AlertCircle aria-hidden="true" />{errors.whatsapp}</small>}
                </label>
              </div>
              <label className="package-field">
                <span>Country / City</span>
                <input value={details.location} onChange={(e) => updateDetail('location', e.target.value)} placeholder="e.g. Lahore, Pakistan" />
              </label>
            </section>

            <section className="package-form-section">
              <h2><Rocket aria-hidden="true" /> Project info</h2>
              <label className="package-field">
                <span>What does your business do? <em>*</em></span>
                <input value={details.businessDescription} onChange={(e) => updateDetail('businessDescription', e.target.value)} placeholder="e.g. I sell clothing online..." />
                {errors.businessDescription && <small className="package-field-error"><AlertCircle aria-hidden="true" />{errors.businessDescription}</small>}
              </label>
              <label className="package-field">
                <span>Describe what you need <em>*</em></span>
                <textarea rows={4} value={details.projectDetails} onChange={(e) => updateDetail('projectDetails', e.target.value)} placeholder="Tell us about your project — goals, problems, anything important..." />
                {errors.projectDetails && <small className="package-field-error"><AlertCircle aria-hidden="true" />{errors.projectDetails}</small>}
              </label>
              <label className="package-field">
                <span>Do you have an existing website?</span>
                <input value={details.existingWebsite} onChange={(e) => updateDetail('existingWebsite', e.target.value)} placeholder="Paste your website link (if any)" />
              </label>
            </section>

            <section className="package-form-section">
              <h2><Tag aria-hidden="true" /> Budget range</h2>
              <div className="package-choice-grid three">
                {budgetOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`package-choice ${details.budget === option ? 'selected' : ''}`}
                    onClick={() => updateDetail('budget', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </section>

            <section className="package-form-section">
              <h2><Clock3 aria-hidden="true" /> When do you need it?</h2>
              <div className="package-choice-grid four">
                {timelineOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`package-choice timeline ${details.timeline === option.label ? 'selected' : ''}`}
                    onClick={() => updateDetail('timeline', option.label)}
                  >
                    <strong>{option.label}</strong>
                    <small>{option.desc}</small>
                  </button>
                ))}
              </div>
            </section>

            <section className="package-form-section">
              <h2><UploadCloud aria-hidden="true" /> Upload files (optional)</h2>
              <button type="button" className="package-upload" onClick={() => fileRef.current?.click()}>
                <UploadCloud aria-hidden="true" />
                <span>Drag and drop or <strong>browse files</strong></span>
                <small>Brand guidelines, designs, references, briefs — anything helpful</small>
                {attachmentName ? <em>{attachmentName}</em> : null}
              </button>
              <input
                ref={fileRef}
                type="file"
                className="lead-honeypot"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setAttachmentName(file?.name || '');
                  if (file) updateDetail('projectDetails', `${details.projectDetails}\n\nAttachment noted: ${file.name}`.trim());
                }}
              />
            </section>

            <section className="package-form-section">
              <h2>How did you find us?</h2>
              <div className="package-choice-grid three">
                {hearOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`package-choice hear ${details.hearAbout === option.label ? 'selected' : ''}`}
                    onClick={() => updateDetail('hearAbout', option.label)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            {serverError && (
              <p className="lead-server-error" role="alert">
                <AlertCircle aria-hidden="true" />
                {serverError} <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
            )}

            <div className="package-form-actions">
              <button type="button" className="button button-secondary" onClick={() => setStep(1)}>
                <ArrowLeft aria-hidden="true" /> Back to services
              </button>
              <div className="package-form-actions-end">
                <p className="package-privacy"><Lock aria-hidden="true" /> 100% private. No spam.</p>
                <button type="submit" className="button button-primary" disabled={submitting || !selected.length}>
                  {submitting ? <><Loader2 className="lead-spinner" aria-hidden="true" /> Sending…</> : <>Get my quote <ArrowRight aria-hidden="true" /></>}
                </button>
              </div>
            </div>
          </div>

          <aside className="package-summary-panel">
            <h2><Receipt aria-hidden="true" /> Your package</h2>
            <PackageSummary quote={quote} onEdit={() => setStep(1)} />
          </aside>
        </form>
      )}

      {step === 3 && (
        <div className="package-success">
          <div className="package-success-header">
            <span className="package-success-icon" aria-hidden="true"><CheckCircle2 /></span>
            <h2>Your quote is being prepared</h2>
            <p>Check your email and WhatsApp — our team will follow up within 24 hours.</p>
            <span className="package-ref-badge"><Hash aria-hidden="true" /> Reference: {reference}</span>
          </div>

          <div className="package-success-grid">
            <article className="package-quote-card">
              <header>
                <h3><Receipt aria-hidden="true" /> Your quote summary</h3>
                <span>{quote.items.length} services</span>
              </header>
              <div className="package-quote-card-body">
                {quote.items.map((item) => {
                  const meta = services.find((service) => service.slug === item.slug);
                  const Icon = meta?.icon;
                  const category = packageCategories.find((entry) => entry.id === item.categoryId);
                  return (
                    <div key={item.slug} className="package-summary-item detailed">
                      <span>
                        <i style={{ background: category?.iconBg, color: category?.iconColor }}>{Icon ? <Icon aria-hidden="true" /> : null}</i>
                        {item.shortTitle}
                      </span>
                      <strong>{item.priceLabel.replace('From ', '')}</strong>
                    </div>
                  );
                })}
                <hr className="package-summary-divider" />
                <div className="package-quote-meta">
                  <div><span>Subtotal</span><strong>{formatCurrency(quote.oneTimeSubtotal + quote.monthlySubtotal)}</strong></div>
                  {quote.hasBundleDiscount && (
                    <div><span>Bundle discount ({Math.round(BUNDLE_DISCOUNT_RATE * 100)}%)</span><strong className="save">− {formatCurrency(quote.discountAmount)}</strong></div>
                  )}
                </div>
                <hr className="package-summary-divider" />
                <div className="package-summary-total large">
                  <span>Estimated total</span>
                  <div>
                    <strong>
                      {formatCurrency(quote.estimatedOneTimeTotal)}
                      {quote.monthlySubtotal > 0 ? ` + ${formatCurrency(quote.monthlySubtotal)}/mo` : ''}
                    </strong>
                    <small>Final confirmed after consultation</small>
                  </div>
                </div>
              </div>
            </article>

            <article className="package-quote-card">
              <header><h3>What happens next</h3></header>
              <div className="package-next-list">
                <div><Mail aria-hidden="true" /><span>Confirmation email sent to your inbox</span><em>Now</em></div>
                <div><User aria-hidden="true" /><span>Our team reviews your project details</span><em>1–2 hrs</em></div>
                <div><Receipt aria-hidden="true" /><span>Custom detailed quote prepared</span><em>Within 24h</em></div>
                <div><MessageCircle aria-hidden="true" /><span>We reach out on WhatsApp and email</span><em>Within 24h</em></div>
                <div><Rocket aria-hidden="true" /><span>Project kickoff after approval</span><em>Day 1</em></div>
              </div>
            </article>
          </div>

          <div className="package-wait-box">
            <h3><Clock3 aria-hidden="true" /> While you wait — explore our work</h3>
            <div className="package-wait-grid">
              <Link to="/work"><Star aria-hidden="true" /><strong>See our portfolio</strong><span>100+ real projects delivered</span></Link>
              <Link to="/#testimonials"><Star aria-hidden="true" /><strong>Read reviews</strong><span>See what clients say about us</span></Link>
              <Link to="/about"><User aria-hidden="true" /><strong>Meet the team</strong><span>The people behind your project</span></Link>
            </div>
          </div>

          <div className="package-success-actions">
            <a className="package-whatsapp-btn" href={whatsappUrl(discussMessage)} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Chat on WhatsApp now
            </a>
            <Link className="button button-primary" to="/"><Home aria-hidden="true" /> Back to home</Link>
            <button type="button" className="button button-secondary" onClick={() => setStep(1)}>
              <SlidersHorizontal aria-hidden="true" /> Edit my package
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
