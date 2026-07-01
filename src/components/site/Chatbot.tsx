import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Code2,
  Loader2,
  Maximize2,
  Minimize2,
  Rocket,
  Send,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';
import { isValidEmail, submitLead } from '../../lib/leads';
import { knowledgeBase } from '../../content/knowledge';
import { siteConfig } from '../../content/site';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const chatEndpoint = (import.meta.env.VITE_CHAT_ENDPOINT || '/api/chat').trim();

/** Other components (e.g. the header) dispatch this to open the chat. */
export const OPEN_CHAT_EVENT = 'tekzura:open-chat';

const inlinePattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s)]+)/g;

function renderInline(text: string, onNavigate: (path: string) => void): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  inlinePattern.lastIndex = 0;

  while ((match = inlinePattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index).replace(/\*\*/g, ''));
    const [, linkLabel, linkUrl, boldText, bareUrl] = match;
    if (linkLabel && linkUrl) nodes.push(renderLink(linkLabel, linkUrl, key++, onNavigate));
    else if (boldText) nodes.push(<strong key={key++}>{boldText}</strong>);
    else if (bareUrl) nodes.push(renderLink(bareUrl, bareUrl, key++, onNavigate));
    lastIndex = inlinePattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex).replace(/\*\*/g, ''));
  return nodes;
}

function renderLink(label: string, url: string, key: number, onNavigate: (path: string) => void) {
  if (url.startsWith('/')) {
    return (
      <a key={key} href={url} onClick={(e) => { e.preventDefault(); onNavigate(url); }}>
        {label}
      </a>
    );
  }
  return <a key={key} href={url} target="_blank" rel="noreferrer">{label}</a>;
}

function FormattedMessage({ text, onNavigate }: { text: string; onNavigate: (path: string) => void }) {
  const blocks: ReactNode[] = [];
  const lines = text.split('\n');
  let bullets: string[] = [];
  let key = 0;

  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`ul-${key++}`}>
        {bullets.map((item, i) => <li key={i}>{renderInline(item, onNavigate)}</li>)}
      </ul>,
    );
    bullets = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const bulletMatch = /^\s*(?:[-*]|\d+\.)\s+(.*)$/.exec(line);
    if (bulletMatch) { bullets.push(bulletMatch[1]); continue; }
    flushBullets();
    if (line.trim()) blocks.push(<p key={`p-${key++}`}>{renderInline(line, onNavigate)}</p>);
  }
  flushBullets();
  return <>{blocks}</>;
}

const chatbotAvatarSrc = '/chatbot/avatar.png';

function TekzuraAvatar({ className = '' }: { className?: string }) {
  return (
    <img
      className={`tekzura-chat-avatar${className ? ` ${className}` : ''}`}
      src={chatbotAvatarSrc}
      alt=""
      width="128"
      height="128"
      aria-hidden="true"
      decoding="async"
    />
  );
}

const suggestionCards = [
  { icon: Code2, label: 'Build Product', text: 'I want to build a web app or SaaS product' },
  { icon: Rocket, label: 'Launch MVP', text: 'How do I launch an MVP fast?' },
  { icon: TrendingUp, label: 'Grow Revenue', text: 'How can Tekzura help me grow?' },
  { icon: Zap, label: 'Automate Work', text: 'Tell me about your automation services' },
];

const mobileChatQuery = '(max-width: 640px)';

function shouldOpenCallback(status: number, reason: string, fallbackToLead?: boolean) {
  if (/not configured/i.test(reason)) return false;
  if (fallbackToLead) return true;
  if (status === 429 || status === 503) return true;
  return /rate.?limit|quota|high demand|unavailable|busy|assistant is unavailable/i.test(reason);
}

