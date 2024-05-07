import { DELIVERY_METHODS } from "@prisma/client";

export type TBDTable<T> = { id: number } & T;

export type TUser = {
  names: string;
  last_names: string;
  email: string;
  phone_number: string;
  location: string;
  password: string;
};

export type TOrder = {
  id_user: number;
  date: Date;
  delivery_method: DELIVERY_METHODS; 
};