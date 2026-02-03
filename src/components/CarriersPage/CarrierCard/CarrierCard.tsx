import React, { useEffect, useState } from 'react'
import './carriercard.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { deleteCarrierByID, getCarrierByIDQuery, updateCarrierTitle } from '../../../store/reducers/CarrierReducer/CarrierActionCreaters';
import { queryForCarrierCard } from '../../../services/ClientServices/CarrierServices/queryForCarrierCard';
import { UserErrorWarning } from '../../UI/UserErrorWarning/UserErrorWarning';
import { Loader } from '../../UI/Loader/Loader';
import { IoNewspaper } from '@react-icons/all-files/io5/IoNewspaper';
import { IoCreateOutline } from '@react-icons/all-files/io5/IoCreateOutline';
import { IoStarOutline } from '@react-icons/all-files/io5/IoStarOutline';
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline';
import { InfoBlock } from '../../CompanyPage/CompanyCard/CompanyBlocks/InfoBlock/InfoBlock';
import { CommentsBlock } from '../../CompanyPage/CompanyCard/CompanyBlocks/CommentsBlock/CommentsBlock';
import { DealsBlock } from '../../CompanyPage/CompanyCard/CompanyBlocks/DealsBlock/DealsBlock';
import { ContactsBlock } from '../../CompanyPage/CompanyCard/CompanyBlocks/ContactsBlock/ContactsBlock';

const CarrierCardInner = () => {

	const { user } = useAppSelector(state => state.authReducer);
	const { carrier, error: errorCarrier, isLoading, carrierFirstUser } = useAppSelector(state => state.carrierReducer);

	const params = useParams();

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const [editTitle, setEditTitle] = useState(false);
	const [title, setTitle] = useState(carrier.title);

	const changeTitleHandler = async () => {
		// console.log(title)
		setEditTitle(false)
		await dispatch(updateCarrierTitle({carrierID: carrier._id, title: title}))
		await dispatch(getCarrierByIDQuery(queryForCarrierCard(carrier._id)));
	}

	const deleteCompanyHandler = async () => {
		if (window.confirm(`Удалить перевозчика ${carrier.title}?`)) {
			await dispatch(deleteCarrierByID(carrier._id))
//TODO  ---  обработать ошибку, если вдруг компания не удалилась
			navigate('/carriers')
		}
	};

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();
		const fetchData = async () => {
			if (params.id) {
				await dispatch(getCarrierByIDQuery(queryForCarrierCard(params.id)))
			}
		};
		
		try {
			if (isMounted) {
				// console.log('params.id', params.id)
				fetchData();
			}
		} catch (error) {
			console.log(error)
		}

		return () => {
			isMounted = false;
			controller.abort();
		}
	
	}, [])
	
	return (
		<>
			{errorCarrier ? <UserErrorWarning /> : null}
			{isLoading ? <Loader/> : 
				<section className="company-card">
					<header className="company-card__header">
						<div className="company-card__header__title">
							<div className="avatar">
								<IoNewspaper size={25}/>
							</div>
							<div className="title">
								{editTitle ? 
									<>
										<input 
											value={title}
											onChange={(e: React.FocusEvent<HTMLInputElement>) => setTitle(e.target.value)}
											type="text"
											autoFocus/>
										<button
											className='add-btn'
											onClick={changeTitleHandler}
											>
											Изменить
										</button>
										<button
											className='cansel-btn'
											onClick={() => setEditTitle(false)}>
											Отмена
										</button>
									</>
									: 
									<span>{carrier.title}</span>
								}
								
							</div>
							{editTitle ? null :
								<IoCreateOutline 
									onClick={() => setEditTitle(true)}
									style={{'cursor': 'pointer'}}
									size={20} color={'#3e425e'}/>
							}
							<IoStarOutline size={20} color={'#3e425e'}/>
							{/* <IoPricetagOutline size={20} color={'#3e425e'}/> */}
							{user.isAdmin ? 
								<IoTrashOutline
									onClick={deleteCompanyHandler}
									style={{'cursor': 'pointer'}}
									size={20} color={'#3e425e'}/>
								: null
							}
						</div>
						<div
							// onClick={() => console.log(companyItem)}
							className="company-card__header__links">
							<span className="active">Перевозчик</span>
						</div>
					</header>
					<div className="company-card__wrapper">
						<div className="left">
							<InfoBlock isCarrier={true}/>
							<CommentsBlock isCarrier={true}/>
						</div>	
						<div className="right">					
							<DealsBlock isCarrier={true}/>
							<ContactsBlock isCarrier={true}/>						
						</div>
					</div>
				</section>
			}
			{/* <div>CarrierCard</div>
			<div>{carrier.title}</div> */}
		</>
	)
}

export const CarrierCard = React.memo(CarrierCardInner);