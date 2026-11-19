import { normalizeAppointmentTime } from "./appointment-time";
import { WeeklyAppointmentDto } from "app/modules/models/weekly.appointment.dto";
import { DateTime } from "luxon";

export const dayMap: Record<string, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

export function convertWeeklyAppointmentToClients(
  appointment: WeeklyAppointmentDto,
  clientZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone,
): WeeklyAppointmentDto {
  const time = normalizeAppointmentTime(appointment.time);
  if (!time || !dayMap[appointment.day]) {
    return { ...appointment, time: "" };
  }
  const [hour, minute, second = 0] = time
    .split(":")
    .map(Number);
  const egyptDateTime = DateTime.now()
    .setZone("Africa/Cairo")
    .set({
      weekday: dayMap[appointment.day] as any,
      hour,
      minute,
      second,
      millisecond: 0,
    });

  const clientDateTime = egyptDateTime.setZone(clientZone);

  if (!clientDateTime.isValid) {
    return { ...appointment, time: "" };
  }

  return {
    day: clientDateTime.toFormat("cccc"),
    time: clientDateTime.toFormat(time.length === 8 ? "HH:mm:ss" : "HH:mm"),
    timeZone: clientZone,
  };
}
export function convertTo12HourFormat(time: string): string {
  const normalized = normalizeAppointmentTime(time);
  if (!normalized) return "-";
  const [hourStr, minute, second] = normalized.split(":");
  const hour = Number(hourStr);
  const ampm = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${minute}${second === undefined ? "" : `:${second}`} ${ampm}`;
}
