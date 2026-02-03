import { ICarrierNew } from "../../../types/ICarrier";
import { IContactNew } from "../../../types/IContact";
import CarrierService from "../../../services/CarrierService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICompaniesQuery } from "../../../types/ICompany";

export const addCarrier = createAsyncThunk(
	'CARRIER/addCarrier',
	// async ({company, contact}: {company: ICompanyNew, contact: IContactNew}, {rejectWithValue}) => {
	async (data: {carrier: ICarrierNew, contact: IContactNew}, {rejectWithValue}) => {
		try {
			// const newContact = await (await ContactService.addContact(contact)).data;
			// console.log('new contact', newContact)
			// company.contact.contactID = newContact._id;
			// company.contact.district = contact.address.district;
			// console.log('first')
			// console.log('company from action', company)
			return await (await CarrierService.addCarrier(data)).data;
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);

export const getCarrierByID = createAsyncThunk(
	'CARRIER/getCarrierByID',
	async (carrierID: string, {rejectWithValue}) => {
		try {
			return await (await CarrierService.getCarrierByID(carrierID)).data;
			
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);

export const getAllCarriers = createAsyncThunk(
	'CARRIER/getAllCarriers',
	async (_, {rejectWithValue}) => {
		try {
			return await (await CarrierService.getAllCarriers()).data;
			
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);

export const getCarrierByIDQuery = createAsyncThunk(
	'CARRIER/getCarrierByIDQuery',
	async ( query: ICompaniesQuery, {rejectWithValue}) => {
		try {
			return await (await CarrierService.getCarrierByIDQuery(query)).data;
			
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);

export const getAllCarriersQuery = createAsyncThunk(
	'CARRIER/getAllCarriersQuery',
	async ( query: ICompaniesQuery, {rejectWithValue}) => {
		try {
			return await (await CarrierService.getAllCarriersQuery(query)).data;
			
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);

export const updateCarrierTitle = createAsyncThunk(
	'CARRIER/updateCarrierTitle',
	async ({carrierID, title}: {carrierID: string, title: string}, {rejectWithValue}) => {
		try {
			return await (await CarrierService.updateCarrierTitle(carrierID, title)).data;
			
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);

export const updateCarrierDescription = createAsyncThunk(
	'CARRIER/updateCarrierDescription',
	async ({carrierID, description}: {carrierID: string, description: string}, {rejectWithValue}) => {
		try {
			return await (await CarrierService.updateCarrierDescription(carrierID, description)).data;
			
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);

export const deleteCarrierByID = createAsyncThunk(
	'CARRIER/deleteCarrierByID',
	async (carrierID: string, {rejectWithValue}) => {
		try {
			return await (await CarrierService.deleteCarrierByID(carrierID)).data;
			
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);