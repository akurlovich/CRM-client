import { IoBagSharp } from '@react-icons/all-files/io5/IoBagSharp';
import { IoCallSharp } from '@react-icons/all-files/io5/IoCallSharp';
import { IoPeople } from '@react-icons/all-files/io5/IoPeople';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { getCompanyByIDQuery } from '../../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { deleteDealByID } from '../../../../../../store/reducers/DealReducer/DealActionCreators';
import { IDeal } from '../../../../../../types/IDeal';
import './addproduct.scss';

import { ICommentNew } from '../../../../../../types/IComment';
import { addComment } from '../../../../../../store/reducers/CommentReducer/CommentActionCreater';
import { IoDuplicateOutline } from '@react-icons/all-files/io5/IoDuplicateOutline';
import { getAllDimensions } from '../../../../../../store/reducers/DimensionReducer/DimensionActionCreaters';
import SelectDimensions from '../../../../../UI/Select/SelectDimentions';
import { IProductNew } from '../../../../../../types/IProduct';
import { addProduct } from '../../../../../../store/reducers/ProductReducer/ProducrActionCreater';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddProductInner: FC<IProps> = ({isVisible = false, onClose }) => {
  const { company, companyFirstUser, query } = useAppSelector(state => state.companyReducer);
  const { dimensions } = useAppSelector(state => state.dimensionReducer);
  const dispatch = useAppDispatch();

  const [ selectedDimenion, setSselectedDimenion] = useState('');
  const [ productName, setProductName ] = useState('')

  const addProductHandler = async () => {
    if (selectedDimenion && productName ) {
      const newProduct: IProductNew = {
        title: productName,
        price: 1,
        dimension: selectedDimenion,
        count: 1,
      }
      await dispatch(addProduct(newProduct));
//TODO -----  добавить получение всех продуктов
      // await dispatch(getCompanyByIDQuery(query));
      setSselectedDimenion('');
      setProductName('')
      onClose();
    }
    
    // // console.log(addNewComment)
    
    // await dispatch(addComment(addNewComment));
    // await dispatch(deleteDealByID(item._id));
    // await dispatch(getCompanyByIDQuery(query));
    // setDealComment('');
    // onClose();
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

  return isVisible ? (
    <div className="add-product">
      <div className="add-product__dialog">
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
                onChange={((e: React.FocusEvent<HTMLInputElement>) => setProductName(e.target.value))}
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
            onClick={addProductHandler}
            type="submit"
            >
            Добавить в каталог
          </button>
          <button onClick={canselHandler}>Отмена</button>
        </div>
      </div>
    </div>
  ) : null;
}

export const AddProduct = React.memo(AddProductInner);