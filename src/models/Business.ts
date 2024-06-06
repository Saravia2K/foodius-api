import NoBusinessFound from "../errors/NoBusinessFound";
import prisma from "../utils/prisma";

export default class Business {
  /**
   *
   * @returns
   */
  static async getAll() {
    return await prisma.businesses.findMany({
      select: {
        name: true,
        banner: true,
        slug: true,
      },
    });
  }

  /**
   *
   * @param slug
   * @returns
   */
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

  static async infoForDashboard(id: number) {
    const bussinessPromise = prisma.businesses.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        location: true,
      },
    });

    const satisfiedPromise = prisma.orders.count({
      where: {
        OrdersDetails: {
          some: {
            Food: {
              FoodCategory: {
                id_business: id,
              },
            },
          },
          every: {
            Order: {
              OR: [{ state: "DELIVERED" }, { state: "FINISHED" }],
            },
          },
        },
      },
    });

    const [business, satisfied] = await Promise.all([
      bussinessPromise,
      satisfiedPromise,
    ]);

    if (business == null) throw new NoBusinessFound();

    return {
      ...business,
      satisfied,
    };
  }
}
