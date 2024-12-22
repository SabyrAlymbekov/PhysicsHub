export interface UserSessionT {
  name: string;
  email: string;
  image: string | null;
  id: string;
  role: "ADMIN" | "TEAM" | "USER";
}