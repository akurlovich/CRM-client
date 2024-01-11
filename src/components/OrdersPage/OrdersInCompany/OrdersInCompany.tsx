import React, { FC, useState } from 'react';
import './ordersincompany.scss';
import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";
import { IoFilterOutline } from "@react-icons/all-files/io5/IoFilterOutline";
import { IoDuplicateOutline } from "@react-icons/all-files/io5/IoDuplicateOutline";
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";
// import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";

const OrdersInCompanyInner: FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  return (
    <>
      {/* <AddCompany isVisible={isModal} onClose={() => setIsModal(false)}/> */}
      <section className='orders-in-company'>
        <div className="orders-in-company__container">
          <div className="orders-in-company__header">
            <div className="orders-in-company__header__title">
              <div className="title">
                <span>Все сделки</span>
              </div>
              
            </div>
            <button 
              onClick={() => setIsModal(true)}
              className="orders-in-company__header__btn">
              <IoAddCircleOutline size={25}/>
            </button>
          </div>
          <div className="orders-in-company__main">
            <div className="orders-in-company__main__row first_row">
              <IoDuplicateOutline width={30}/>
              <span className='cell'><IoDocumentOutline width={50}/></span>
              <span className='cell'>Клиент</span>
              <span className='cell'>Сумма</span>
              <span className='cell'>Ответственный</span>
              <span className='cell'>Дата создания</span>
            </div>
            <div className="orders-in-company__main__row">
              <IoSquareOutline width={25}/>
              <span className='cell data count'>1478</span>
              <span className='cell data'>ОАО Петровичи</span>
              <span className='cell data total'>125 879,24 руб</span>
              <div className='cell data user'>
                <span>КА</span>
                <span>Курлович Артем</span>
              </div>
              <span className='cell data'>05 октябрь 2023г.</span>
              
            </div>
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

    </>
  )
}

export const OrdersInCompany = React.memo(OrdersInCompanyInner);