import React, { FC, useEffect } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Calendar, Col, Row, Select, Typography, theme } from 'antd';

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  weekdaysMin : ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", ],
  weekStart: 1,
  months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
});

interface IProps {
  onClickDate?: (date: string, dateShort: string) => void;
  title?: boolean;
}

const CalendarCustom: FC<IProps> = ({onClickDate, title = true}) => {
  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const getDataHandler = (value: Dayjs) => {
    if (onClickDate) {
      onClickDate(value.format('DD MMMM YYYY'), value.format('DD-MM-YYYY'))

    }
    // console.log(date)
    // console.log(dayjs().format('DD.MM.YYYY'))
  };

  return (
    <div style={wrapperStyle}>
      <Calendar
        
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
     
          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>,
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }
          return (
            <div style={{ padding: 8 }}>
              {title ? 
                <Typography.Title level={4}>Выберите дату и время</Typography.Title>
                : null
              }
              <Row 
                
                gutter={8}>
                <Col>
                  <Select
                    size="large"
                    popupMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="large"
                    popupMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
        //TODO  year, month, date - число месяца
        // onSelect={(value: Dayjs) => console.log(value.format('YYYY-MM-DD'), value.date())}
        // onSelect={(value: Dayjs) => getDataHandler('DD.MM.YYYY')}
        onSelect={(value: Dayjs) => getDataHandler(value)}
      />
    </div>
  );
};

export default CalendarCustom;