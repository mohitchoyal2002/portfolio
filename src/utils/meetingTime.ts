const formatter = (timeZone: string) => new Intl.DateTimeFormat('en-CA', {
  timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});

const partsAt = (date: Date, timeZone: string) => Object.fromEntries(
  formatter(timeZone).formatToParts(date).map(part => [part.type, part.value]),
);

export const todayInTimeZone = (timeZone: string, now = new Date()) => {
  const parts = partsAt(now, timeZone);
  return `${parts.year}-${parts.month}-${parts.day}`;
};

export const meetingStartUtc = (date: string, time: string, timeZone: string): string => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    throw new Error('Please choose a date and time.');
  }
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const nominal = Date.UTC(year, month - 1, day, hour, minute);
  const check = new Date(nominal);
  if (check.toISOString().slice(0, 16) !== `${date}T${time}`) {
    throw new Error('Please choose a valid date and time.');
  }

  // Check nearby offsets so daylight-saving changes cannot silently move a booking.
  const offsets = new Set<number>();
  for (const hours of [-36, 0, 36]) {
    const probe = nominal + hours * 60 * 60 * 1000;
    const parts = partsAt(new Date(probe), timeZone);
    const local = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute));
    offsets.add(local - probe);
  }
  const candidates = [...offsets].map(offset => new Date(nominal - offset)).filter(candidate => {
    const parts = partsAt(candidate, timeZone);
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}` === `${date}T${time}`;
  });
  if (candidates.length === 0) {
    throw new Error('This time is unavailable because the clocks change that day. Please choose another time.');
  }
  if (candidates.length > 1) {
    throw new Error('This time occurs twice when the clocks change. Please choose another time.');
  }
  return candidates[0].toISOString();
};
