
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';

function EmployeeDataCard(){

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/employees')
    .then(response => response.json())
    .then(data => setEmployeeData(data))
    .catch(error => console.error(error));
    }, []);

  const totalEmployees = employeeData.length;
  const resignedEmployees = employeeData.filter(employee => employee.employeeStatus === "Resigned").length;
  const fullTimeEmployees = employeeData.filter(employee => employee.employementType === "Fulltime").length;
  const partTimeEmployees = employeeData.filter(employee => employee.employementType === "Parttime").length;

  return (
    <div className="site-layout-content" style={{ marginLeft: '1px', marginTop: '70px'}}>
    <h3 style={{ fontWeight: 'bold', textAlign: 'left' }}>Job Statistics</h3>
    <Card size="medium" style={{ width: '45%', marginLeft: '2px'}}>
      <Row gutter={12}>
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
      <Row gutter={12}>
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
