import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAllDimensions } from "../../store/reducers/DimensionReducer/DimensionActionCreaters";
import './home.scss';

const HomeInner: FC = () => {
  const { dimensionAll } = useAppSelector(state => state.dimensionReducer);
  const dispatch = useAppDispatch();
  const onclickbutton = () => {
    console.log(dimensionAll)
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllDimensions());
    })();
 
  }, []);

  return (
    <main className="main__wrapper">
      <button 
        onClick={onclickbutton}
        className="div">HI!!!!!!!!!!!!!!!!!
      </button>
    </main>
  );
};

export const Home = React.memo(HomeInner);