import React from 'react';
import { Spin, Row, Col } from 'antd';

const ScannerLoading: React.FC = () => (
  <div
    style={{
      backgroundColor: 'grey',
      height: '100vh',
    }}
  >
    <Row
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', height: 'inherit' }}
      justify="space-around"
      align="middle"
    >
      <Col>
        <Spin tip="Buscant llibre..." size="large" />
      </Col>
    </Row>
  </div>
);

export default ScannerLoading;
