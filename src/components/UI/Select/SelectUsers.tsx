import React, { FC, useEffect, useState } from 'react';
import { Select } from 'antd';
import { IUser } from '../../../types/IUser';
import { useAppSelector } from '../../../hooks/redux';

interface IProps {
  items?: IUser[];
  responsibleUsers?: IUser[];
}

interface IOption {
  value: string,
  label: string,
}

const SelectUsersInner: FC<IProps> = () => {
  const [optionArray, setOptionArray] = useState<IOption[]>([] as IOption[])
  const { users } = useAppSelector(state => state.userReducer);

  const handleChange = (value: string) => {
    console.log(value);
  };

  useEffect(() => {

    if (users.length) {
      for (let item of users) {
        const opt: IOption = {
          value: item._id,
          label: item.lastname + ' ' + item.firstname,
        }
        // console.log(opt)
        // setOptionArray(prev => ([...prev, opt]))
        setOptionArray(prev => [...prev, opt])
      }
    }
  }, [users])

  return (
    <Select
      defaultValue=""
      style={{ width: '100%' }}
      onChange={handleChange}
      options={optionArray}
    />

  )
};

export const SelectUsers = React.memo(SelectUsersInner)