import { IoSquareOutline } from '@react-icons/all-files/io5/IoSquareOutline';
import React, { FC, useEffect, useState } from 'react'
import { IOrder } from '../../../../../../types/IOrder';

interface IProps {
  item: IOrder;
}

const OrderUnit: FC<IProps> = ({item}) => {
  const [createDate, setCreateDate] = useState('');

  useEffect(() => {
    const today = new Date(item.createdAt); 
    const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    // console.log(`Сегодня: ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}, ${days[today.getDay()]}`);
    setCreateDate(`${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`)
  }, [])
  

  return (
    <div className="orders-in-company__main__row">
      <IoSquareOutline width={25}/>
      <span className='cell data count'>{item.orderNumber}</span>
      <span className='cell data'>{item?.orderItemID[0]?.productID ? item.orderItemID?.[0].productID?.title : ''}</span>
      <span className='cell data total'>{`${item.totalSum} руб`}</span>
      <div className='cell data user'>
        <span>{`${item.usersID.firstname[0]}${item.usersID.lastname[0]}`}</span>
        <span>{`${item.usersID.firstname} ${item.usersID.lastname}`}</span>
      </div>
      <span className='cell data'>{createDate}</span>
      
    </div>
  )
}

export default OrderUnit