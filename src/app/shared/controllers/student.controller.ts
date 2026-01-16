import { environment } from "environments/environment";

export const StudentController = {
  get student() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students/GetStudent`;
  },

  get UserStudentInfo() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students/GetStudentProfile`;
  },
  get CreateMonthlyReport() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students`;
  },
  get GetMonthlyReports() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students`;
  },
  get GetTimeTable() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students/time-table`;
  },
  get CreateSession() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students/join-session`;
  },
};
