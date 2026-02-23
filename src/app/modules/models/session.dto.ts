export interface SessionDto {
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
}

export enum InstructorAttendanceStatus {
  Attend = 1,
  Absent = 2,
  Late = 3,
}

export enum SessionDuration {
  ThirtyMinutes = 30,
  FortyFiveMinutes = 45,
  SixtyMinutes = 60,
  SeventyFiveMinutes = 75,
  NinetyMinutes = 90,
}
