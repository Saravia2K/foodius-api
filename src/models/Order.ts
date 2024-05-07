import { Select } from "@prisma/client/runtime/library";
import prisma from "../utils/prisma";
import { TOrder, TUser } from "../utils/types";
import { STATUS_CODES } from "http";

export default class Orders {
    static async createOrder(orderdetail: TOrder){
        const data = orderdetail;

        await prisma.orders.create({
            data: {
                ...data, 
                state: "ACTIVE"
            }
        })
      
    }


    static async trackingOrder(id: number){
        return await prisma.orders.findFirst({
            where:{
                id
            }, select: {state: true}
        })
      
    }
}
