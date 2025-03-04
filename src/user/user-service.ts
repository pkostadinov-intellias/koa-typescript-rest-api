import config from "../config/config";
import { Repository } from "../db/repository";
import bcrypt from "bcryptjs";
import { User } from "./user";

const userRepository = new Repository<User>("users");

export const getAllUsers = async () => {
  return userRepository.find();
};

export const getUserById = async (id: string) => {
  return userRepository.findById(id);
};

export const getUserByEmail = async (email: string) => {
  return userRepository.findByField("email", email);
};

export const createUser = async (user: User) => {
  if (await getUserByEmail(user.email)) {
    throw new Error(`User with email ${user.email} already created`);
  }

  if (!user.password) {
    throw new Error("Missing password");
  }

  const hashPasword = await bcrypt.hash(user.password, config.salt);

  const newUser = Object.assign({}, { ...user, password: hashPasword });

  const savedUser = await userRepository.create(newUser);

  const { password, ...serializedUser } = savedUser;

  return serializedUser;
};

export const updateUser = async (id: string, user: User) => {
  return userRepository.update(id, user);
};

export const deleteUser = async (id: string) => {
  return userRepository.delete(id);
};
