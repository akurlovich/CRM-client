import React, { FC } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { TimePicker } from 'antd';

const format = 'HH:mm';

// const onChange = (time: Dayjs | null, timeString: string) => 
// const onChange2 = (hour: number | undefined, minuts: number | undefined,) => 
// {
  
//   console.log(hour, minuts);
// };


interface IProps {
  onClickDate: (timeString: string) => void;
}

const TimeBlock: FC<IProps> = ({onClickDate}) => {
  
  const onChange = (timeString: string) => {
    onClickDate(timeString)

  };

//   const onChange2 = (hour: number | undefined, minuts: number | undefined,) => 
// {
  
//   console.log(hour, minuts);
// };


  return (
    <div>
      <TimePicker 
        // onChange={(time: Dayjs | null, timeString: string) => onChange(time?.hour(), timeString)}
        // onChange={(time: Dayjs | null) => onChange(time?.hour(), time?.minute())}
        onChange={(time: Dayjs | null, timeString: string) => onChange(timeString)}
        // onSelect={(time: Dayjs | null) => onChange2(time?.hour(), time?.minute())}
        defaultValue={dayjs('08:00', format)} 
        format={format} 
        autoFocus={true}
        inputReadOnly={true}
        showNow={false}
      />
    </div>

  )
}

export default TimeBlock;