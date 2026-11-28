import { StudentDTO } from "./student.dto";

export interface ParentDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  children: StudentDTO[];
}

export interface CreateParentDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string | null;
  studentIds: string[];
}
