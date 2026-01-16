export interface SessionDto {
  startTime: Date;
  courseId: string | null;
  instructorId: string;
  studentId: string;
  joiningTime: Date;
  status: AttendanceStatus;
  coursePricePerHoure: number | null;
  courseName: string | null;
}

export enum AttendanceStatus {
  Attend = 1,
  AbsentStudent = 2,
  AbsentInstructor = 3,
  CancelledByInstructor = 4,
  CancelledByStudent = 5,
  Late,
}
