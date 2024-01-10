import React, { FC } from 'react';
import './addcompany.scss';
import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";
import { IoExitOutline } from "@react-icons/all-files/io5/IoExitOutline";
import { IoFilterOutline } from "@react-icons/all-files/io5/IoFilterOutline";
import { IoDuplicateOutline } from "@react-icons/all-files/io5/IoDuplicateOutline";
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";

const AddCompanyInner: FC = () => {
  return (
    <div className="add-company">
      <div className="add-company__dialog">
        <div className="add-company__header">
          <h3 className="add-company__title">Новый клиент</h3>
        </div>
        <form className="add-company__body">
          <div className="add-company__input">
            <span className='required'>Название</span>
            <input type="text" name="" id="" placeholder='ООО "Моя компания'/>
          </div>
          <div className="add-company__input">
            <span>Телефон</span>
            <input type="text" name="" id="" placeholder='+375296654556'/>
            <input type="text" name="" id="" placeholder='комментарий'/>
          </div>
          <div className="add-company__input">
            <span>Почта</span>
            <input type="text" name="" id="" placeholder='example@tut.by'/>
            <input type="text" name="" id="" placeholder='комментарий'/>
          </div>
          <div className="add-company__input">
            <span>Адрес</span>
            <input type="text" name="" id="" placeholder='Область, город и тд.'/>
          </div>
        </form>
        <div className="add-company__footer">
          <button type="submit">Добавить</button>
          <button>Отмена</button>
        </div>
      </div>
    </div>
  )
}

export const AddCompany = React.memo(AddCompanyInner);