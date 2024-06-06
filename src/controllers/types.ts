//#region Business

import { ORDER_STATES } from "@prisma/client";

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
//#endregion
