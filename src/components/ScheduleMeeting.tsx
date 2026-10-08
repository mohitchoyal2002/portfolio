import { FormEvent, useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiCheckCircle, FiMail } from 'react-icons/fi';
import { meetingStartUtc, todayInTimeZone } from '../utils/meetingTime';

const timeZones = [
  ['Asia/Kolkata', 'India — IST'],
  ['UTC', 'UTC'],
  ['America/New_York', 'US Eastern — New York'],
  ['America/Los_Angeles', 'US Pacific — Los Angeles'],
  ['Europe/London', 'United Kingdom — London'],
  ['Europe/Berlin', 'Central Europe — Berlin'],
  ['Asia/Dubai', 'UAE — Dubai'],
  ['Asia/Singapore', 'Singapore'],
  ['Australia/Sydney', 'Australia — Sydney'],
];
const fieldClass = 'meeting-field';
const labelClass = 'meeting-label';

const ScheduleMeeting = () => {
  const [timeZone, setTimeZone] = useState('Asia/Kolkata');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [requestedSlot, setRequestedSlot] = useState('');
  const success = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'success') success.current?.focus();
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setError('');
    let start: string;
    try {
      start = meetingStartUtc(String(data.get('date')), String(data.get('time')), timeZone);
      if (new Date(start).getTime() <= Date.now()) throw new Error('Please choose a time in the future.');
    } catch (cause) {
      setStatus('error');
      setError(cause instanceof Error ? cause.message : 'Please check your meeting time.');
      return;
    }
    data.set('meeting_utc', start);
    const body = new URLSearchParams();
    data.forEach((value, key) => body.append(key, String(value)));
    setStatus('sending');
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(), signal: controller.signal,
      });
      if (!response.ok) throw new Error('Submission failed');
      setRequestedSlot(new Date(start).toLocaleString('en-IN', { timeZone, day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) + ' · ' + timeZone + ' · ' + String(data.get('duration')));
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError('We couldn’t confirm your request. Please try again or email Mohit directly using the Email link.');
    } finally {
      window.clearTimeout(timer);
    }
  };

  return (
    <section id='meeting' aria-labelledby='meeting-title' className='section meeting-section'>
      <div className='shell meeting-layout'>
        <div className='meeting-intro'>
          <p className='eyebrow'><span className='section-number'>05</span>For recruiters & hiring teams</p>
          <h2 id='meeting-title'>A role in mind?<br />Let’s make time.</h2>
          <p>Schedule a meeting to talk about your team, the role, and where I can contribute. Choose a preferred time in your time zone.</p>
          <ol className='meeting-steps'>
            <li><span className='meeting-step-number' aria-hidden='true'>01</span><div><h3>Choose your conversation</h3><p>A quick 15-minute introduction or up to 60 minutes for a deeper discussion.</p></div></li>
            <li><span className='meeting-step-number' aria-hidden='true'>02</span><div><h3>Send a preferred time</h3><p>Your details reach me directly so we can arrange the meeting.</p></div></li>
            <li><span className='meeting-step-number' aria-hidden='true'>03</span><div><h3>I’ll confirm by email</h3><p>The time is a request and stays pending until I confirm availability.</p></div></li>
          </ol>
          <div className='meeting-direct'><p>Prefer to start with an email?</p><a href='mailto:mohitchoyal2002@gmail.com'><FiMail aria-hidden='true' />mohitchoyal2002@gmail.com</a></div>
        </div>
        <div className='meeting-panel'>
          {status === 'success' ? (
            <div ref={success} role='status' aria-live='polite' tabIndex={-1} className='meeting-success'>
              <FiCheckCircle aria-hidden='true' />
              <h3>Meeting request sent</h3>
              <p>Your request has been received. Mohit will reply to your email to confirm the time and meeting details.</p>
              <p className='requested-slot'><strong>Your preferred time</strong><span>{requestedSlot}</span></p>
              <button type='button' onClick={() => { setStatus('idle'); setTimeZone('Asia/Kolkata'); setRequestedSlot(''); }} className='button button-ink'>Send another request <FiArrowRight aria-hidden='true' /></button>
            </div>
          ) : (
            <form name='recruiter-meeting' method='POST' action='/__forms.html' data-netlify='true' netlify-honeypot='bot-field' onSubmit={handleSubmit} aria-label='Recruiter meeting request' aria-busy={status === 'sending'}>
              <div className='meeting-form-heading'><h3>Request a meeting</h3><span>* Required fields</span></div>
              <input type='hidden' name='form-name' value='recruiter-meeting' />
              <input type='hidden' name='subject' value='New recruiter meeting request — Mohit Choyal Portfolio (%{submissionId})' />
              <input type='hidden' name='meeting_utc' value='' />
              <p hidden><label>Leave this field empty <input name='bot-field' tabIndex={-1} autoComplete='off' /></label></p>
              <fieldset disabled={status === 'sending'} className='min-w-0'>
                <legend className='sr-only'>Your contact details and preferred meeting time</legend>
                <div className='meeting-fields'>
                  <div><label htmlFor='meeting-name' className={labelClass}>Your name <span aria-hidden='true'>*</span></label><input id='meeting-name' name='name' autoComplete='name' required maxLength={100} className={fieldClass} /></div>
                  <div><label htmlFor='meeting-email' className={labelClass}>Work email <span aria-hidden='true'>*</span></label><input id='meeting-email' name='email' type='email' autoComplete='email' required maxLength={254} className={fieldClass} /></div>
                  <div className='field-wide'><label htmlFor='meeting-company' className={labelClass}>Company <span className='optional'>(optional)</span></label><input id='meeting-company' name='company' autoComplete='organization' maxLength={150} className={fieldClass} /></div>
                  <div><label htmlFor='meeting-purpose' className={labelClass}>Meeting purpose</label><select id='meeting-purpose' name='meeting_type' defaultValue='Recruiter introduction' className={fieldClass}><option>Recruiter introduction</option><option>Technical interview</option><option>Hiring discussion</option><option>Other</option></select></div>
                  <div><label htmlFor='meeting-duration' className={labelClass}>Duration</label><select id='meeting-duration' name='duration' defaultValue='30 minutes' className={fieldClass}><option>15 minutes</option><option>30 minutes</option><option>45 minutes</option><option>60 minutes</option></select></div>
                  <div className='field-wide'><label htmlFor='meeting-timezone' className={labelClass}>Time zone</label><select id='meeting-timezone' name='timezone' value={timeZone} onChange={event => setTimeZone(event.target.value)} className={fieldClass}>{timeZones.map(([value, label]) => <option key={value} value={value}>{label} ({value})</option>)}</select></div>
                  <div><label htmlFor='meeting-date' className={labelClass}>Preferred date <span aria-hidden='true'>*</span></label><input id='meeting-date' name='date' type='date' required min={todayInTimeZone(timeZone)} max={String(new Date().getFullYear() + 1) + '-12-31'} className={fieldClass} /></div>
                  <div><label htmlFor='meeting-time' className={labelClass}>Preferred time <span aria-hidden='true'>*</span></label><input id='meeting-time' name='time' type='time' required step={900} aria-describedby='meeting-time-help' className={fieldClass} /></div>
                  <p id='meeting-time-help' className='meeting-help'>Date and time use the selected time zone. Choose a time in 15-minute intervals.</p>
                </div>
                <details className='meeting-optional'>
                  <summary>Add role details or a meeting link <span>(optional)</span></summary>
                  <div className='meeting-fields'>
                    <div className='field-wide'><label htmlFor='meeting-link' className={labelClass}>Meeting link</label><input id='meeting-link' name='meeting_link' type='url' placeholder='https://meet.google.com/…' maxLength={500} className={fieldClass} /></div>
                    <div className='field-wide'><label htmlFor='meeting-notes' className={labelClass}>Role or meeting details</label><textarea id='meeting-notes' name='notes' rows={3} maxLength={1500} placeholder='Tell me about the role, team, or what you’d like to discuss.' className={fieldClass} /></div>
                  </div>
                </details>
                <label className='meeting-consent'><input type='checkbox' name='consent' value='Agreed to share meeting details with Mohit' required /><span>I agree to share these details with Mohit so he can respond to this meeting request.</span></label>
                {error && <p role='alert' className='meeting-error'>{error}</p>}
                <button type='submit' className='button button-ink meeting-submit'>{status === 'sending' ? 'Sending request…' : 'Request a meeting'}<FiArrowRight aria-hidden='true' /></button>
                <p className='sr-only' role='status'>{status === 'sending' ? 'Sending your meeting request.' : ''}</p>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScheduleMeeting;
