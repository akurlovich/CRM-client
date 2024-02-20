import React, { FC, useEffect, useState } from 'react';
import { Select, SelectProps, Space } from 'antd';
import { IUser, IUserAuth } from '../../../types/IUser';

interface IProps {
  items: IUser[];
  responsibleUsers?: IUser[];
}

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

const SelectUsersInner: FC<IProps> = ({items, responsibleUsers}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const onChangeHandler = (value: string[]) => {
    // setSelectedItems(value)
    console.log(value)
    setShow(false)
  };

  const [show, setShow] = useState(false);

  // const filteredOptions = items.filter((o) => !selectedItems.includes(o.firstname));

  // useEffect(() => {
  //   if (responsibleUsers) {
  //     for (let item of responsibleUsers) {
  //       setSelectedItems(prev => [...prev, item.firstname])
  //     }
  //   }
  // }, [])

  const options: SelectProps['options'] = [
    {
      label: 'China',
      value: 'china',
      emoji: '🇨🇳',
      desc: 'China (中国)',
    },
    {
      label: 'USA',
      value: 'usa',
      emoji: '🇺🇸',
      desc: 'USA (美国)',
    },
    {
      label: 'Japan',
      value: 'japan',
      emoji: '🇯🇵',
      desc: 'Japan (日本)',
    },
    {
      label: 'Korea',
      value: 'korea',
      emoji: '🇰🇷',
      desc: 'Korea (韩国)',
    },
  ];
  

  return (
    <Select
      mode="multiple"
      placeholder="Ответственные:"
      // defaultValue={['Иван']}
      // value={selectedItems}
      // onChange={setSelectedItems}
      // onChange={() => setShow(false)}
      onChange={onChangeHandler}
      style={{ width: '100%' }}
      // options={filteredOptions.map((item) => ({
      //   value: item.email,
      //   label: item.firstname,
      // }))}
      allowClear
      open={show}
      onDropdownVisibleChange={() => setShow(true)}
      
      optionLabelProp="label"
      options={options}
      optionRender={(option) => (
        <Space>
          <span role="img" aria-label={option.data.label}>
            {option.data.emoji}
          </span>
          <span>IMAGE</span>
          {option.data.desc}
        </Space>
      )}
      

      
      />
  );
};

export const SelectUsers = React.memo(SelectUsersInner)