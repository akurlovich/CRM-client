import React, { FC, useEffect, useState } from 'react';
import './addorder.scss';
import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";
import { IoExitOutline } from "@react-icons/all-files/io5/IoExitOutline";
import { IoFilterOutline } from "@react-icons/all-files/io5/IoFilterOutline";
import { IoDuplicateOutline } from "@react-icons/all-files/io5/IoDuplicateOutline";
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";
import { AddProduct } from '../AddProduct/AddProduct';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { getAllProducts } from '../../../../../../store/reducers/ProductReducer/ProducrActionCreater';
import { IProduct } from '../../../../../../types/IProduct';
import OrderItem from '../OrderItem/OrderItem';
import { useDebounce } from '../../../../../../hooks/useDebounce';
import { productsClearArray } from '../../../../../../store/reducers/ProductReducer/ProductSlice';
import { addOrderItem } from '../../../../../../store/reducers/OrderItemsReducer/OrderItemsActionCreater';
import { IOrderNewWithItems } from '../../../../../../types/IOrder';
import { addOrder } from '../../../../../../store/reducers/OrderReducer/OrderActionCreater';
// import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";

interface IProps {
  isVisible: boolean;
  showAddOrder?: () => void;
}

const AddOrderInner: FC<IProps> = ({isVisible = false, showAddOrder}) => {
  const { company, companyFirstUser } = useAppSelector(state => state.companyReducer)
  const { products } = useAppSelector(state => state.productReducer);
  const { totalPrice, totalCount, items: orderItems } = useAppSelector(state => state.orderReducer);
  const dispatch = useAppDispatch();
  
  const [isModal, setIsModal] = useState<boolean>(false);
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [orderProducts, setOrderProducts] = useState<IProduct[]>([] as IProduct[]);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue);
  const [totalSum, setTotalSum] = useState(0);

  const totalSumHandler = (sum: number) => {
    // console.log(sum, totalSum)
    // const total = +((totalSum + sum).toFixed(2))
    // setTotalSum(total);
  }

  const searchValueHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // console.log(e.target.value);
    // setTimeout(async () => {
    //   await dispatch(getAllProducts(e.target.value));
    //   setfoundProducts([...products])  
    // }, 500);
  }

  const addProductToOrderHandler = (item: IProduct) => {
    setOrderProducts(prev => ([...prev, item]));
    dispatch(productsClearArray());
    setSearchValue('');
  };

  const createOrderHandler = async () => {
    const orderNew: IOrderNewWithItems = {
      order: {
        companyID:company._id,
        usersID: companyFirstUser._id,
        totalSum: totalPrice,
      },
      orderItems: orderItems
    }
    console.log(orderNew);
    await dispatch(addOrder(orderNew));
    // await dispatch(addOrderItem(orderItems));
  };
  
  // useEffect(() => {
  //   const Debounce = setTimeout(async () => {
  //     if (searchValue) {
  //       await dispatch(getAllProducts(searchValue));

  //     }
  //     // setfoundProducts([...products])  
  //   }, 500);

  //   return () => clearTimeout(Debounce);
  // }, [searchValue]);

  useEffect(() => {
    dispatch(productsClearArray());
    console.log(debouncedSearch)
    if (debouncedSearch) {
      const fetchData = async () => {
        await dispatch(getAllProducts(debouncedSearch));
      };
      fetchData();

    }
  }, [debouncedSearch])

  return isVisible ? (
    <>
      <AddProduct isVisible={showNewProduct} onClose={() => setShowNewProduct(false)}/>
      <section className='add-order'>
        <div className="add-order__container">
          <div className="add-order__header">
            <div className="add-order__header__title">
              <div className="title">
                <span>Новая сделка</span>
              </div>
              <div className="icons">
                <button
                  className='add-btn'
                  onClick={createOrderHandler}
                  >
                  Создать счёт
                </button>
                <button
                  className='cansel-btn'
                  onClick={showAddOrder}
                  >
                  Закрыть
                </button>
                {/* <IoDocumentOutline size={20}/>
                <IoExitOutline size={20}/>
                <IoFilterOutline size={20}/> */}
              </div>
            </div>
          </div>
          <div className="add-order__main">
            <div className="add-order__main__row first_row">
              <IoDuplicateOutline width={30}/>
              <span className='cell'>Наименование товара</span>
              <span className='cell narrow'>Ед.изм.</span>
              <span className='cell narrow'>Кол-во</span>
              <span className='cell tight'>Цена без НДС</span>
              <span className='cell'>Итого с НДС</span>
            </div>
            {orderProducts.length ? 
              orderProducts.map((item, index) => 
                <OrderItem 
                  key={item._id}
                  item={item} 
                  count={index + 1}
                  totalSum={totalSumHandler}/>
              )
              : null
            }
            {orderProducts.length ? 
              <div className="add-order__main__row">
                <span className='cell data narrowest'></span>
                <span className='cell data'></span>
                <span className='cell data narrow'>ИТОГО:</span>
                <span className='cell data narrow'>{`${totalCount}`}</span>
                <span className='cell data tight'></span>
                <span className='cell data total'>{`${totalPrice.toFixed(2)} руб`}</span>
              </div>
              : null
            }
          
            <div className="add-order__main__items">

            </div>
          </div>
          <div className="add-order__search">
            <input 
              // onClick={() => setShowNewProduct(true)}
              // className="comments__input" 
              type="text" 
              value={searchValue} 
              onChange={searchValueHandler}
              placeholder='Добавить позицию'/>
            <div className="add-order__search__result">
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
        </div>
      </section>

    </>
  ) : null;
}

export const AddOrder = React.memo(AddOrderInner);