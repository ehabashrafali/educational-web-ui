import { environment } from "environments/environment";

const baseUrl = environment.Config?.crescentUrls?.baseUrl;
export const InstructorController = {
  get InstructorStudents() {
    return `${baseUrl}/api/instructors/GetInstructorStudents`;
  },
  get InstructorInfo() {
    return `${baseUrl}/api/instructors/GetInstructorProfile`;
  },
  get Instructors() {
    return `${baseUrl}/api/instructors`;
  },
  get Deactivate() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/instructors/deactivate`;
  },
  get CreateInstructor() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/instructors/create-instructor`;
  },
  get UpdateInstructor() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/instructors`;
  },
};