export default function Chatbot() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const [showLead, setShowLead] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadSent, setLeadSent] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [leadSending, setLeadSending] = useState(false);
  const [leadFallback, setLeadFallback] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelId = 'tekzura-chat-panel';

  function closeChat() {
    setOpen(false);
    setExpanded(false);
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, sending, showLead, leadSent]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (expanded && !isMobile) setExpanded(false);
        else closeChat();
      }
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, expanded, isMobile]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(mobileChatQuery);
    const syncMobile = () => setIsMobile(media.matches);
    syncMobile();
    media.addEventListener('change', syncMobile);
    return () => media.removeEventListener('change', syncMobile);
  }, []);

  useEffect(() => {
    const lock = open && (expanded || isMobile);
    document.body.classList.toggle('chat-lock', lock);
    return () => document.body.classList.remove('chat-lock');
  }, [open, expanded, isMobile]);

  function goTo(path: string) {
    closeChat();
    navigate(path);
  }

  function openCallbackFallback() {
    setError('');
    setLeadFallback(true);
    setShowLead(true);
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setError('');
    const next = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(next);
    setInput('');
    setSending(true);

    try {
      const res = await fetch(chatEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context: knowledgeBase,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? ((await res.json().catch(() => null)) as {
            reply?: string;
            error?: string;
            fallbackToLead?: boolean;
          } | null)
        : null;

      if (!res.ok || !data?.reply) {
        const reason = data?.error || (contentType.includes('text/html')
          ? 'Chat service is not reachable on this deployment.'
          : `Chat request failed (${res.status})`);

        if (/not configured/i.test(reason)) {
          setError('AI chat is unavailable on this deployment. Please use Request a callback below or contact us directly.');
          return;
        }

        if (res.status >= 500) {
          setError('The chat service hit a server error. Please try again in a moment or use Request a callback below.');
          return;
        }

        if (shouldOpenCallback(res.status, reason, data?.fallbackToLead)) {
          openCallbackFallback();
          return;
        }

        setError(reason);
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply as string }]);
    } catch {
      setError('Unable to reach the assistant right now. Please try again in a moment.');
    } finally {
      setSending(false);
    }
  }

  function closeLeadForm() {
    setShowLead(false);
    setLeadFallback(false);
    setLeadError('');
  }

  async function handleLeadSubmit(e: FormEvent) {
    e.preventDefault();
    if (leadSending) return;
    setLeadError('');
    if (!leadName.trim()) { setLeadError('Please enter your name.'); return; }
    if (!isValidEmail(leadEmail)) { setLeadError('Please enter a valid email.'); return; }

    setLeadSending(true);
    const transcript = messages
      .map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const result = await submitLead({
      name: leadName.trim(), email: leadEmail.trim(), company: '',
      service: 'Chatbot inquiry', budget: '', timeline: '',
      message: transcript
        ? `Callback request from Tekzura AI assistant.\nSend notification to: ${siteConfig.email}\n\nConversation:\n${transcript}`
        : `Callback request from Tekzura AI assistant.\nSend notification to: ${siteConfig.email}.`,
    }, 'chatbot');

    setLeadSending(false);
    if (result.ok) { setLeadSent(true); setShowLead(false); }
    else setLeadError('Could not send. Please try again.');
  }

  const isWelcome = messages.length === 0;

  const widget = (
    <div className="chat-widget-host">
      {!open && (
        <button
          type="button"
          className="chat-fab"
          aria-expanded={false}
          aria-controls={panelId}
          aria-label="Open AI assistant"
          onClick={() => setOpen(true)}
        >
          <TekzuraAvatar className="tekzura-chat-avatar-fab" />
        </button>
      )}

      {open && (expanded || isMobile) && (
        <div className="chat-backdrop" onClick={() => (isMobile ? closeChat() : setExpanded(false))} aria-hidden="true" />
      )}

      {open && (
      <div
        id={panelId}
        className={`chat-panel is-open${expanded ? ' is-expanded' : ''}`}
        role="dialog"
        aria-label="Tekzura AI assistant"
        aria-modal={expanded || isMobile ? true : undefined}
      >
        {/* Header */}
        <header className="chat-header">
          <div className="chat-header-brand">
            <span className="chat-header-avatar" aria-hidden="true">
              <TekzuraAvatar className="tekzura-chat-avatar-header" />
              <i className="chat-online-ring" aria-hidden="true" />
            </span>
            <div>
              <strong>Tekzura AI</strong>
              <span><i className="chat-dot" aria-hidden="true" />Your Product Growth Guide</span>
            </div>
          </div>
          <div className="chat-header-actions">
            <button
              type="button"
              className="chat-icon-btn chat-expand-btn"
              aria-label={expanded ? 'Exit full screen' : 'Expand to full screen'}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
            </button>
            <button type="button" className="chat-icon-btn" aria-label="Close chat" onClick={closeChat}>
              <X aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Messages area */}
        <div className="chat-messages" ref={scrollRef} aria-live="polite">

          {/* Welcome screen */}
          {isWelcome && (
            <div className="chat-welcome">
              <div className="chat-welcome-hero" aria-hidden="true">
                <TekzuraAvatar className="tekzura-chat-avatar-hero" />
              </div>
              <h2 className="chat-welcome-title">Build Something Great.</h2>
              <p className="chat-welcome-sub">
                Ask me anything — services, process, pricing, team, or how Tekzura can help bring your idea to life.
              </p>
              <div className="chat-suggestion-grid">
                {suggestionCards.map(({ icon: Icon, label, text }) => (
                  <button key={label} type="button" className="chat-suggestion-card" onClick={() => void send(text)}>
                    <span className="chat-suggestion-icon" aria-hidden="true"><Icon /></span>
                    <span className="chat-suggestion-label">{label}</span>
                    <ArrowRight className="chat-suggestion-arrow" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg chat-msg-${msg.role}`}>
              {msg.role === 'assistant' && (
                <span className="chat-msg-icon" aria-hidden="true"><TekzuraAvatar className="tekzura-chat-avatar-message" /></span>
              )}
              {msg.role === 'assistant' ? (
                <div className="chat-bubble">
                  <FormattedMessage text={msg.content} onNavigate={goTo} />
                </div>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {sending && (
            <div className="chat-msg chat-msg-assistant">
              <span className="chat-msg-icon" aria-hidden="true"><TekzuraAvatar className="tekzura-chat-avatar-message" /></span>
              <p className="chat-typing" aria-label="Tekzura AI is typing"><i /><i /><i /></p>
            </div>
          )}

          {/* Lead capture confirmation */}
          {leadSent && (
            <div className="chat-lead-done" role="status">
              <Check aria-hidden="true" />
              <span>Got it! We will be in touch shortly.</span>
            </div>
          )}

          {/* Lead capture form */}
          {showLead && !leadSent && (
            <form className="chat-lead" onSubmit={handleLeadSubmit} noValidate>
              <p className="chat-lead-title">
                {leadFallback
                  ? 'Our assistant is at capacity right now — share your details and our team will follow up.'
                  : 'Leave your details — we will reach out.'}
              </p>
              <label className="chat-visually-hidden" htmlFor="chat-lead-name">Your name</label>
              <input id="chat-lead-name" name="name" type="text" autoComplete="name"
                placeholder="Your name…" value={leadName} onChange={(e) => setLeadName(e.target.value)} />
              <label className="chat-visually-hidden" htmlFor="chat-lead-email">Your email</label>
              <input id="chat-lead-email" name="email" type="email" inputMode="email"
                autoComplete="email" spellCheck={false} placeholder="you@company.com"
                value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)}
                aria-invalid={!!leadError} />
              {leadError && <span className="chat-lead-error" role="alert">{leadError}</span>}
              <div className="chat-lead-actions">
                <button type="button" className="chat-lead-cancel" onClick={closeLeadForm} disabled={leadSending}>
                  Cancel
                </button>
                <button type="submit" className="chat-lead-submit" disabled={leadSending}>
                  {leadSending ? <><Loader2 className="chat-spin" aria-hidden="true" /> Sending…</> : 'Send Details'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Error bar */}
        {error && !showLead && <p className="chat-error" role="alert">{error}</p>}

        {/* Input area */}
        <div className="chat-input-area">
          {!showLead && !leadSent && !isWelcome && (
            <button type="button" className="chat-callback-btn" onClick={() => { setLeadFallback(false); setShowLead(true); }}>
              Request a callback →
            </button>
          )}
          <form className="chat-input-form" onSubmit={(e) => { e.preventDefault(); void send(input); }}>
            <label className="chat-visually-hidden" htmlFor="chat-input-field">Type your message</label>
            <input
              id="chat-input-field"
              ref={inputRef}
              type="text"
              placeholder={isWelcome ? 'Ask me anything about Tekzura…' : 'Continue the conversation…'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sending}
              autoComplete="off"
            />
            <button type="submit" className="chat-send" aria-label="Send message" disabled={sending || !input.trim()}>
              {sending ? <Loader2 className="chat-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
            </button>
          </form>
          <p className="chat-disclaimer">Powered by Tekzura AI · Responses may be imprecise</p>
        </div>
      </div>
      )}
    </div>
  );

  return createPortal(widget, document.body);
}
