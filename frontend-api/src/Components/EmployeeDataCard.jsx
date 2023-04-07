import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import employeeData from '../employees.json';

function EmployeeDataCard(){

  const totalEmployees = employeeData.length;
  const resignedEmployees = employeeData.filter(employee => employee.employeeStatus === "Resigned").length;
  const fullTimeEmployees = employeeData.filter(employee => employee.employementType === "Fulltime").length;
  const partTimeEmployees = employeeData.filter(employee => employee.employementType === "Parttime").length;

  return (
    <div className="site-layout-content" style={{ marginLeft: '1px' }}>
    <h3 style={{ textAlign: 'left' }}>Job statistics</h3>
    <Card size="medium" style={{ width: '45%', marginLeft: '2px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={true} size="medium" style={{ marginBottom: '31px' }}>
            <Statistic
              title={<span style={{ color: 'black', fontWeight: 'bold' }}>Total Employees</span>}
              value={totalEmployees}
            />
            <span style={{ color: 'gray' }}>Employee</span>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={true} size="medium">
            <Statistic
              title={<span style={{ color: 'black', fontWeight: 'bold' }}>Resigned Employees</span>}
              value={resignedEmployees}
            />
            <span style={{ color: 'gray' }}>Employee</span>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={true} size="medium" style={{ marginBottom: '31px' }}>
            <Statistic
              title={<span style={{ color: 'black', fontWeight: 'bold' }}>Full-Time employees</span>}
              value={fullTimeEmployees}
            />
            <span style={{ color: 'gray' }}>Employee</span>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={true} size="medium">
            <Statistic
              title={<span style={{ color: 'black', fontWeight: 'bold' }}>Part-Time Employees</span>}
              value={partTimeEmployees}
            />
            <span style={{ color: 'gray' }}>Employee</span>
          </Card>
        </Col>
      </Row>
    </Card>     
  </div>


  );
};

export default EmployeeDataCard;