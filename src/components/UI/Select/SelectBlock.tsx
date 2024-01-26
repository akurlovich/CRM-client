import React, { FC, useEffect, useState } from 'react';
import { Select, Space } from 'antd';
import { IDealTitle } from '../../../types/IDeal';
import { useAppSelector } from '../../../hooks/redux';


interface IProps {
  // options: IDealTitle[];
  onClickDate: (type: string) => void;
}

interface IOption {
  value: string,
  label: string,
}

const SelectBlock: FC<IProps> = ({onClickDate}) => {
  const { dealTitles } = useAppSelector(state => state.dealReducer);
  
  const handleChange = (value: string) => {
    onClickDate(value);
  };

  const [optionArray, setOptionArray] = useState<IOption[]>([] as IOption[])

  useEffect(() => {

    for (let item of dealTitles) {
      const opt: IOption = {
        value: item._id,
        label: item.title,
      }
      // console.log(opt)
      // setOptionArray(prev => ([...prev, opt]))
      setOptionArray(prev => [...prev, opt])
    }
  }, [dealTitles])
  
  return (
    <Select
      defaultValue="Звонок"
      style={{ width: 120 }}
      onChange={handleChange}
      // options={[
      //   { value: 'jack', label: 'Jack' },
      //   { value: 'lucy', label: 'Lucy' },
      //   { value: 'Yiminghe', label: 'yiminghe' },
      //   { value: 'disabled', label: 'Disabled', disabled: true },
      // ]}
      options={optionArray}
    />

  )
    // <Select
    //   defaultValue="lucy"
    //   style={{ width: 120 }}
    //   disabled
    //   options={[{ value: 'lucy', label: 'Lucy' }]}
    // />
    // <Select
    //   defaultValue="lucy"
    //   style={{ width: 120 }}
    //   loading
    //   options={[{ value: 'lucy', label: 'Lucy' }]}
    // />
    // <Select
    //   defaultValue="lucy"
    //   style={{ width: 120 }}
    //   allowClear
    //   options={[{ value: 'lucy', label: 'Lucy' }]}
    // />

};

export default SelectBlock;