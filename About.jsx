import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { each, groupBy } from '@antv/util';

import { Layout, Row, Col, Card } from 'antd';

const { Header, Content, Footer } = Layout;

const About = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const annotations = [];
  each(groupBy(data, 'year'), (values, k) => {
    const value = values.reduce((a, b) => a + b.value, 0);
    annotations.push({
      type: 'text',
      position: [k, value],
      content: `${value}`,
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: 'rgba(0,0,0,0.85)',
      },
      offsetY: -10,
    });
  });

  const config = {
    data,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
    annotations,
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="site-layout-background" style={{ background: '#A9A9A9', padding: 0 }}>
        {/* Your header components go here */}
      </Header>
      <Content style={{ margin: '0 16px' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Data" hoverable style={{ height: '100%' }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card hoverable style={{ marginBottom: 16 }}>
                      <p style={{ fontWeight: 'bold' }}>Total Jobs</p>
                      <h3 style={{ fontWeight: 'bold' }}>500</h3>
                    </Card>
                    <Card hoverable>
                      <p style={{ fontWeight: 'bold' }}>Total Applicants</p>
                      <h3 style={{ fontWeight: 'bold' }}>1000</h3>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card hoverable style={{ marginBottom: 16 }}>
                      <p style={{ fontWeight: 'bold' }}>Active Jobs</p>
                      <h3 style={{ fontWeight: 'bold' }}>250</h3>
                    </Card>
                    <Card hoverable>
                      <p style={{ fontWeight: 'bold' }}>Active Applicants</p>
                      <h3 style={{ fontWeight: 'bold' }}>500</h3>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Monthly Job Statistics" hoverable style={{ height: '100%' }}>
                <Column {...config} />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>APP4035 ©2023 Created by Group1</Footer>
    </Layout>
  );
};

export default About;
