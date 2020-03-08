import React from 'react';
import { Result, Row, Layout, Col, Button } from 'antd';
import { ScanOutlined, InfoCircleOutlined } from '@ant-design/icons';

const ScannerSuccessPage: React.FC = () => (
  <Row align="middle" justify="space-around" style={{ minHeight: 400 }}>
    <Col>
      <Result
        status="success"
        title="Llibre venut!"
        subTitle={
          <>
            La venda de <i>Wilt</i> ha estat registrada correctament.
          </>
        }
        extra={[
          <Button icon={<ScanOutlined />} type="primary" key="scan">
            Escaneja un altre llibre
          </Button>,
          <Button icon={<InfoCircleOutlined />} key="info">
            Veure informació del llibre
          </Button>,
        ]}
      />
    </Col>
  </Row>
);

export default ScannerSuccessPage;
