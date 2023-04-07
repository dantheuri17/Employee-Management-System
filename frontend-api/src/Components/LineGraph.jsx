import React, { useState, useEffect } from 'react';
import { Card} from 'antd';
import { Line } from '@ant-design/charts';

const LineGraph = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/employees')
      .then(response => response.json())
      .then(data => setEmployeeData(data))
      .catch(error => console.error(error));
  }, []);

  const departmentCounts = {}; // object to store department counts

  employeeData.forEach(employee => {
    const department = employee.department;
    if (departmentCounts[department]) {
      departmentCounts[department]++;
    } else {
      departmentCounts[department] = 1;
    }
  });

  const lineConfig = {
    data: Object.entries(departmentCounts).map(([department, count]) => ({ department, count })),
    xField: 'department',
    yField: 'count',
    seriesField: null,
    point: { size: 3, shape: 'circle' },
    lineStyle: { lineWidth: 4 },
    color: '#FF4500'
  };

  return (
    <div className="line-graph-container" style={{ position: 'absolute', top: '-356px', left: '120px', right: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '470px', width: '50%' }}>
      <div className="line-graph-header" style={{ textAlign: 'right' }}>
      </div>
      <Card size="small" className="line-graph-card" style={{ width: '100%' }}>
        <h3 style={{ textAlign: 'left' }}>Employees in every department</h3>
        <div className="line-graph-chart" style={{ textAlign: 'center', height: '300px' }}>
          <Line {...lineConfig} />
        </div>
      </Card>
    </div>
  );
};

export default LineGraph;
