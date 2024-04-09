import React, { FC } from 'react'
import './employeestab.scss'

const EmployeesTabInner: FC = () => {
	return (
		<div className='employees-tab'>
			<div className="employees-tab__nav">
				<ul>
					<li>
						Иванов Пертовия Дерунчтик
					</li>
					<li>
						Шаповарович Импинуил Витольдович
					</li>
				</ul>
			</div>
			<div className="employees-tab__main">
				Сменить пароль
			</div>
		</div>
	)
}

export const EmployeesTab = React.memo(EmployeesTabInner)