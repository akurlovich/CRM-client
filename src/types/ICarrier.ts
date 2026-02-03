import { IComment } from "./IComment";
import { IContact } from "./IContact";
import { IDeal } from "./IDeal";
import { IUser } from "./IUser";

export interface ICarrier {
	_id: string,
	title: string,
	usersID: IUser[],
	description: string,
	contactID: IContact,
	dealsID: IDeal[],
	commentsID: IComment[],
}

export interface ICarrierNew {
  title: string,
  usersID: string,
  contactID: string,
}

export interface ICarriersResponse {
	count: number,
	carriers: ICarrier[],
}