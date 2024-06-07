import { ORDER_STATES } from "@prisma/client";

//#region Business
export type TRegisterBody = {
  name: string;
  email: string;
  phone_number: string;
  location: string;
  password: string;
};

export type TRegisterFiles = {
  logo: Express.Multer.File[];
  banner: Express.Multer.File[];
};
//#endregion

//#region Food
export type TUpdateAviabilityBody = {
  available: boolean;
};

export type TCreateFoodBody = {
  id_food_category: string;
  name: string;
  description: string;
  price: number;
  is_available: string;
};
//#endregion

//#region Orders
export type TCreateOrderBody = {
  id_user: number;
  plates: TCreateOrderPlate[];
};

export type TCreateOrderPlate = {
  id_food: number;
  price: number;
  quantity: number;
};

export type TUpdateStateBody = {
  state: Omit<ORDER_STATES, "CANCELED">;
};

export type TCancelOrderBody = {
  message: string;
};
//#endregion
