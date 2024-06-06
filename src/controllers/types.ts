//#region Business

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
//#endregion
