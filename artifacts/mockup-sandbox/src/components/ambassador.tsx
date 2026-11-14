'use client';

import { ArrowUp, ExternalLink, MessageSquare, RotateCcw, X } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { starterQuestions, type Source } from '@/data/knowledge-base';
import { MiniByteMark } from './mini-byte-mark';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  citations?: Source[];
  section?: string | null;
  disclosure?: string;
};

type ApiResponse = {
  answer?: string;
  citations?: Source[];
  section?: string | null;
  disclosure?: string;
  error?: string;
};

export function Ambassador() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;
    const nextMessages = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(nextMessages);
    setValue('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/__mockup/api/ambassador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.map(({ role, content }) => ({ role, content })) }),
      });
      const payload = (await response.json()) as ApiResponse;
      if (!response.ok || !payload.answer) throw new Error(payload.error || 'Mini Byte is unavailable right now.');
      setMessages((current) => [...current, {
        role: 'assistant',
        content: payload.answer!,
        citations: payload.citations,
        section: payload.section,
        disclosure: payload.disclosure,
      }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Mini Byte is unavailable right now.');
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void ask(value);
  }

  function reset() {
    setMessages([]);
    setError('');
    setValue('');
    inputRef.current?.focus();
  }

  return (
    <>
      <button className="ambassador-launch" type="button" onClick={() => setOpen(true)} aria-label="Open Mini Byte AI Ambassador" aria-expanded={open}>
        <MiniByteMark compact />
        <span><strong>Ask Mini Byte</strong><small>Grounded AI ambassador</small></span>
        <MessageSquare size={18} aria-hidden="true" />
      </button>

      {open && (
        <section className="ambassador-panel" role="dialog" aria-modal="true" aria-labelledby="ambassador-title">
          <header className="ambassador-header">
            <div className="ambassador-title-wrap">
              <MiniByteMark compact />
              <div>
                <div className="status-line"><span className="status-dot" /> Evidence ready</div>
                <h2 id="ambassador-title">Mini Byte <span>— AI Ambassador</span></h2>
              </div>
            </div>
            <div className="ambassador-actions">
              <button type="button" className="icon-button" onClick={reset} aria-label="Reset conversation" title="Reset conversation"><RotateCcw size={17} /></button>
              <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Close Mini Byte"><X size={19} /></button>
            </div>
          </header>

          <div className="privacy-note">AI assistant · Uses approved evidence only · This conversation is kept in memory and is not stored.</div>

          <div className="ambassador-messages" aria-live="polite">
            {messages.length === 0 && (
              <div className="ambassador-welcome">
                <p className="eyebrow">Recruiter briefing</p>
                <h3>Ask for evidence, not a sales pitch.</h3>
                <p>I can explain role fit, projects, evaluation methodology, and privacy work. Every factual answer is constrained to the approved source registry.</p>
                <div className="starter-list">
                  {starterQuestions.map((question) => (
                    <button key={question} type="button" onClick={() => void ask(question)}>{question}<ArrowUp size={14} aria-hidden="true" /></button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <article className={`chat-message chat-message--${message.role}`} key={`${message.role}-${index}`}>
                <span className="chat-label">{message.role === 'user' ? 'Recruiter' : 'Mini Byte'}</span>
                <p>{message.content}</p>
                {message.role === 'assistant' && (
                  <>
                    {message.citations && message.citations.length > 0 && (
                      <div className="chat-citations">
                        {message.citations.map((citation) => (
                          <a href={citation.url} target="_blank" rel="noreferrer" key={citation.id}>
                            {citation.id} <ExternalLink size={12} aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                    <div className="chat-meta">
                      {message.disclosure}
                      {message.section && <a href={message.section} onClick={() => setOpen(false)}>View section →</a>}
                    </div>
                  </>
                )}
              </article>
            ))}

            {loading && <div className="typing" role="status"><span /><span /><span /> Retrieving approved evidence…</div>}
            {error && <div className="chat-error" role="alert">{error} Your conversation remains only in this page’s memory.</div>}
            <div ref={endRef} />
          </div>

          <form className="ambassador-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="ambassador-input">Ask Mini Byte a recruiter question</label>
            <input ref={inputRef} id="ambassador-input" value={value} onChange={(event) => setValue(event.target.value)} maxLength={1000} placeholder="Ask about role fit, projects, reliability…" disabled={loading} />
            <button type="submit" disabled={loading || !value.trim()} aria-label="Send question"><ArrowUp size={19} /></button>
          </form>
        </section>
      )}
    </>
  );
}

