import React, { FC, useEffect, useState } from 'react';
import './ordersincompany.scss';
import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";
import { IoFilterOutline } from "@react-icons/all-files/io5/IoFilterOutline";
import { IoDuplicateOutline } from "@react-icons/all-files/io5/IoDuplicateOutline";
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";
import { useAppSelector } from '../../../../../../hooks/redux';
import { IOrder } from '../../../../../../types/IOrder';
import { OrderUnit } from './OrderUnit';
// import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";

interface IProps {
  showAddOrder: () => void;
}

const OrdersInCompanyInner: FC<IProps> = ({showAddOrder}) => {
  const { companyOrders } = useAppSelector(state => state.companyReducer);

  const orderHandler = (item: IOrder) => {

  }
  // const [isModal, setIsModal] = useState<boolean>(false);
  // const today = new Date('2024-01-29T11:36:39.685Z'); 
  // const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  // const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
  // "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  // console.log(`Сегодня: ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}, ${days[today.getDay()]}`);

  return (
    <>
      {/* <AddCompany isVisible={isModal} onClose={() => setIsModal(false)}/> */}
      {companyOrders.length ? 
        <section className='orders-in-company'>
          <div className="orders-in-company__container">
            <div className="orders-in-company__header">
              <div className="orders-in-company__header__title">
                <div className="title">
                  <span>Все сделки</span>
                </div>
                
              </div>
              <button 
                onClick={showAddOrder}
                className="orders-in-company__header__btn">
                <IoAddCircleOutline size={25}/>
              </button>
            </div>
            <div className="orders-in-company__main">
              <div className="orders-in-company__main__row first_row">
                {/* <IoDuplicateOutline width={30}/> */}
                <span className='cell first'><IoDocumentOutline width={30}/></span>
                <span className='cell'>Заказ</span>
                <span className='cell total'>Сумма</span>
                <span className='cell tight'>Ответственный</span>
                <span className='cell narrow'>Дата создания</span>
              </div>

              {companyOrders.length ? 
                companyOrders.map(item => 
                  <OrderUnit 
                    key={item._id}
                    item={item}/>
                                  
                ) : null
              }

              {/* <div className="orders__main__row">
                <IoSquareOutline width={25}/>
                <span className='cell data'>ОАО Строительный трест номер 212 Дрогичин</span>
                <div className='cell data user'>
                  <span>ВА</span>
                  <span>Васьков Евгений</span>
                </div>
                <span className='cell data'>05 сентября 2023г.</span>
                <span className='cell data'>31 мая 2024г.</span>
                <span className='cell data'>Малоритский</span>
              </div> */}
              <div className="orders-in-company__main__items">

              </div>
            </div>
          </div>
        </section>
        : null
      }

    </>
  )
}

export const OrdersInCompany = React.memo(OrdersInCompanyInner);