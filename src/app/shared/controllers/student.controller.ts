import { environment } from "environments/environment";

const baseUrl = environment.Config?.crescentUrls?.baseUrl;
export const StudentController = {
  get student() {
    return `${baseUrl}/api/students/GetStudent`;
  },

  get UserStudentInfo() {
    return `${baseUrl}/api/students/GetStudentProfile`;
  },
};
