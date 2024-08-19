import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@/constants/Users";

const secret = process.env.AUTH_SECRET;

export const getAuthToken = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret });
    if (!token?.sub) {
      throw new Error("Invalid token");
    }
    return token;
  } catch (error) {
    throw new Error("Failed to get token");
  }
};

export const isAdmin = async (req: NextRequest) => {
  const token = await getAuthToken(req);
  return token.role === UserRole.ADMIN;
};

export const isPropertyOwner = async (req: NextRequest) => {
  const token = await getAuthToken(req);
  return token.role === UserRole.PROPERTY_OWNER;
};

export const isUser = async (req: NextRequest) => {
  const token = await getAuthToken(req);
  return token.role === UserRole.USER;
};

export const getUserId = async (req: NextRequest) => {
  const token = await getAuthToken(req);
  return token.sub;
};
