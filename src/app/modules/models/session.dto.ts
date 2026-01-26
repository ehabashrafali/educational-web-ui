export interface SessionDto {
  date: Date;
  instructorId: string;
  studentId: string;
  studentSessionStatus: AttendanceStatus;
  instructorSessionStatus: AttendanceStatus;
}

export enum AttendanceStatus {
  Attend = 1,
  AbsentStudent = 2,
  AbsentInstructor = 3,
  CancelledByInstructor = 4,
  CancelledByStudent = 5,
  Late,
}
