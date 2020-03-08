import React from 'react';
import { Result, Row, Layout, Col, Button } from 'antd';
import { ScanOutlined, InfoCircleOutlined } from '@ant-design/icons';

const ScannerErrorPage: React.FC = () => (
  <Row align="middle" justify="space-around" style={{ minHeight: 400 }}>
    <Col>
      <Result
        status="error"
        title="Hi ha hagut un problema"
        subTitle={
          <>
            No s&apos;ha pogut registrar la venda de <i>Wilt</i>.
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

export default ScannerErrorPage;
