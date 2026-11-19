// Time-only values stay strings in JSON; do not attach a date or timezone.
export const APPOINTMENT_TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;

/** Normalize colon-separated clock times, including an unpadded stored hour. */
export function normalizeAppointmentTime(value: string | null | undefined): string {
  const time = value?.trim() ?? "";
  const match = /^(\d{1,2}):([0-5]\d)(?::([0-5]\d))?$/.exec(time);
  if (!match) return "";
  const normalized = `${match[1].padStart(2, "0")}:${match[2]}${match[3] === undefined ? "" : `:${match[3]}`}`;
  return APPOINTMENT_TIME_PATTERN.test(normalized) ? normalized : "";
}
