import { ICompaniesQuery } from "../../../types/ICompany";

export const queryForCarrierCard = (carrierID: string) : ICompaniesQuery => {
		return {
			query: 
				[
					{
						path: "usersID", 
					},
					{
						path: "contactID", 
						select: "address.main"
					},
					{
						path: "contactID", 
						select: "address.district"
					},
					{
						path: "contactID", 
						populate: { path: 'phonesID' }
					},
					{
						path: "contactID", 
						populate: { path: 'emailsID' }
					},
					{
						path: "commentsID", 
						populate: { path: 'userID' }
					},
					{
						path: "dealsID", 
						populate: { path: 'dealTitleID' }
					},
					{
						path: "dealsID", 
						populate: { path: 'userID' }
					},
				], 
			// page: 1,
			// sort: { [`${sortBy}`]: `${sortAscDecs ? 'asc' : 'desc'}`},
			// limit: 0,
			find: {'_id': carrierID},
		}
	};

	