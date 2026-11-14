export interface UpcomingSessionsDto {
  sessionDateTime: Date;
  participantName: string;
  courseName: string;
  studentName: string;
  zoomMeeting: string;
  instructorName: string;
  zoomMeetingId: number;
  uuid: string;
  studentId: string;
  instructorId: string;
  isCanceled: boolean;
}
