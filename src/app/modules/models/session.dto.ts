export interface SessionDto {
  id: string;
  date: Date;
  instructorId: string;
  studentId: string;
  studentName: string;
  instructorName: string;
  studentSessionStatus: StudentAttendanceStatus;
  instructorSessionStatus: InstructorAttendanceStatus;
  duration: SessionDuration;
}

export enum StudentAttendanceStatus {
  Attend = 1,
  Absent = 2,
  Cancelled = 3,
  CancelledByInstructor = 4,
}

export enum InstructorAttendanceStatus {
  Attend = 1,
  Absent = 2,
  Late = 3,
  Cancelled = 4,
}

export enum SessionDuration {
  ZeroMinutes = 0,
  ThirtyMinutes = 30,
  FortyFiveMinutes = 45,
  SixtyMinutes = 60,
  SeventyFiveMinutes = 75,
  NinetyMinutes = 90,
}
