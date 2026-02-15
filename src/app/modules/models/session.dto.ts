export interface SessionDto {
  date: Date;
  instructorId: string;
  studentId: string;
  studentName: string;
  instructorName: string;
  studentSessionStatus: AttendanceStatus;
  instructorSessionStatus: AttendanceStatus;
  duration: SessionDuration;
}

export enum AttendanceStatus {
  Attend = 1,
  AbsentStudent = 2,
  AbsentInstructor = 3,
  CancelledByInstructor = 4,
  CancelledByStudent = 5,
  StudentLate5Minutes = 6,
  StudentLate10Minutes = 7,
  InstructorLate5Minutes = 8,
  InstructorLate10Minutes = 9,
}

export enum SessionDuration {
  ThirtyMinutes = 30,
  FortyFiveMinutes = 45,
  SixtyMinutes = 60,
  SeventyFiveMinutes = 75,
  NinetyMinutes = 90,
}
