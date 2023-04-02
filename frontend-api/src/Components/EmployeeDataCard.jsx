import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

function EmployeeDataCard(){
  return (
    <div className="site-layout-content" style={{ marginLeft: '1px' }}>
    <h3 style={{ textAlign: 'left' }}>Job statistics</h3>
    <Card size="medium" style={{ width: '45%', marginLeft: '2px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={true} size="medium" style={{ marginBottom: '31px' }}>
            <Statistic
              title={<span style={{ color: 'black', fontWeight: 'bold' }}>Total Employees</span>}
              value={112893}
            />
             <span style={{ color: 'gray' }}>Employee</span>
            
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={true} size="medium">
            <Statistic
              title={<span style={{ color: 'black', fontWeight: 'bold' }}>Resigned Employees</span>}
              value={112893}
            />
            <span style={{ color: 'gray' }}>Employee</span>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={true} size="medium" style={{ marginBottom: '31px' }}>
            <Statistic
              title={<span style={{ color: 'black', fontWeight: 'bold' }}>Job view</span>}
              value={112893}
            />
            <span style={{ color: 'gray' }}>Viewer</span>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={true} size="medium">
            <Statistic
              title={<span style={{ color: 'black', fontWeight: 'bold' }}>Job Applied</span>}
              value={112893}
            />
            <span style={{ color: 'gray' }}>Applicant</span>
          </Card>
        </Col>
      </Row>
    </Card>     
  </div>


  );
};

export default EmployeeDataCard;