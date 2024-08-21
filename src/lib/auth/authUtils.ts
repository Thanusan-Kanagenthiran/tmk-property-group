import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@/constants/Users";

const secret = process.env.AUTH_SECRET;

const getAuthToken = async (req: NextRequest) => {
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

const isAdmin = async (req: NextRequest) => {
  const token = await getAuthToken(req);
  return token.role === UserRole.ADMIN;
};

const isPropertyOwner = async (req: NextRequest) => {
  const token = await getAuthToken(req);
  return token.role === UserRole.PROPERTY_OWNER;
};

const isUser = async (req: NextRequest) => {
  const token = await getAuthToken(req);
  return token.role === UserRole.USER;
};

const getUserId = async (req: NextRequest) => {
  const token = await getAuthToken(req);
  return token.sub;
};

export const authUtils = { isAdmin, isPropertyOwner, isUser, getUserId };
