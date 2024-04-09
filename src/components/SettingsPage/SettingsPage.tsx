import { Tabs, TabsProps } from 'antd';
import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllProducts } from '../../store/reducers/ProductReducer/ProductActionCreater';
import { EmployeesTab } from './EmployeesTab/EmployeesTab';
import { ProductsTab } from './ProductsTab/ProductsTab';
import './settingspage.scss'

const SettingsPageInner: FC = () => {

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Сотрудники',
			children: <EmployeesTab/>,
		},
		{
			key: '2',
			label: 'Товары',
			children: <ProductsTab/>,
		},
		{
			key: '3',
			label: 'Прочее',
			children: 'Content of Tab Pane 3',
		},
	];

	const dispatch = useAppDispatch();

	useEffect(() => {

    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async () => {
      await dispatch(getAllProducts(''))
    }

    try {
      if (isMounted) {
        fetchData();
      }
    } catch (error) {
      console.log(error)
    }

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, []);
	

	return (
		<div className='settings-page'>
			<div className="settings-page__nav">
				<ul>
					<li>Сотрудники</li>
					<li>Товары</li>
				</ul>
			</div>
			<div className="settings-page__main">
				<Tabs 
					defaultActiveKey="1" 
					centered
					items={items} 
				// onChange={onChange} 
				/>
			</div>
		</div>
	)
}

export const SettingsPage = React.memo(SettingsPageInner)