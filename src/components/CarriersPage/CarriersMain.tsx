import React, { useEffect, useState } from 'react'
import './carriersmain.scss'
import { AddCompany } from '../CompanyPage/AddCompany/AddCompany';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllCarriers, getAllCarriersQuery } from '../../store/reducers/CarrierReducer/CarrierActionCreaters';
import { ICompaniesQuery } from '../../types/ICompany';
import { useNavigate } from 'react-router-dom';
import { queryForAllCarriesMain } from '../../services/ClientServices/CarrierServices/queryForAllCarriesMain';

const CarriersMainInner = () => {
	const { user } = useAppSelector(state => state.authReducer);
	const { carriers } = useAppSelector(state => state.carrierReducer);
	const [showAddCompany, setShowAddCompany] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [sortAscDecs, setSortAscDecs] = useState(false);
	const [sortBy, setSortBy] = useState('createdAt');
	const [currentPage, setCurrentPage] = useState<number>(1);

	// const users = [
	// 	{company: 'IP Petrov', name: 'ivanov', phone: '375896542', adress: 'Brestskaia', district: 'Pinskaia'},
	// 	{company: 'OOO Pashkevich', name: 'stepan', phone: '37544896542', adress: 'Minskaia', district: 'Nesvizhski'},
	// 	{company: 'OOO Pashkevich Станислав Викторович', name: 'stepan', phone: '37544896542', adress: 'Minskaia', district: 'Nesvizhski'}
	// ];

	// const foundQuery = (sortBy: string, sortAscDecs: boolean, currentPage: number, userIsAdmin: boolean, userID: string) : ICompaniesQuery => {
	// 	return {
	// 		query: 
	// 			[
	// 				{
	// 					path: "usersID", 
	// 				},
	// 				{
	// 					path: "contactID", 
	// 					select: "address.main"
	// 				},
	// 				{
	// 					path: "contactID", 
	// 					select: "address.district"
	// 				},
	// 				{
	// 					path: "contactID", 
	// 					populate: { path: 'phonesID' }
	// 				},
	// 				{
	// 					path: "contactID", 
	// 					populate: { path: 'emailsID' }
	// 				},
	// 				{
	// 					path: "commentsID", 
	// 					populate: { path: 'userID' }
	// 				},
	// 				{
	// 					path: "dealsID", 
	// 					populate: { path: 'dealTitleID' }
	// 				},
	// 				{
	// 					path: "dealsID", 
	// 					populate: { path: 'userID' }
	// 				},
	// 			], 
	// 		page: 1,
	// 		sort: { [`${sortBy}`]: `${sortAscDecs ? 'asc' : 'desc'}`},
	// 		limit: 50 * currentPage,
	// 		find: userIsAdmin ? {} : { usersID: userID },
	// 	}
	// };

	const onClickHandler = async (id: string) => {
		navigate(`/carriers/${id}`)
	}

	useEffect(() => {
		const fetchData = async () => {
			// await dispatch(getAllCarriers())
			await dispatch(getAllCarriersQuery(queryForAllCarriesMain(sortBy, sortAscDecs, currentPage, user.isAdmin, user.id)))
		}
		try {
			fetchData();
		} catch (error) {
			 console.log(error)
		}
	}, [])

	return (
		<>
			<AddCompany 
				isVisible={showAddCompany} 
				onClose={() => setShowAddCompany(false)} 
				isCarrier={true}
			/>
			<section className='carriersmain'>
				<header className='carriersmain__header'>
					{/* <h2>Перевозчики</h2> */}
					<button 
						onClick={() => setShowAddCompany(true)}
						className="company__header__btn">
						Добавить перевозчика
					</button>
					
				</header>
				<main className='carriersmain__wrapper'>
					<table className='carriersmain__table'>
						{/* <caption>Список перевозчиков</caption> */}
						<thead>
							<tr>
								<th>Название</th>
								<th>Описание</th>
								<th>Контактное лицо</th>
								<th>Телефон</th>
								<th>Область</th>
								<th>Район</th>
							</tr>
						</thead>
						<tbody>
							{carriers.map(carrier => (
								<tr 
									className='carriersmain__table__row'
									onClick={() => onClickHandler(carrier._id)}
									key={carrier._id}>
									<td>{carrier.title}</td>
									<td>{carrier.description}</td>
									<td>{carrier.contactID.phonesID[0].description}</td>
									<td>{carrier.contactID.phonesID[0].number}</td>
									<td>{carrier.contactID.address.main}</td>
									<td>{carrier.contactID.address.district}</td>
								</tr>
							))}
						</tbody>
    			</table>
				</main>
			</section>
		</>
	)
}

export const CarriersMain = React.memo(CarriersMainInner)