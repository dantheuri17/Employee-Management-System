import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';
import { Card } from 'antd';



function EmployeePie() {

const [employeeData, setEmployeeData] = useState([]);

useEffect(() => {
fetch('http://localhost:4000/employees')
.then(response => response.json())
.then(data => setEmployeeData(data))
.catch(error => console.error(error));
}, []);

  const workTypeCounts = {}; 
  
  employeeData.forEach(employee => {
        const workType = employee.workType;
         if (workTypeCounts[workType]) {
          workTypeCounts[workType]++;
          } else {
           workTypeCounts[workType] = 1;
         }
  });
  
  const data = Object.entries(workTypeCounts).map(([type, value]) => ({ type, value }));
  
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
      content: 'Work Format',
      },
      },
      color: ['#1890ff', '#FF4500', '#722ed1'],
    };
  
  return (
  <Card
  title={<h3 style={{ fontWeight: 'bold' }}>Proportions of Employees by Work Type</h3>}
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
