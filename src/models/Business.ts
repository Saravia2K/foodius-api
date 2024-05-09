import prisma from "../utils/prisma";

export default class Business {
  static async getAll() {
    return await prisma.businesses.findMany({
      select: {
        name: true,
        banner: true,
        slug: true,
      },
    });
  }

  static async infoBusiness(slug: string) {
    return await prisma.businesses.findFirst({
      where: { slug },
      include: {
        Schedules: true,
        FoodCategory: {
          select: {
            name: true,
            description: true,
            Food: true,
          },
        },
      },
    });
  }
}
