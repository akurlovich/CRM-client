import React, { FC, useState } from 'react'
import { useAppSelector } from '../../../hooks/redux'
import { IUser } from '../../../types/IUser';
import './employeestab.scss'

const EmployeesTabInner: FC = () => {
	const { users } = useAppSelector(state => state.userReducer);
	const [showInfo, setShowInfo] = useState(false);
	const [selectedUser, setSelectedUser] = useState<IUser>({} as IUser);

	const userHandler = (user: IUser) => {
		setShowInfo(true);
		setSelectedUser(user)
	}
	return (
		<div className='employees-tab'>
			<div className="employees-tab__nav">
				<div className="employees-tab__nav__title">
					Все сотрудники:
				</div>
				<ul>
					{users.map(item => 
						<li 
							key={item._id}
							onClick={() => userHandler(item)}
							>
							{item.lastname + ' ' + item.firstname}
						</li>
					)}
				</ul>
			</div>
			{showInfo ? 
				<div className="employees-tab__main">
					{selectedUser.lastname + ' ' + selectedUser.firstname}
				</div>
				: 
				<div className="employees-tab__main">
					Выберите пользователя
				</div>
			}
		</div>
	)
}

export const EmployeesTab = React.memo(EmployeesTabInner)