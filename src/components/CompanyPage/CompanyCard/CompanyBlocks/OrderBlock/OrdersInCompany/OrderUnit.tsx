import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { addItemProduct, clearItemsProduct, setOrderForEdit, setShowEditOrder, setShowNewOrder } from '../../../../../../store/reducers/OrderReducer/OrderSlice';
import { IOrder } from '../../../../../../types/IOrder';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  item: IOrder;
}

const OrderUnit: FC<IProps> = ({item}) => {
  // const { isShowEditOrder } = useAppSelector(state => state.orderReducer);
  const dispatch = useAppDispatch();
  const [createDate, setCreateDate] = useState('');

  const orderHandler = (item: IOrder) => {
    dispatch(clearItemsProduct());
    dispatch(setOrderForEdit(item));
    dispatch(setShowEditOrder(true));
    dispatch(setShowNewOrder(false));
    for (let data of item.orderItemID) {
      const newID = uuidv4();
      dispatch(addItemProduct({
        itemID: newID,
        productID: data.productID._id, 
        price: data.price, 
        count: data.count, 
        sum: data.sum,
        productTitle: data.productID.title,
        productDimension: data.productID.dimension,
        vatSum: 0,
        totalSum: 0,
      }))
    }
  }

  useEffect(() => {
    const today = new Date(item.createdAt); 
    // const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const months = [ 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря' ];
    // console.log(`Сегодня: ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}, ${days[today.getDay()]}`);
    setCreateDate(`${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`)
  }, [])
  

  return (
    <div 
      onClick={() => orderHandler(item)}
      className="orders-in-company__main__row units"
      >
      {/* <IoSquareOutline width={25}/> */}
      <span className='cell data count first'>{item.orderNumber}</span>
      <span className='cell data'>{item?.orderItemID[0]?.productID ? item.orderItemID?.[0].productID?.title : ''}</span>
      <span className='cell data total'>{`${item.totalSum} руб`}</span>
      <div className='cell data user tight'>
        <span>{`${item.usersID.firstname[0]}${item.usersID.lastname[0]}`}</span>
        <span>{`${item.usersID.firstname} ${item.usersID.lastname}`}</span>
      </div>
      <span className='cell data narrow'>{createDate}</span>
      
    </div>
  )
}

export default OrderUnit