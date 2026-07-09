import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import { generateToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";

export const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  const { password: _, ...safeUser } = user;

  const token = generateToken(user);

  return {
    token,
    user: safeUser,
  };
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const { password: _, ...safeUser } = user;

  const token = generateToken(user);

  return {
    token,
    user: safeUser,
  };
};
