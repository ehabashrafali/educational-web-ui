export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
  role: Role;
  fees?: number;
}
export enum Role {
  Admin = "Admin",
  Instructor = "Instructor",
  Student = "Student",
  Supervisor = "Supervisor",
  Parent = "Parent",
}
