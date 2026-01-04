import { MonthlyReportDto } from "./monthly-report.dto";
import { WeeklyAppointmentDto } from "./weekly.appointment.dto";

export interface StudentDTO {
  id: string;
  fullName: string;
  email: string;
  country: string;
  phoneNumber: string;
  ZoomMeeting: string;
  age: number;
  monthlyReportDtos: MonthlyReportDto[];
  weeklyAppointments: WeeklyAppointmentDto[];
}
