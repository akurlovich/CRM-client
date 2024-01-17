import React, { FC } from 'react';
import './baseblock.scss';
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";
import { IoAddOutline } from "@react-icons/all-files/io5/IoAddOutline";
import { IoPencilOutline } from "@react-icons/all-files/io5/IoPencilOutline";
import { IoCopyOutline } from '@react-icons/all-files/io5/IoCopyOutline';
import { IoStarOutline } from "@react-icons/all-files/io5/IoStarOutline";
import { IoPersonSharp } from "@react-icons/all-files/io5/IoPersonSharp";
import { IoCallSharp } from "@react-icons/all-files/io5/IoCallSharp";
import { ICompany } from '../../../../types/ICompany';
import { useAppSelector } from '../../../../hooks/redux';

// interface IProps {
//   company: ICompany;
// }

const ContactsBlockInner: FC = () => {
  const { company, companies, isLoading } = useAppSelector(state => state.companyReducer);

  return (
    <section className='baseblock small'>
      <div className="baseblockSmall__newdeal">
        <div className="baseblockSmall__newdeal__title">
          <div className="text">
            <span>Контактные данные</span>
          </div>
          <div className="icons">
            <IoAddCircleOutline size={20}/>
          </div>
        </div>
      </div>
      <div className="baseblockSmall__deals">
        <div className="baseblockSmall__deals__item">
          {/* <div className="baseblockSmall__deals__item__title">
            <span>Четверг, 2 ноября 2024г.</span> 
          </div> */}
          <div className="baseblock__contacts">
            <div className="title">
              <span>Телефоны</span>
              <IoAddOutline size={20}/>
            </div>
            <div className="data">
              <div className="text">
                <span>+375 29 554-35-62</span>
                <span>Иван Михайлович</span>
              </div>
              <div className="icons">
                <IoPencilOutline size={20}/>
                <IoCopyOutline size={20}/>
              </div>
            </div>
            <div className="data">
              <div className="text">
                <span>+375 29 112-98-78</span>
                <span>Владимир Эдуардович</span>
              </div>
              <div className="icons">
                <IoPencilOutline size={20}/>
                <IoCopyOutline size={20}/>
              </div>
            </div>
            <div className="data">
              <div className="text">
                <span>+375 44 678-98-60</span>
                <span>Дарья Васильевна</span>
              </div>
              <div className="icons">
                <IoPencilOutline size={20}/>
                <IoCopyOutline size={20}/>
              </div>
            </div>
            <div className="data">
              <div className="text">
                <span>+375 33 978-11-11</span>
                <span>Аленсандр Владиславович</span>
              </div>
              <div className="icons">
                <IoPencilOutline size={20}/>
                <IoCopyOutline size={20}/>
              </div>
            </div>
            <div className="data last">
              <div className="text">
                <span>+375 25 425-55-32</span>
                <span>Ана Степановна</span>
              </div>
              <div className="icons">
                <IoPencilOutline size={20}/>
                <IoCopyOutline size={20}/>
              </div>
            </div>
            <div className="title">
              <span>Адрес</span>
              <IoAddOutline size={20}/>
            </div>
            <div className="data last">
              <div className="text">
                <span></span>
                <span>{company?.contactID?.address?.main ? company?.contactID?.address?.main : ''}</span>
              </div>
              <div className="icons">
                <IoPencilOutline size={20}/>
                <IoCopyOutline size={20}/>
              </div>
            </div>
            <div className="title">
              <span>Район</span>
              <IoAddOutline size={20}/>
            </div>
            <div className="data last">
              <div className="text">
                <span></span>
                <span>{company?.contactID?.address?.district ? company?.contactID?.address?.district : ''}</span>
              </div>
              <div className="icons">
                <IoPencilOutline size={20}/>
                <IoCopyOutline size={20}/>
              </div>
            </div>
            <div className="title">
              <span>Почта</span>
              <IoAddOutline size={20}/>
            </div>
            <div className="data">
              <div className="text">
                <span>{company?.contactID?.emailsID[0]?.email ? company?.contactID?.emailsID[0]?.email : ''}</span>
                <span>{company?.contactID?.emailsID[0]?.description ? company?.contactID?.emailsID[0]?.description : ''}</span>
              </div>
              <div className="icons">
                <IoPencilOutline size={20}/>
                <IoCopyOutline size={20}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export const ContactsBlock = React.memo(ContactsBlockInner);