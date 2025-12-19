export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
  roles: Role[];
}
export enum Role {
  Admin = "Admin",
  Instructor = "Instructor",
  Student = "Student",
  Supervisor = "Supervisor",
  Parent = "Parent",
}
