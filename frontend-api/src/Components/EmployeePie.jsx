import React from 'react';
import { Pie } from '@ant-design/plots';
import { Card } from 'antd';

function EmployeePie() {
  const data = [
    {
      type: 'Online',
      value: 27,
    },
    {
      type: 'Hybrid',
      value: 25,
    },
    {
      type: 'Onsite',
      value: 18,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Total:',
      },
    },
    color: ['#1890ff', '#FF4500', '#722ed1'],
  };

  return (
    <Card
      title="Working Format"
      style={{ height: '420px', width: '500px', marginTop: '40px', marginLeft: '760px'}} 
    >
      <Pie
        {...config}
        style={{ height: '80%', width: '80%', marginTop: '-70px', marginLeft:'80px'}}
      />
    </Card>
  );
}

export default EmployeePie;