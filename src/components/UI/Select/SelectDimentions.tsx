import React, { FC, useEffect, useState } from 'react';
import { Select, Space } from 'antd';
import { IDealTitle } from '../../../types/IDeal';
import { useAppSelector } from '../../../hooks/redux';


interface IProps {
  // options: IDealTitle[];
  onClickData: (type: string) => void;
}

interface IOption {
  value: string,
  label: string,
}

const SelectDimensions: FC<IProps> = ({onClickData}) => {
  const { dimensions } = useAppSelector(state => state.dimensionReducer);
  
  const handleChange = (value: string) => {
    onClickData(value);
  };

  const [optionArray, setOptionArray] = useState<IOption[]>([] as IOption[])

  useEffect(() => {

    if (optionArray.length) {
      return;
    }

    for (let item of dimensions) {
      const opt: IOption = {
        value: item.title,
        label: item.title,
      }
      setOptionArray(prev => [...prev, opt])
    }

  }, [dimensions])
  
  return (
    <Select
      // defaultValue=""
      placeholder={''}
      style={{ width: 80 }}
      onChange={handleChange}
      listHeight={320}
      // options={[
      //   { value: 'jack', label: 'Jack' },
      //   { value: 'lucy', label: 'Lucy' },
      //   { value: 'Yiminghe', label: 'yiminghe' },
      //   { value: 'disabled', label: 'Disabled', disabled: true },
      // ]}
      options={optionArray}
    />

  )

};

export default SelectDimensions;