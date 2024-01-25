import { IoBagSharp } from '@react-icons/all-files/io5/IoBagSharp'
import { IoCallSharp } from '@react-icons/all-files/io5/IoCallSharp'
import { IoCheckbox } from '@react-icons/all-files/io5/IoCheckbox'
import { IoPeople } from '@react-icons/all-files/io5/IoPeople'
import { IoPersonSharp } from '@react-icons/all-files/io5/IoPersonSharp'
import { IoSquareOutline } from '@react-icons/all-files/io5/IoSquareOutline'
import { IoStarOutline } from '@react-icons/all-files/io5/IoStarOutline'
import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux'
import { getCompanyByIDQuery } from '../../../../../store/reducers/CompanyReducer/CompanyActionCreaters'
import { deleteDealByID } from '../../../../../store/reducers/DealReducer/DealActionCreators'
import { IDeal } from '../../../../../types/IDeal'
import { DealComplete } from './DealComplete/DealComplete'

interface IProps {
  item: IDeal,
  fromBlock?: boolean,
}

const DealItemInner: FC<IProps> = ({item, fromBlock}) => {
  const { query } = useAppSelector(state => state.companyReducer);
  const dispatch = useAppDispatch();
  const [showDeleteDeal, setShowDeleteDeal] = useState({
    show: false,
    itemID: '',
  });
  const [showDealComplete, setShowDealComplete] = useState<boolean>(false);

  const confirmHandler = async (itemID: string) => {
    setShowDeleteDeal({show: true, itemID: itemID});
    // setTimeout(async () => {
    //   if (window.confirm("Завершить дело?")) {
    //       await dispatch(deleteDealByID(itemID));
    //       await dispatch(getCompanyByIDQuery(query));
    //       setShowDeleteDeal({show: false, itemID: ''});
    //     }
      
    // }, 0);
    setShowDealComplete(true);
  };

  const deleteHandleer = async () => {
    setShowDeleteDeal({show: false, itemID: ''})
  };

  return (
    <>
      {item ? 
        <>
          {<DealComplete 
            isVisible={showDealComplete}
            item={item} 
            onClose={() => setShowDealComplete(false)}/>}
          <div key={item._id} className="deals-block__deals__item">
            {!fromBlock ? 
              <div className="deals-block__deals__item__title">
                <span>{item.dateEnd}</span> 
              </div>
              : null
            }
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
                  {fromBlock ? 
                    <>
                      <span>{`${item.dateEnd} в ${item.timeEnd}`}</span>
                      <span>{item.dealTitleID?.title}</span>
                    </>
                    : 
                    <>
                      <span>{item.dealTitleID.title}</span>
                      <span>{item.timeEnd + ' ' + item.userID.lastname + ' ' +item.userID.firstname}</span>
                    </>
                  }
                </div>
              </div>
              {!fromBlock ? 
                <div className="icons">
                  {/* <IoStarOutline size={20}/>
                  <IoPersonSharp size={20} color={'grey'}/>
                  <IoCallSharp size={20} color={'#b4cb4c'}/> */}
                  {item.dealTitleID.title == 'Звонок' && <IoCallSharp size={20} color={'#b4cb4c'}/>}
                  {item.dealTitleID.title == 'Дело' && <IoBagSharp size={20} color={'grey'}/>}
                  {item.dealTitleID.title == 'Встреча' && <IoPeople size={20} color={'#de6495'}/>}
                </div>
                : null
              }
            </div>
          </div>
        
        </>
        :
        null
    
      }
    
    </>
)
}

export const DealItem = React.memo(DealItemInner)