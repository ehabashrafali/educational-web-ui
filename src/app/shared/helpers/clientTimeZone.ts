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
  const [hourPart, minutePart] = appointment.time.toString().split(".");

  const hour = Number(hourPart);
  const minute = minutePart ? Number(minutePart.padEnd(2, "0")) : 0;
  const egyptDateTime = DateTime.now()
    .setZone("Africa/Cairo")
    .set({
      weekday: dayMap[appointment.day] as any,
      hour,
      minute,
      second: 0,
      millisecond: 0,
    });

  const clientDateTime = egyptDateTime.setZone(clientZone);

  return {
    day: clientDateTime.toFormat("cccc"),
    time: clientDateTime.toFormat("HH:mm"),
    timeZone: clientZone,
  };
}
export function convertTo12HourFormat(time: string): string {
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute ?? "00"} ${ampm}`;
}
