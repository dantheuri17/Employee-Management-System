import React from 'react';
import { Card} from 'antd';
import { Bar } from '@ant-design/charts';



const barConfig = {
  data: [
    { year: '2017', applications: 120 },
    { year: '2018', applications: 200 },
    { year: '2019', applications: 300 },
    { year: '2020', applications: 500 },
    { year: '2021', applications: 800 },
  ],
  xField: 'year',
  yField: 'applications',
  color: '#FF4500',
};

const BarGraph = () => {

  return (
    <div className="bar-graph-container" size='small' style={{position:'absolute',top:'-343px', left:'120px', right:'0', display: 'flex', flexDirection: 'column',alignItems: 'flex-end', padding:'470px', width: '50%'}}>
      <div className="bar-graph-header" style={{textAlign: 'right'}}>
      </div>
      <Card size="small" className="bar-graph-card" style={{width: '100%'}}>
      <h3 style={{ textAlign: 'left' }}>Job Statistics</h3>
        <div className="bar-graph-chart" style={{textAlign: 'center', height: '300px'}}>
          <Bar {...barConfig} />
        </div>
      </Card>
    </div>
  );
};

export default BarGraph;