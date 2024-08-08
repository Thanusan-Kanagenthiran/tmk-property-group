import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
		image?: string;
		phone?: string;

  }

  interface Session {
    user: User;
  }
}
