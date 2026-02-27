import { MonthlyReportDto } from "./monthly-report.dto";
import { WeeklyAppointmentDto } from "./weekly.appointment.dto";

export interface StudentDTO {
  fees: number;
  isActive: boolean;
  lastName: string | null;
  firstName: string;
  id: string;
  fullName: string;
  email: string;
  country: string;
  phoneNumber: string;
  zoomMeeting: string;
  age: number;
  monthlyReportDtos: MonthlyReportDto[];
  weeklyAppointments: WeeklyAppointmentDto[];
  zoomLink: string;
  instructorId: string;
}
