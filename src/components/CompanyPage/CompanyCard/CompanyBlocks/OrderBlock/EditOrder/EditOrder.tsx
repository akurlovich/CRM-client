import React, { FC, useEffect, useState } from 'react';
import './editorder.scss';
import { IoDuplicateOutline } from "@react-icons/all-files/io5/IoDuplicateOutline";
import { AddProduct } from '../AddProduct/AddProduct';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { getAllProducts } from '../../../../../../store/reducers/ProductReducer/ProducrActionCreater';
import { IProduct } from '../../../../../../types/IProduct';
import OrderItem from '../OrderItem/OrderItem';
import { useDebounce } from '../../../../../../hooks/useDebounce';
import { productsClearArray } from '../../../../../../store/reducers/ProductReducer/ProductSlice';
import { IOrderNewWithItems, IOrderUpdateOrderItems } from '../../../../../../types/IOrder';
import { addOrder, updateOrderItemsByOrderID } from '../../../../../../store/reducers/OrderReducer/OrderActionCreater';
import { SERVER_URL } from '../../../../../../constants/http';
import { Link } from 'react-router-dom';
import { addItemProduct, clearItemsProduct, setShowEditOrder } from '../../../../../../store/reducers/OrderReducer/OrderSlice';
import { v4 as uuidv4 } from 'uuid';
import { getCompanyByIDQuery } from '../../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import numberWithSpaces from '../../../../../../services/ClientServices/numberWithSpaces';

interface IProps {
  isVisible: boolean;
  showAddOrder?: () => void;
}
//TODO ---------- добавить сохранение  текущих позиций в локалсторедж или indexedb, пока не создали счет
const EditOrderInner: FC<IProps> = ({isVisible = false}) => {
  const { company, companyFirstUser, query } = useAppSelector(state => state.companyReducer)
  const { products } = useAppSelector(state => state.productReducer);
  const { order } = useAppSelector(state => state.orderReducer);
  const { totalPrice, totalCount, items: orderItemsAll } = useAppSelector(state => state.orderReducer);
  const dispatch = useAppDispatch();
  
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue);
  const [createDate, setCreateDate] = useState('');
  const [fileArray, setFileArray] = useState<string[]>([]);

  const searchValueHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
   
  }

  const addProductToOrderHandler = (item: IProduct) => {
    const newID = uuidv4();
    dispatch(addItemProduct({
      itemID: newID,
      productID: item._id, 
      price: 0, 
      count: 0, 
      sum: 0,
      productTitle: item.title,
      productDimension: item.dimension,
      vatSum: 0,
      totalSum: 0,
    }))
    // setOrderProducts(prev => ([...prev, item]));
    dispatch(productsClearArray());
    setSearchValue('');
  };

  const createOrderHandler = async () => {
   
      const orderUpdate: IOrderUpdateOrderItems = {
        order: {
          orderID: order._id,
          totalSum: totalPrice,
        },
        orderItems: orderItemsAll
      }

      console.log(orderUpdate)
      await dispatch(updateOrderItemsByOrderID(orderUpdate));
      await dispatch(getCompanyByIDQuery(query));
  
  };

  const canselOrderEdit = () => {
    dispatch(clearItemsProduct());
    dispatch(setShowEditOrder(false));
  }

  useEffect(() => {
    dispatch(productsClearArray());
    // console.log(debouncedSearch)
    if (debouncedSearch) {
      const fetchData = async () => {
        await dispatch(getAllProducts(debouncedSearch));
      };
      fetchData();

    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (order.fileName?.length) {
      setFileArray([]);
      for (let i = order.fileName.length - 1; i >= 0; i--) {
        // Add every element to new array
        setFileArray(prev => [...prev, order.fileName[i]]);
      }
      // order.fileName.reverse();
      const today = new Date(order.createdAt);
      const day = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
      const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      setCreateDate(`${day[today.getDate()]}.${months[today.getMonth()]}.${today.getFullYear()}`)
    }
  }, [order]);

  // useEffect(() => {
  //   if (order.fileName?.length) {
  //     const today = new Date(order.createdAt);
  //     const day = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  //     const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  //     setCreateDate(`${day[today.getDate()]}.${months[today.getMonth()]}.${today.getFullYear()}`)
  //   }
  // }, [orderForEdit])
  

  return isVisible ? (
    <>
      <AddProduct isVisible={showNewProduct} onClose={() => setShowNewProduct(false)}/>
      <section className='edit-order'>
        <div className="edit-order__container">
          <div className="edit-order__header">
            <div className="edit-order__header__title">
              <div className="title">
                <span>{`Сделка №${order.orderNumber}`}</span>
              </div>
              <div className="icons">
                <button
                  className='add-btn'
                  onClick={createOrderHandler}
                  >
                  Новый счёт
                </button>
                <button
                  className='cansel-btn'
                  onClick={canselOrderEdit}
                  >
                  Закрыть
                </button>
                {/* <IoDocumentOutline size={20}/>
                <IoExitOutline size={20}/>
                <IoFilterOutline size={20}/> */}
              </div>
            </div>
          </div>
          <div className="edit-order__main">
            <div className="edit-order__main__row first_row">
              <IoDuplicateOutline width={30}/>
              <span className='cell'>Наименование товара</span>
              <span className='cell narrow'>Ед.изм.</span>
              <span className='cell narrow'>Кол-во</span>
              <span className='cell tight'>Цена без НДС</span>
              <span className='cell medium'>Итого с НДС</span>
              <span className='cell narrow'></span>
            </div>
            {orderItemsAll.length ? 
              orderItemsAll.map((item, index) => 
                <OrderItem 
                  key={item.itemID}
                  item={item} 
                  count={index + 1}
                  />
              )
              : null
            }
            {orderItemsAll.length ? 
              <div className="edit-order__main__row">
                <span className='cell data narrowest'> </span>
                <span className='cell data'></span>
                <span className='cell data narrow'>ИТОГО:</span>
                <span className='cell data narrow'>{`${totalCount}`}</span>
                <span className='cell data tight'></span>
                <span className='cell data total medium'>{`${numberWithSpaces(totalPrice)} руб`}</span>
                <span className='cell data narrow'></span>
              </div>
              : null
            }
          
            <div className="edit-order__main__items">

            </div>
          </div>
          <div className="edit-order__search">
            <input 
              // onClick={() => setShowNewProduct(true)}
              // className="comments__input" 
              type="text" 
              value={searchValue} 
              onChange={searchValueHandler}
              placeholder='Добавить позицию'/>
            <div className="edit-order__search__result">
              {searchValue ? 
                products.map(item => 
                  <span
                    key={item._id}
                    onClick={() => addProductToOrderHandler(item)}
                    >
                    {`${item.title}, ${item.dimension}`}
                  </span>
                ) : null
              }
            </div>
          </div>
          {order.fileName?.length ? 
            fileArray.map(item => 
              <div key={item} className="edit-order__bills">
                {/* <a href={`${SERVER_URL+order._id+order.orderNumber}.docx`}>Скачать счёт</a> */}
                <Link 
                  to={`${SERVER_URL+item}`}
                  // download="foo.txt"
                  target="_blank"
                    >
                  {`Скачать ${item.replace('.docx', '')} от ${createDate}г.`}
                </Link>
              </div>
            )
            : null
          }
        </div>
      </section>

    </>
  ) : null;
}

export const EditOrder = React.memo(EditOrderInner);