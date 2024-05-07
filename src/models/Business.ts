import { Select } from "@prisma/client/runtime/library";
import prisma from "../utils/prisma";

export default class Business {
  static async getAll() {
    return await prisma.businesses.findMany({
      select: {
        name: true,
        logo: true,
        banner: true,
      },
    });
  }

  static async infoBusiness(id: number) {
    return await prisma.businesses.findFirst({
      where: { id },
      include: {
        Schedules: { select: { day: true, from: true, to: true } },
        FoodCategory: {
          include: {
            Food: { select: { name: true, price: true, img_url: true } },
          },
        },
      },
    });
  }
}
