import { ORDER_STATES } from "@prisma/client";
import bcrypt from "bcryptjs";
import NoBusinessFound from "../errors/NoBusinessFound";
import prisma, { prismaExclude } from "../utils/prisma";
import formatName from "../utils/formatName";
import { TRegisterBody } from "../controllers/types";
import slugify from "../utils/slugify";

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

  /**
   *
   * @param id
   * @returns
   */
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

  /**
   *
   * @param businessId
   * @returns
   */
  static async getOrders(businessId: number) {
    const ordersDetails = await prisma.ordersDetails.findMany({
      where: {
        Food: {
          FoodCategory: {
            id_business: businessId,
          },
        },
      },
      select: {
        price: true,
        quantity: true,
        Food: {
          select: {
            name: true,
          },
        },
        Order: {
          select: {
            id: true,
            state: true,
            date: true,
            User: {
              select: {
                names: true,
                last_names: true,
              },
            },
          },
        },
      },
    });

    type TOrder = Record<
      number,
      {
        state: ORDER_STATES;
        datetime: Date;
        client: string;
        total: number;
        details: {
          name: string;
          price: number;
          amount: number;
        }[];
      }
    >;

    const orders: TOrder = {};
    for (const o of ordersDetails) {
      const { Order, price, quantity, Food } = o;
      const { id, date, state, User } = Order;

      if (orders[id] == undefined) {
        const { names, last_names } = User;
        orders[id] = {
          client: formatName(`${names} ${last_names}`),
          datetime: date!,
          state,
          total: 0,
          details: [],
        };
      }

      const { name } = Food;
      const priceNumber = price.toNumber();
      orders[id].total += priceNumber * quantity;
      orders[id].details.push({
        name,
        amount: quantity,
        price: priceNumber,
      });
    }

    return orders;
  }

  /**
   *
   * @param business
   */
  static async createBusiness(business: TCreateBusinessParam) {
    const { password, ...businessInfo } = business;
    return await prisma.businesses.create({
      data: {
        ...businessInfo,
        password: bcrypt.hashSync(password),
        slug: slugify(business.name),
      },
      select: prismaExclude("Businesses", ["password"]),
    });
  }
}

type TCreateBusinessParam = TRegisterBody & { logo: string; banner: string };
