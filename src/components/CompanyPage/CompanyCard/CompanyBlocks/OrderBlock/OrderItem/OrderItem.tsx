import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { addItemProduct, removeItemProduct } from '../../../../../../store/reducers/OrderReducer/OrderSlice';
import { IProduct } from '../../../../../../types/IProduct'

interface IProps {
  item: IProduct;
  count: number;
  totalSum: (sum: number) => void;
}

//TODO ---  решить вопрос с нумерацией, особенно при удалении позиции

const OrderItem: FC<IProps> = ({item, count, totalSum}) => {
  const dispatch = useAppDispatch();

  const [ countItem, setCountItem ] = useState('');
  const [ priceItem, setPriceItem ] = useState('');
  const [ totalItem, setTotalItem ] = useState('0');

  // const countHandler = (item: string) => {
  //   setCountItem(item);
  // }

  //! ----   убрать возможно useEffect
  //!-----   добавить useDebuonse для ввода кол-ва и цены

  useEffect(() => {
    if (countItem && priceItem) {
      // dispatch(removeItemProduct({id: item._id, sum: 0}))
      const total = (+countItem * +priceItem).toFixed(2);
      setTotalItem((+total * 1.2).toFixed(2));
      console.log(total)
      // totalSum(+total);
      dispatch(addItemProduct({
        productID: item._id, 
        price: +priceItem, 
        count: +countItem, 
        sum: +total,
        productTitle: item.title,
        productDimension: item.dimension,
        vatSum: +((+(+total * 1.2).toFixed(2)) - (+total)).toFixed(2),
        totalSum: +(+total * 1.2).toFixed(2),
      }))
    }
  }, [countItem, priceItem])
  

  return (
    <div className="add-order__main__row">
      <span className='cell data narrowest'>{count}</span>
      <span className='cell data'>{item.title}</span>
      <span className='cell data narrow'>{item.dimension}</span>
      <input 
        onChange={(e:React.FocusEvent<HTMLInputElement>) => setCountItem(e.target.value)}
        className='cell data narrow' 
        type="number" 
        name="count"/>
      <input 
        onChange={(e:React.FocusEvent<HTMLInputElement>) => setPriceItem(e.target.value)}
        className='cell data tight' 
        type="number" 
        name="price"/>
      <span className='cell data'>{`${totalItem} руб`}</span>
    </div>
  )
}

export default OrderItem