import { StudentAttendanceStatus } from "./session.dto";

export interface UpcomingSessionsDto {
  sessionDateTime: string;
  studentName: string;
  zoomMeeting: string;
  instructorName: string;
  zoomMeetingId: number;
  uuid: string;
  studentId: string;
  instructorId: string;
  canceled: StudentAttendanceStatus | null;
}
