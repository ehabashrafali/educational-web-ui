import {
  InstructorAttendanceStatus,
  SessionDto,
  StudentAttendanceStatus,
} from "./session.dto";

export function getDeductedCancelledByInstructorSessionsCount(
  sessionsDto: SessionDto[],
): number {
  const cancelledCount: { [studentId: string]: number } = {};
  sessionsDto.forEach((session) => {
    if (
      session.studentSessionStatus ===
        StudentAttendanceStatus.CancelledByInstructor ||
      session.studentSessionStatus === StudentAttendanceStatus.Cancelled
    ) {
      if (!cancelledCount[session.studentId]) {
        cancelledCount[session.studentId] = 0;
      }
      cancelledCount[session.studentId]++;
    }
  });

  return (
    Object.values(cancelledCount).reduce((sum, count) => sum + count, 0) -
    Object.keys(cancelledCount).length
  );
}

export function getInstructorLateCount(sessions: SessionDto[]): number {
  return sessions.filter(
    (session) =>
      session.instructorSessionStatus === InstructorAttendanceStatus.Late,
  ).length;
}

export function getInstructorAbsentCount(sessions: SessionDto[]): number {
  return sessions.filter(
    (session) =>
      session.instructorSessionStatus === InstructorAttendanceStatus.Absent,
  ).length;
}

export function getInstructorAttendCount(sessions: SessionDto[]): number {
  return sessions.filter(
    (session) =>
      session.instructorSessionStatus === InstructorAttendanceStatus.Attend,
  ).length;
}
export function getInstructorCancelledCount(sessions: SessionDto[]): number {
  return sessions.filter(
    (session) =>
      session.instructorSessionStatus === InstructorAttendanceStatus.Cancelled,
  ).length;
}

export function getStudentAttendCount(sessions: SessionDto[]): number {
  return sessions.filter(
    (session) =>
      session.studentSessionStatus === StudentAttendanceStatus.Attend,
  ).length;
}

export function getStudentAbsentCount(sessions: SessionDto[]): number {
  return sessions.filter(
    (session) =>
      session.studentSessionStatus === StudentAttendanceStatus.Absent,
  ).length;
}
