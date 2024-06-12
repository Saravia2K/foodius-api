import prisma from "../utils/prisma";

export default class RegisterToken {
  /**
   *
   * @returns
   */
  static async generateToken() {
    const registerToken = await prisma.registerTokens.create({
      data: {},
    });
    return registerToken.token;
  }

  /**
   *
   * @param token
   * @returns
   */
  static async isValidToken(token: string) {
    const registerToken = await prisma.registerTokens.findFirstOrThrow({
      where: {
        token,
      },
    });

    const createdAt = new Date(
      new Date(registerToken.createdAt!).setHours(23, 59, 59, 0)
    );
    const limitDate = new Date(createdAt.getTime()).setDate(
      createdAt.getDate() + 5
    );
    const today = new Date().setHours(23, 59, 59, 0);
    const isInOverlimit = limitDate < today;

    return !isInOverlimit && !registerToken.invalid;
  }

  /**
   *
   * @param token
   */
  static async invalidateToken(token: string) {
    await prisma.registerTokens.update({
      where: {
        token,
      },
      data: {
        invalid: true,
      },
    });
  }
}
