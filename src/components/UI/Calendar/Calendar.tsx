import type { Dayjs } from 'dayjs';
import React from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';

// const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
//   console.log(value.format('YYYY-MM-DD'), mode);
//   console.log('first')
// };

const CalendarItem: React.FC = () => {
  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar 
        fullscreen={false} 
        onPanelChange={(value: Dayjs) => console.log(value)} 
        onSelect={(value: Dayjs) => console.log(value.format('YYYY-MM-DD'))}
      />
    </div>
  );
};

export default CalendarItem;