import bcrypt from "bcryptjs";
import prisma from "../utils/prisma";
import { TUser } from "../utils/types";

export default class User {
  /**
   *
   * @param email
   * @param password
   */
  static async getByEmail(email: string) {
    return await prisma.users.findFirst({
      where: {
        email,
      },
    });
  }

  /**
   *
   * @param phone_number
   * @returns
   */
  static async getByPhoneNumber(phone_number: string) {
    return await prisma.users.findFirst({
      where: {
        phone_number,
      },
    });
  }

  /**
   *
   * @param user User information
   */
  static async create(user: TUser) {
    const { password, ..._data } = user;

    await prisma.users.create({
      data: {
        ..._data,
        password: bcrypt.hashSync(password),
      },
    });
  }
}
