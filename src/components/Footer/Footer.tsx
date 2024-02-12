import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useDebounce } from '../../hooks/useDebounce';
import { getSearchResult } from '../../store/reducers/SearchReducer/SearchActionCreater';
import './footer.scss';
import { IoSearchOutline } from "@react-icons/all-files/io5/IoSearchOutline";
import { IoPeopleOutline } from "@react-icons/all-files/io5/IoPeopleOutline";
import { searchResultClearArray } from '../../store/reducers/SearchReducer/SearchSlice';

const FooterInner: FC = () => {
  const { searchResult } = useAppSelector(state => state.searchReducer);

  const dispatch = useAppDispatch();
  
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(searchValue);

  const searchValueHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // console.log(searchResult)
  };

  useEffect(() => {
    dispatch(searchResultClearArray());
    // console.log(debouncedSearch)
    if (debouncedSearch) {
      const fetchData = async () => {
        await dispatch(getSearchResult(debouncedSearch));
      };
      fetchData();

    }
  }, [debouncedSearch]);

  
  return (
    <footer className="footer">
      <div className="footer__search">
        <div className="footer__search__input">
          <div className="footer__search__icon">
            <IoSearchOutline size={20}/>
          </div>
          <input 
            // onClick={() => console.log(searchResult)}
            // className="comments__input" 
            type="text" 
            value={searchValue} 
            onChange={searchValueHandler}
            placeholder='Найти...'/>
          <div className="footer__search__result">
            
            {searchValue ? 
              searchResult.map(item => 
                <a 
                  key={item.companyID}
                  href={`/companies/${item.companyID}`}
                  onClick={() => dispatch(searchResultClearArray())}
                  target="_blank">
                    {/* <b>
                      {`${item.title}, ${item.contactID.address.district}`}
                      
                    </b> */}
                    <div className="footer__search__result__item">
                      <div className="footer__search__result__item__icon">
                        <IoPeopleOutline size={30}/>
                      </div>
                        <div className="footer__search__result__item__info">
                          <div className="footer__search__result__item__block">
                            <span className='title'>Клиент:</span>
                            <span className='title-name'>{item.companyTitle}</span>
                          </div>            
                          {item.phoneNumber ? 
                            <div className="footer__search__result__item__block">
                              <span>Телефон:</span>
                              <span>{item.phoneNumber + ' ' + item.phoneDescription}</span>
                            </div>
                            :
                            null
                          }
                          {item.emailEmail ? 
                            <div className="footer__search__result__item__block">
                              <span>Почта:</span>
                              <span>{item.emailEmail + ' ' + item.emailDescription}</span>
                            </div>
                            : null
                          }
                          <div className="footer__search__result__item__block">
                            <span>Ответственынй:</span>
                            <span>{item.userLastName + ' ' + item.userFirstName}</span>
                          </div>
                        </div>
                    </div>
                </a>

                // <span
                //   key={item._id}
                //   // onClick={() => addProductToOrderHandler(item)}
                //   >
                //   {`${item.title}, ${item.usersID}`}
                // </span>
              ) : null
            }
          </div>
        </div>
      </div>

      {/* <div className="footer__copywrite">
        <div className="footer__item">
          <AiOutlineCopyrightCircle size={30}/>
          <div 
            onClick={() => console.log(searchResult)}
            className="footer__text">
            Copyright: Artsiom Kurlovich
          </div>
        </div>
        <div className="footer__item">
          <AiOutlineMail size={30}/>
          <div>
            <a className="footer__text" href="mailto: info@skrama.by">info@skrama.by</a>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export const Footer = React.memo(FooterInner);
