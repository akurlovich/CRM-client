import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addDimension, getAllDimensions } from "../../store/reducers/DimensionReducer/DimensionActionCreaters";
import { BaseBlock } from "../BaseBlock/BaseBlock";
import './home.scss';
import { IoNewspaper } from "@react-icons/all-files/io5/IoNewspaper";
import { IoStarOutline } from "@react-icons/all-files/io5/IoStarOutline";
import { IoPricetagOutline } from "@react-icons/all-files/io5/IoPricetagOutline";
import { IoEllipsisVerticalOutline } from "@react-icons/all-files/io5/IoEllipsisVerticalOutline";
import { BaseBlockNarrow } from "../BaseBlock/BaseBlockNarrow";
import { BaseBlockSmall } from "../BaseBlock/BaseBlockSmall";
import { BaseBlockContacts } from "../BaseBlock/BaseBlockContacts";
import { Comments } from "../Comments/Comments";

const HomeInner: FC = () => {
  const { dimensionAll } = useAppSelector(state => state.dimensionReducer);
  const dispatch = useAppDispatch();
  const onclickbutton = () => {
    console.log(dimensionAll)
  }
  const onclickbutton2 = () => {
    // dispatch(addDimension('кг'))
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllDimensions());
    })();
 
  }, []);

  return (
    <main className="main">
      <header className="main__header">
        <div className="main__header__title">
          <div className="avatar">
            <IoNewspaper size={25}/>
          </div>
          <div className="title">
            17 Партсъезд СПК
          </div>
          <IoStarOutline size={20} color={'#3e425e'}/>
          <IoPricetagOutline size={20} color={'#3e425e'}/>
          <IoEllipsisVerticalOutline size={20} color={'#3e425e'}/>
        </div>
        <div className="main__header__links">
          <span className="active">Клиент</span>
          <span>+ Сделка</span>
          <span>Процессы</span>
        </div>
      </header>
      <div className="main__wrapper">
        <div className="left">
          <BaseBlock/>
          <BaseBlockSmall deal="Задачи"/>
          <BaseBlockSmall deal="Процесссы"/>
          <Comments/>
        </div>
        <div className="right">
          <BaseBlockNarrow/>
          <BaseBlockContacts/>
        </div>
        {/* <BaseBlock/>
        <BaseBlockSmall/>
        <BaseBlock/>
        <BaseBlockSmall/>
        <BaseBlock/>
        <BaseBlockSmall/>
        <BaseBlock/>
        <BaseBlockSmall/>
        <BaseBlock/>
        <BaseBlockSmall/>
        <BaseBlock/>
        <BaseBlockSmall/>
        <BaseBlock/>
        <BaseBlockSmall/>
        <BaseBlock/>
        <BaseBlockSmall/> */}
      </div>
      {/* <button 
        onClick={onclickbutton}
        className="div">HI!!!!!!!!!!!!!!!!!
      </button>
      <button 
        onClick={onclickbutton2}
        className="div">HHHHHHHHHHHI!!!!!!!!!!!!!!!!!
      </button> */}
    </main>
  );
};

export const Home = React.memo(HomeInner);