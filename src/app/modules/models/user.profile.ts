import { WeeklyAppointmentDto } from "./weekly.appointment.dto";

export interface UserProfile {
  id: string;
  firstName: string;
  email: string;
  sessionsTimes: Date[];
  country: string;
  fullName: string;
  isActive: boolean;
  age: number;
  weeklyAppointments: WeeklyAppointmentDto[];
}
