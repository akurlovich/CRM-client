import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addDimension, getAllDimensions } from "../../store/reducers/DimensionReducer/DimensionActionCreaters";
import './home.scss';

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