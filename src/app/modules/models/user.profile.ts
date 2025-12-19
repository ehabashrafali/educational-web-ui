export interface UserProfile {
  id: string;
  name: string;
  email: string;
  roles: string[];
  sessionsTimes: Date[];
  country: string;
}
