import prisma from "../utils/prisma";

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
}
