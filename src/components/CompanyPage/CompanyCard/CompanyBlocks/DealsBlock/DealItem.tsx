import { IoCallSharp } from '@react-icons/all-files/io5/IoCallSharp'
import { IoCheckbox } from '@react-icons/all-files/io5/IoCheckbox'
import { IoPersonSharp } from '@react-icons/all-files/io5/IoPersonSharp'
import { IoSquareOutline } from '@react-icons/all-files/io5/IoSquareOutline'
import { IoStarOutline } from '@react-icons/all-files/io5/IoStarOutline'
import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux'
import { getCompanyByIDQuery } from '../../../../../store/reducers/CompanyReducer/CompanyActionCreaters'
import { deleteDealByID } from '../../../../../store/reducers/DealReducer/DealActionCreators'
import { IDeal } from '../../../../../types/IDeal'

interface IProps {
  item: IDeal,
}

const DealItemInner: FC<IProps> = ({item}) => {
  const { query } = useAppSelector(state => state.companyReducer);
  const dispatch = useAppDispatch();
  const [showDeleteDeal, setShowDeleteDeal] = useState({
    show: false,
    itemID: '',
  });

  const confirmHandler = async (itemID: string) => {
    setShowDeleteDeal({show: true, itemID: itemID});
    setTimeout(async () => {
      if (window.confirm("Завершить дело?")) {
          await dispatch(deleteDealByID(itemID));
          await dispatch(getCompanyByIDQuery(query));
          setShowDeleteDeal({show: false, itemID: ''});
        }
      
    }, 0);
  };

  const deleteHandleer = async () => {
    // console.log(showDeleteDeal.itemID);
    // if (window.confirm("Завершить дело?")) {
    //   await dispatch(deleteDealByID(showDeleteDeal.itemID));
    // }
    setShowDeleteDeal({show: false, itemID: ''})
  };

  return (
    <div key={item._id} className="deals-block__deals__item">
      <div className="deals-block__deals__item__title">
        <span>{item.dateEnd}</span> 
      </div>
      <div className="deals-block__deals__item__info">
        <div className="text">
          {!showDeleteDeal ? 
            <IoSquareOutline 
              style={{"cursor": 'pointer'}}
              onClick={() => confirmHandler(item._id)}
              size={25}/>
            : showDeleteDeal.itemID == item._id ?
              <IoCheckbox
                onClick={deleteHandleer}
                color={'green'}
                size={25}/>
              : 
              <IoSquareOutline 
                style={{"cursor": 'pointer'}}
                onClick={() => confirmHandler(item._id)}
                size={25}/>
          }
          <div className="item">
            <span>{item.dealTitleID.title}</span>
            {/* <span>15:12 {company.dealsID?.[0].userID?.lastname + ' ' + company.dealsID?.[0].userID?.firstname}</span> */}
            <span>{item.timeEnd + ' ' + item.userID.lastname + ' ' +item.userID.firstname}</span>
          </div>
        </div>
        <div className="icons">
          <IoStarOutline size={20}/>
          <IoPersonSharp size={20} color={'grey'}/>
          <IoCallSharp size={20} color={'#b4cb4c'}/>
        </div>
      </div>
    </div>
)
}

export const DealItem = React.memo(DealItemInner)