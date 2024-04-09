import React, { FC, useEffect, useState } from 'react';
import './editproduct.scss'
import { IProduct } from '../../../../types/IProduct';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { addProduct, getAllProducts, updateProduct } from '../../../../store/reducers/ProductReducer/ProductActionCreater';
import { getAllDimensions } from '../../../../store/reducers/DimensionReducer/DimensionActionCreaters';
import { UserErrorWarning } from '../../../UI/UserErrorWarning/UserErrorWarning';
import SelectDimensions from '../../../UI/Select/SelectDimentions';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  item: IProduct;
}

const EditProductInner: FC<IProps> = ({isVisible = false, onClose, item }) => {
  console.log('first', item);
  // const { company } = useAppSelector(state => state.companyReducer);
  const { product, error: errorProduct } = useAppSelector(state => state.productReducer);
  // const { items } = useAppSelector(state => state.orderReducer);
  const dispatch = useAppDispatch();

  const [ selectedDimenion, setSselectedDimenion] = useState('');
  const [ productName, setProductName ] = useState(item.title);

  const [disabled, setDisabled] = useState(true);

  // const [addToOrder, setAddToOrder] = useState(false);

  const addProductHandler = async () => {
    if (!selectedDimenion) {
      alert('Не выбрана единица измерения!')
      return;
    }
    if (selectedDimenion && productName ) {
      const updProduct: IProduct = {
        _id: item._id,
        title: productName,
        price: 1,
        dimension: selectedDimenion,
        count: 1,
      }
      console.log('update new product', updProduct)
      await dispatch(updateProduct(updProduct));
//TODO -----  добавить получение всех продуктов
      // await dispatch(getCompanyByIDQuery(query));
      setSselectedDimenion('');
      setProductName('')
      // setAddToOrder(true);
      onClose();
      setDisabled(true);
      await dispatch(getAllProducts(''))

      // const newID = uuidv4();
      // dispatch(addItemProduct({
      //   companyID: company._id,
      //   itemID: newID,
      //   productID: product._id, 
      //   price: 0, 
      //   count: 0, 
      //   sum: 0,
      //   productTitle: product.title,
      //   productDimension: product.dimension,
      //   vatSum: 0,
      //   totalSum: 0,
      // }))
      // dispatch(productsClearArray());

    } else {
      alert('Не заполнены все поля!')
    }
    
    // // console.log(addNewComment)
    
    // await dispatch(addComment(addNewComment));
    // await dispatch(deleteDealByID(item._id));
    // await dispatch(getCompanyByIDQuery(query));
    // setDealComment('');
    // onClose();
  };

  const productInputHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setProductName(e.target.value)
    if (e.target.value) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  };

  const canselHandler = () => {
    setSselectedDimenion('');
    setProductName('')
    onClose();
  };

  const keydownHandler = ({ key }: {key: string}) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllDimensions());
    };
    fetchData();

    if (isVisible) {
      document.body.style.overflow = 'hidden';
      // document.body.style.position = 'fixed';
      // document.body.style.top = `-${window.scrollY}px`;
      // document.addEventListener('keydown', keydownHandler);
      return () => {
        document.removeEventListener('keydown', keydownHandler);
        document.body.style.overflow = 'auto';
        // const scrollY = document.body.style.top;
        // document.body.style.position = '';
        // document.body.style.top = '';
        // window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isVisible]);

  // useEffect(() => {

  //   if (product._id) {
  //     // console.log('from add product')
  //     const found = items.find(item => item.productID == product._id)
  //     if (!found) {
  //       const newID = uuidv4();
  //         dispatch(addItemProduct({
  //           companyID: company._id,
  //           itemID: newID,
  //           productID: product._id, 
  //           price: 0, 
  //           count: 0, 
  //           sum: 0,
  //           productTitle: product.title,
  //           productDimension: product.dimension,
  //           vatSum: 0,
  //           totalSum: 0,
  //         }))
  //       dispatch(productsClearArray());
        
  //     }
  //   }

  // }, [product])
  
  // useEffect(() => {
  //   if (productTitle) {
  //     setDisabled(false);
  //     setProductName(productTitle)
  //   }
  // }, [productTitle])
  

  return isVisible ? (
    <>
      {errorProduct ? <UserErrorWarning/> : null}
      <div 
        onClick={() => onClose()}
        className="add-product">
        <div 
          onClick={(e:React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          className="add-product__dialog">
          <div className="add-product__header">
            <h3 className="add-product__title">Добавить новый товар</h3>
          </div>
          
          <form className="add-product__body">
            <div className="add-product__main">
              <div className="add-product__main__row first_row">       
                <span className='add-product__main__row_cell'>Наименование товара</span>
                <span className='add-product__main__row_cell narrow'>Ед.изм</span>
              </div>
              <div className="add-product__main__row">
                <input 
                  className='add-product__main__row_cell data'
                  value={productName}
                  onChange={productInputHandler}
                  type="text"
                  placeholder='Введите название нового товара...'
                  autoFocus/>
                {/* <span className='add-product__main__row_cell data'>Сотовый поликарбонат "Мастер", прозрачный, размер 12000х6000х10мм</span> */}
                {/* <span className='add-product__main__row_cell data narrow'>шт.</span> */}
                <SelectDimensions onClickData={setSselectedDimenion}/>
              </div>
            </div>

          </form>
          <div className="add-product__footer">
            <button 
              className={disabled ? 'disabled' : ''}
              disabled={disabled}
              onClick={addProductHandler}
              // type="submit"
              >
              Добавить в каталог
            </button>
            <button onClick={canselHandler}>Отмена</button>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export const EditProduct = React.memo(EditProductInner);