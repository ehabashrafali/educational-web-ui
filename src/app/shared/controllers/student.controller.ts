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
  get Students() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students`;
  },
  get GetMonthlyReport() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students/monthly-report`;
  },
  get Deactivate() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students/deactivate`;
  },
  get Activate() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students/activate`;
  },
  get UpdateStudent() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students`;
  },
  get CreateStudent() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students/create-student`;
  },
  get Delete() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students/delete-student`;
  },
  get GetCurrentMonthlyReport() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students/monthly-report`;
  },
  get EditMonthlyReport() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/students/edit-report`;
  },
};
