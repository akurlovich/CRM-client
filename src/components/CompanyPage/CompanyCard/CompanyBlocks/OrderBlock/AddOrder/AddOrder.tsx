import React, { FC, useState } from 'react';
import './addorder.scss';
import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";
import { IoExitOutline } from "@react-icons/all-files/io5/IoExitOutline";
import { IoFilterOutline } from "@react-icons/all-files/io5/IoFilterOutline";
import { IoDuplicateOutline } from "@react-icons/all-files/io5/IoDuplicateOutline";
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";
import { AddProduct } from '../AddProduct/AddProduct';
// import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";

interface IProps {
  isVisible: boolean;
  showAddOrder?: () => void;
}

const AddOrderInner: FC<IProps> = ({isVisible = false, showAddOrder}) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const [showNewProduct, setShowNewProduct] = useState(false);
  
  const addProductHandler = async () => {

  }

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
                <IoDocumentOutline size={20}/>
                <IoExitOutline size={20}/>
                <IoFilterOutline size={20}/>
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
            <div className="add-order__main__row">
              <span className='cell data narrowest'>1</span>
              <span className='cell data'>Сотовый поликарбонат "Мастер", прозрачный, размер 12000х6000х10мм</span>
              <span className='cell data narrow'>шт.</span>
              <input className='cell data narrow' type="number" name="" id="" />
              {/* <span className='cell data narrow'>1987,896</span> */}
              {/* <span className='cell data tight'>8658,23</span> */}
              <input className='cell data tight' type="number" name="" id="" />
              <span className='cell data'>854 658,23 руб</span>
            </div>
            <div className="add-order__main__row">
              <span className='cell data narrowest'>2</span>
              <span className='cell data'>Труба профильная 120х120х8 дл.12м Ст.3сп5</span>
              <span className='cell data narrow'>т.</span>
              <input className='cell data narrow' type="number" name="" id="" />
              {/* <span className='cell data narrow'>2,896</span> */}
              {/* <span className='cell data tight'>2587,23</span> */}
              <input className='cell data tight' type="number" name="" id="" />
              <span className='cell data'>54 123,44 руб</span>
            </div>
            <div className="add-order__main__row">
              <span className='cell data narrowest'></span>
              <span className='cell data'></span>
              <span className='cell data narrow'>ИТОГО:</span>
              {/* <input className='cell data narrow' type="number" name="" id="" /> */}
              <span className='cell data narrow'>8982,896</span>
              <span className='cell data tight'></span>
              {/* <input className='cell data tight' type="number" name="" id="" /> */}
              <span className='cell data total'>454 123,44 руб</span>
            </div>
          
            <div className="add-order__main__items">

            </div>
          </div>
          <div className="add-order__search">
            <input 
              onClick={() => setShowNewProduct(true)}
              // className="comments__input" 
              type="text" 
              // value={newComment} 
              // onChange={(e: React.FocusEvent<HTMLInputElement>) => setNewComment(e.target.value)}
              placeholder='Добавить позицию'/>
          </div>
        </div>
      </section>

    </>
  ) : null;
}

export const AddOrder = React.memo(AddOrderInner);