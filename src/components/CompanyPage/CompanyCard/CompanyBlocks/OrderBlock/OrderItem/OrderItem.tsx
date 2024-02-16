import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { addItemProduct, removeItemProduct } from '../../../../../../store/reducers/OrderReducer/OrderSlice';
import { IProduct } from '../../../../../../types/IProduct'
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline";
import { IOrderItemNew } from '../../../../../../types/IOrderItem';
import numberWithSpaces from '../../../../../../services/ClientServices/numberWithSpaces';

interface IProps {
  item: IOrderItemNew;
  count: number;
}

//TODO ---  решить вопрос с нумерацией, особенно при удалении позиции

const OrderItem: FC<IProps> = ({item, count}) => {
  const dispatch = useAppDispatch();

  const [ countItem, setCountItem ] = useState(item.count ? item.count : '');
  const [ priceItem, setPriceItem ] = useState(item.price ? item.price : '');
  const [ totalItem, setTotalItem ] = useState('0');

  const deleteItemHandler = () => {
    dispatch(removeItemProduct(item))
  }

  //! ----   убрать возможно useEffect
  //!-----   добавить useDebuonse для ввода кол-ва и цены

  useEffect(() => {
    if (countItem && priceItem) {
      // dispatch(removeItemProduct({id: item._id, sum: 0}))
      const total = (+countItem * +priceItem).toFixed(2);
      setTotalItem((+total * 1.2).toFixed(2));
      // console.log((+total * 1.2).toFixed(2))
      // totalSum(+total);
      dispatch(addItemProduct({
        itemID: item.itemID,
        productID: item.productID, 
        price: +priceItem, 
        count: +countItem, 
        sum: +total,
        productTitle: item.productTitle,
        productDimension: item.productDimension,
        vatSum: +((+(+total * 1.2).toFixed(2)) - (+total)).toFixed(2),
        totalSum: +(+total * 1.2).toFixed(2),
      }))
    }
  }, [countItem, priceItem])
  

  return (
    <div className="add-order__main__row">
      <span className='cell data narrowest'>{count}</span>
      <span className='cell data'>{item.productTitle}</span>
      <span className='cell data narrow'>{item.productDimension}</span>
      <input 
        value={countItem}
        onChange={(e:React.FocusEvent<HTMLInputElement>) => setCountItem(e.target.value)}
        className='cell data narrow' 
        type="number" 
        name="count"/>
      <input 
        value={priceItem}
        onChange={(e:React.FocusEvent<HTMLInputElement>) => setPriceItem(e.target.value)}
        className='cell data tight' 
        type="number" 
        name="price"/>
      <span className='cell data medium'>{`${numberWithSpaces(+totalItem)} руб`}</span>
      <span 
        className='cell data narrow trash'>
        <IoTrashOutline 
          onClick={deleteItemHandler}
          style={{"cursor": "pointer"}}
          size={18}/>
      </span>
    </div>
  )
}

export default OrderItem