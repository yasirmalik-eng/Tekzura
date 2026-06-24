import { supabase, type LeadInsert } from './supabase';
import { siteConfig } from '../content/site';

export interface LeadFields {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

export type LeadSource = 'get-started' | 'chatbot' | 'contact' | 'package-builder';

const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
const web3FormsEndpoint = 'https://api.web3forms.com/submit';
const notificationEmail = siteConfig.email;

const sourceLabel: Record<LeadSource, string> = {
  'get-started': 'Tekzura Get Started form',
  chatbot: 'Tekzura AI assistant',
  contact: 'Tekzura Contact form',
  'package-builder': 'Tekzura Package Builder',
};

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function toLeadInsert(fields: LeadFields, source: LeadSource): LeadInsert {
  return {
    name: fields.name.trim(),
    email: fields.email.trim(),
    company: fields.company.trim() || null,
    service: fields.service,
    budget: fields.budget || null,
    timeline: fields.timeline || null,
    message: fields.message.trim(),
    source,
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
  };
}

async function submitToSupabase(fields: LeadFields, source: LeadSource) {
  if (!supabase) return { skipped: true };
  const { error } = await supabase.from('leads').insert(toLeadInsert(fields, source));
  if (error) throw error;
  return { skipped: false };
}

async function submitToWeb3Forms(fields: LeadFields, source: LeadSource) {
  if (!web3FormsAccessKey) return { skipped: true };

  const response = await fetch(web3FormsEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: web3FormsAccessKey,
      subject: `New lead — ${fields.service || 'General'} (${sourceLabel[source]})`,
      to_email: notificationEmail,
      notification_email: notificationEmail,
      from_name: fields.name,
      replyto: fields.email,
      name: fields.name,
      email: fields.email,
      company: fields.company || '—',
      service: fields.service || '—',
      budget: fields.budget || '—',
      timeline: fields.timeline || '—',
      message: fields.message,
      source: sourceLabel[source],
      botcheck: '',
    }),
  });

  const data = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || `Web3Forms request failed with status ${response.status}`);
  }

  return { skipped: false };
}

/** Open a prefilled email so a lead is never lost when no service is configured. */
export function openMailtoFallback(fields: LeadFields) {
  const subject = `New project inquiry — ${fields.service || 'General'}`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Company: ${fields.company || '—'}`,
    `Service: ${fields.service || '—'}`,
    `Budget: ${fields.budget || '—'}`,
    `Timeline: ${fields.timeline || '—'}`,
    '',
    'Project details:',
    fields.message,
  ].join('\n');
  window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export interface LeadSubmitResult {
  ok: boolean;
  usedFallback: boolean;
}

/**
 * Submit a lead to every configured channel (Web3Forms email + Supabase store).
 * When Web3Forms is configured, email delivery is required for success. With
 * nothing configured, opens a prefilled email as a last-resort fallback.
 */
export async function submitLead(fields: LeadFields, source: LeadSource): Promise<LeadSubmitResult> {
  if (!web3FormsAccessKey && !supabase) {
    openMailtoFallback(fields);
    return { ok: true, usedFallback: true };
  }

  const [web3Result, supabaseResult] = await Promise.allSettled([
    submitToWeb3Forms(fields, source),
    submitToSupabase(fields, source),
  ]);

  if (web3Result.status === 'rejected') console.warn('Web3Forms notification failed:', web3Result.reason);
  if (supabaseResult.status === 'rejected') console.warn('Supabase lead insert failed:', supabaseResult.reason);

  const web3Succeeded = web3Result.status === 'fulfilled' && !web3Result.value.skipped;
  const supabaseSucceeded = supabaseResult.status === 'fulfilled' && !supabaseResult.value.skipped;

  // If Web3Forms is configured, email delivery is required. Supabase storage
  // alone should not show a success state because the user expects an email.
  return { ok: web3FormsAccessKey ? web3Succeeded : supabaseSucceeded, usedFallback: false };
}

export interface PackageQuoteFields {
  reference: string;
  name: string;
  email: string;
  business: string;
  whatsapp: string;
  location: string;
  businessDescription: string;
  projectDetails: string;
  existingWebsite: string;
  budget: string;
  timeline: string;
  hearAbout: string;
  selectedServices: string[];
  quoteSummary: string;
  estimatedOneTimeTotal: string;
  monthlyTotal: string;
  attachmentName?: string;
}

export function buildPackageQuoteMessage(fields: PackageQuoteFields) {
  const lines = [
    `Reference: ${fields.reference}`,
    '',
    'Selected services:',
    ...fields.selectedServices.map((service) => `- ${service}`),
    '',
    fields.quoteSummary,
    '',
    `Estimated one-time total: ${fields.estimatedOneTimeTotal}`,
    `Monthly services total: ${fields.monthlyTotal}`,
    '',
    `Business: ${fields.businessDescription}`,
    '',
    fields.projectDetails,
    '',
    `Existing website: ${fields.existingWebsite || 'n/a'}`,
    `Budget: ${fields.budget}`,
    `Timeline: ${fields.timeline}`,
    `How they found us: ${fields.hearAbout}`,
    `Location: ${fields.location || 'n/a'}`,
    `WhatsApp: ${fields.whatsapp}`,
  ];
  if (fields.attachmentName) lines.push(`Attachment: ${fields.attachmentName}`);
  return lines.join('\n');
}

export async function submitPackageQuote(fields: PackageQuoteFields): Promise<LeadSubmitResult> {
  return submitLead(
    {
      name: fields.name,
      email: fields.email,
      company: fields.business || fields.location,
      service: fields.selectedServices.join(', '),
      budget: fields.budget,
      timeline: fields.timeline,
      message: buildPackageQuoteMessage(fields),
    },
    'package-builder',
  );
}
