import { environment } from "environments/environment";

const baseUrl = environment.Config?.crescentUrls?.baseUrl;
export const InstructorController = {
  get InstructorStudents() {
    return `${baseUrl}/api/instructors/GetInstructorStudents`;
  },
  get InstructorInfo() {
    return `${baseUrl}/api/instructors/GetInstructorInfo`;
  },
};
