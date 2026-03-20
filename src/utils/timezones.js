/**
 * All IANA time zones formatted as "Region/City (UTC±HH:MM)".
 * Uses Intl.supportedValuesOf('timeZone') for comprehensive coverage.
 */
function getTimezoneOffset(tz) {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'longOffset'
    })
    const parts = formatter.formatToParts(new Date())
    const tzPart = parts.find((p) => p.type === 'timeZoneName')?.value || ''
    // Convert "GMT-05:00" to "UTC-05:00" for consistency with screenshot
    return tzPart.replace(/^GMT/, 'UTC')
  } catch {
    return 'UTC+00:00'
  }
}

let cachedList = null

export function getAllTimeZones() {
  if (cachedList) return cachedList
  const ids = Intl.supportedValuesOf('timeZone')
  cachedList = ids
    .map((id) => ({
      id,
      label: `${id} (${getTimezoneOffset(id)})`
    }))
    .sort((a, b) => {
      // Sort by UTC offset (e.g. UTC-12:00 first, UTC+14:00 last)
      const offsetA = parseOffset(a.label)
      const offsetB = parseOffset(b.label)
      return offsetA - offsetB
    })
  return cachedList
}

function parseOffset(label) {
  const m = label.match(/UTC([+-])(\d{1,2}):(\d{2})/)
  if (!m) return 0
  const sign = m[1] === '+' ? 1 : -1
  const hours = parseInt(m[2], 10)
  const mins = parseInt(m[3], 10)
  return sign * (hours * 60 + mins)
}

/** Map legacy friendly names to IANA identifiers */
export const LEGACY_TIMEZONE_MAP = {
  'Eastern Time Zone': 'America/New_York',
  'Pacific Time Zone': 'America/Los_Angeles',
  'Central Time Zone': 'America/Chicago',
  'Mountain Time Zone': 'America/Denver',
  'Alaska Time Zone': 'America/Anchorage',
  'Hawaii Time Zone': 'Pacific/Honolulu',
  'Central European Time': 'Europe/Paris'
}

export function toIANA(value) {
  if (!value) return 'America/New_York'
  return LEGACY_TIMEZONE_MAP[value] || value
}

export function formatTimezoneForDisplay(tz) {
  const list = getAllTimeZones()
  const entry = list.find((e) => e.id === tz)
  return entry ? entry.label : `${tz} (${getTimezoneOffset(tz)})`
}
