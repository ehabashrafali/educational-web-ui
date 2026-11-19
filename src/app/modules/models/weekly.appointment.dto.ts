export interface WeeklyAppointmentDto {
  day: string;
  /** 24-hour clock time: HH:mm or HH:mm:ss. */
  time: string;
  timeZone: string;
}
