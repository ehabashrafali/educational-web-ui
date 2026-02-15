import { MonthlyReportDto } from "./monthly-report.dto";
import { WeeklyAppointmentDto } from "./weekly.appointment.dto";

export interface StudentDTO {
  fees: any;
  isActive: any;
  lastName: any;
  firstName: any;
  id: string;
  fullName: string;
  email: string;
  country: string;
  phoneNumber: string;
  zoomMeeting: string;
  age: number;
  monthlyReportDtos: MonthlyReportDto[];
  weeklyAppointments: WeeklyAppointmentDto[];
}
