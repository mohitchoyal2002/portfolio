import { FormEvent, useState } from 'react'
import { FiCalendar, FiClock, FiMail, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { meetingStartUtc, todayInTimeZone } from '../utils/meetingTime'

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
const fieldClass = 'w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-blue-950 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100 disabled:opacity-60';
const labelClass = 'mb-2 block text-sm font-bold text-blue-950';

const ScheduleMeeting = () => {
  const [timeZone, setTimeZone] = useState('Asia/Kolkata');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

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
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError('We couldn’t confirm your request. Please try again or email Mohit directly using the Email link below.');
    } finally {
      window.clearTimeout(timer);
    }
  };

  return (
    <section id='meeting' aria-labelledby='meeting-title' className='scroll-mt-24 bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 px-4 py-16 font-nunito sm:px-6 lg:py-24'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-10 text-center'>
          <span className='mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-700'><FiCalendar aria-hidden='true' /> For recruiters & hiring teams</span>
          <h2 id='meeting-title' className='text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl'>Schedule a meeting</h2>
          <p className='mx-auto mt-4 max-w-xl text-lg text-slate-600'>Have a role in mind? Pick a preferred time for an introduction, interview, or hiring discussion.</p>
        </div>
        <div className='grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]'>
          <div className='rounded-3xl bg-blue-950 p-6 text-white shadow-xl sm:p-8'>
            <h3 className='text-2xl font-extrabold'>Let’s talk about the opportunity.</h3>
            <p className='mt-4 leading-relaxed text-blue-100'>I’m based in Indore, India. Choose your time zone and a time that works for you; I’ll reply by email to confirm availability and arrange the meeting.</p>
            <ul className='mt-8 space-y-6'>
              <li className='flex gap-4'><FiClock className='mt-1 shrink-0 text-sky-300' size={22} aria-hidden='true' /><div><p className='font-bold'>15–60 minute conversations</p><p className='mt-1 text-sm leading-relaxed text-blue-100'>Choose a duration for a quick introduction or a longer interview.</p></div></li>
              <li className='flex gap-4'><FiCalendar className='mt-1 shrink-0 text-sky-300' size={22} aria-hidden='true' /><div><p className='font-bold'>A preferred time, then confirmation</p><p className='mt-1 text-sm leading-relaxed text-blue-100'>Your request is pending until I confirm the slot by email.</p></div></li>
              <li className='flex gap-4'><FiMail className='mt-1 shrink-0 text-sky-300' size={22} aria-hidden='true' /><div><p className='font-bold'>A direct conversation</p><a href='mailto:mohitchoyal2002@gmail.com' className='mt-1 inline-block break-all text-sm text-sky-200 underline decoration-sky-300/50 underline-offset-4 hover:text-white'>mohitchoyal2002@gmail.com</a></div></li>
            </ul>
          </div>
          <div className='rounded-3xl border border-white bg-white p-6 shadow-xl shadow-blue-950/5 sm:p-8'>
            {status === 'success' ? (
              <div role='status' aria-live='polite' className='py-12 text-center'>
                <FiCheckCircle size={48} className='mx-auto text-emerald-600' aria-hidden='true' />
                <h3 className='mt-5 text-2xl font-extrabold text-blue-950'>Meeting request sent</h3>
                <p className='mt-3 leading-relaxed text-slate-600'>Your request has been received. Mohit will reply to your email to confirm the time and meeting details.</p>
                <button type='button' onClick={() => { setStatus('idle'); setTimeZone('Asia/Kolkata'); }} className='mt-6 rounded-full border border-sky-200 px-6 py-3 font-bold text-sky-700 hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600'>Send another request</button>
              </div>
            ) : (
              <form name='recruiter-meeting' method='POST' action='/__forms.html' data-netlify='true' netlify-honeypot='bot-field' onSubmit={handleSubmit} aria-label='Recruiter meeting request'>
                <input type='hidden' name='form-name' value='recruiter-meeting' />
                <input type='hidden' name='subject' value='New recruiter meeting request — Mohit Choyal Portfolio (%{submissionId})' />
                <input type='hidden' name='meeting_utc' value='' />
                <p hidden><label>Leave this field empty <input name='bot-field' tabIndex={-1} autoComplete='off' /></label></p>
                <fieldset disabled={status === 'sending'} className='min-w-0'>
                  <legend className='sr-only'>Your contact details and preferred meeting time</legend>
                  <div className='grid gap-5 sm:grid-cols-2'>
                    <div><label htmlFor='meeting-name' className={labelClass}>Your name <span aria-hidden='true'>*</span></label><input id='meeting-name' name='name' autoComplete='name' required maxLength={100} className={fieldClass} /></div>
                    <div><label htmlFor='meeting-email' className={labelClass}>Work email <span aria-hidden='true'>*</span></label><input id='meeting-email' name='email' type='email' autoComplete='email' required maxLength={254} className={fieldClass} /></div>
                    <div className='sm:col-span-2'><label htmlFor='meeting-company' className={labelClass}>Company <span className='font-normal text-slate-500'>(optional)</span></label><input id='meeting-company' name='company' autoComplete='organization' maxLength={150} className={fieldClass} /></div>
                    <div><label htmlFor='meeting-purpose' className={labelClass}>Meeting purpose</label><select id='meeting-purpose' name='meeting_type' defaultValue='Recruiter introduction' className={fieldClass}><option>Recruiter introduction</option><option>Technical interview</option><option>Hiring discussion</option><option>Other</option></select></div>
                    <div><label htmlFor='meeting-duration' className={labelClass}>Duration</label><select id='meeting-duration' name='duration' defaultValue='30 minutes' className={fieldClass}><option>15 minutes</option><option>30 minutes</option><option>45 minutes</option><option>60 minutes</option></select></div>
                    <div className='sm:col-span-2'><label htmlFor='meeting-timezone' className={labelClass}>Time zone</label><select id='meeting-timezone' name='timezone' value={timeZone} onChange={event => setTimeZone(event.target.value)} className={fieldClass}>{timeZones.map(([value, label]) => <option key={value} value={value}>{label} ({value})</option>)}</select></div>
                    <div><label htmlFor='meeting-date' className={labelClass}>Preferred date <span aria-hidden='true'>*</span></label><input id='meeting-date' name='date' type='date' required min={todayInTimeZone(timeZone)} max={String(new Date().getFullYear() + 1) + '-12-31'} className={fieldClass} /></div>
                    <div><label htmlFor='meeting-time' className={labelClass}>Preferred time <span aria-hidden='true'>*</span></label><input id='meeting-time' name='time' type='time' required step={900} aria-describedby='meeting-time-help' className={fieldClass} /></div>
                    <p id='meeting-time-help' className='-mt-2 text-sm text-slate-500 sm:col-span-2'>Date and time are in the selected time zone. Choose a time in 15-minute intervals.</p>
                    <div className='sm:col-span-2'><label htmlFor='meeting-link' className={labelClass}>Meeting link <span className='font-normal text-slate-500'>(optional)</span></label><input id='meeting-link' name='meeting_link' type='url' placeholder='https://meet.google.com/…' maxLength={500} className={fieldClass} /></div>
                    <div className='sm:col-span-2'><label htmlFor='meeting-notes' className={labelClass}>Role or meeting details <span className='font-normal text-slate-500'>(optional)</span></label><textarea id='meeting-notes' name='notes' rows={3} maxLength={1500} placeholder='Tell me about the role, team, or what you’d like to discuss.' className={fieldClass} /></div>
                  </div>
                  <label className='mt-5 flex items-start gap-3 text-sm leading-relaxed text-slate-600'><input type='checkbox' name='consent' value='Agreed to share meeting details with Mohit' required className='mt-1 h-4 w-4 shrink-0 accent-sky-600' /><span>I agree to share these details with Mohit so he can respond to this meeting request.</span></label>
                  {error && <p role='alert' className='mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700'>{error}</p>}
                  <button type='submit' className='mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-4 font-extrabold text-white shadow-lg shadow-sky-200 transition hover:from-sky-600 hover:to-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 disabled:cursor-wait disabled:opacity-70'>{status === 'sending' ? 'Sending request…' : 'Request a meeting'}<FiArrowRight aria-hidden='true' /></button>
                </fieldset>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleMeeting
