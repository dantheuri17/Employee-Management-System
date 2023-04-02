

import React, { useState } from 'react';
import { Bar } from '@ant-design/charts';

import { Layout, Row, Col, Card, Statistic, Table, Input, Button, Modal, Form } from 'antd';
import { Link } from 'react-router-dom';


const { Header, Content, Footer } = Layout;

function Home() {

  const data = [
    { year: '2015', sales: 100 },
    { year: '2016', sales: 200 },
    { year: '2017', sales: 300 },
    { year: '2018', sales: 400 },
    { year: '2019', sales: 500 },
    { year: '2020', sales: 600 },
  ];

  const barConfig = {
    data,
    xField: 'year',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: '#6495ED', color: 'white' }}></Header>
      <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
        <div className="site-layout-content" style={{ marginLeft: '1px' }}>
          <h1 style={{ textAlign: 'left' }}>Job statistics</h1>
          <Card size="medium" style={{ width: '40%', marginLeft: '1px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card bordered={true} size="small">
                  <Statistic
                    title={<span style={{ color: 'black', fontWeight: 'bold' }}>Total Employees</span>}
                    value={112893}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={true} size="small">
                  <Statistic
                    title={<span style={{ color: 'black', fontWeight: 'bold' }}>Resigned Employees</span>}
                    value={112893}
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card bordered={true} size="small">
                  <Statistic
                    title={<span style={{ color: 'black', fontWeight: 'bold' }}>Job view</span>}
                    value={112893}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={true} size="small">
                  <Statistic
                    title={<span style={{ color: 'black', fontWeight: 'bold' }}>Job Applied</span>}
                    value={112893}
                  />
                </Card>
              </Col>
            </Row>
          </Card>     
        </div>


        <div className="site-layout-content" style={{ paddingTop: '5px' }}>
          <Row justify="end">
            <Col span={12} style={{ marginTop: '3%' }}>
              <div style={{ textAlign: 'right' }}>
                <h2 style={{ textAlign: 'left' }}>Job Applications by Year</h2>
              </div>
              <Card size="small" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ textAlign: 'center' }}>
                  <Bar {...barConfig} />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ backgroundColor: '#6495ED', textAlign: 'center' }}>Dashboard ©2023 Created by Alexis</Footer>
    </Layout>
  );
}

export default Home;