import prisma from "../utils/prisma";

export default class Schedules {


  static async getAllSchedules() {
    return await prisma.schedules.findMany();
  }


  /**
   *
   * @param id_business
   * @param day
   * @param from
   * @param to
   * @returns
   */
  static async createSchedule(id_business: number, day: string, from: Date, to: Date) {
    return await prisma.schedules.create({
        data:{
            id_business,
            day,
            from,
            to,
        },
    });
  }

  static async findScheduleByDay(id_business: number, day: string){
    return await prisma.schedules.findFirst({
        where:{
            id_business,
            day,
        }
    })
  }


  static async findSchedulesByBusinessId(id_business: number) {
    return await prisma.schedules.findMany({
      where: {
        id_business,
      },
    });
  }
  
  static async updateSchedule(id: number, day: string, from: Date, to: Date) {
    try {
      return await prisma.schedules.update({
        where: {
          id,
        },
        data: {
          day,
          from,
          to,
        },
      });
    } catch (error) {
      return error;
    }
  }

  static async deleteSchedule(id: number) {
    try {
        await prisma.schedules.delete({
            where:{
                id,
            }
        })
        return true;

    }catch(error){

        return false;
    }
  }



}






