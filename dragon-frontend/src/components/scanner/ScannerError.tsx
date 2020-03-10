/* eslint-disable quotes */
import React from 'react';
import { Result, Row, Layout, Col, Button } from 'antd';
import { ScanOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { ErrorType } from '../../models/enums';

type Props = { error: ErrorType; onScanAgain: () => void };
const ScannerError: React.FC<Props> = ({ error, onScanAgain }: Props) => (
  <Row align="middle" justify="space-around" style={{ minHeight: 400 }}>
    <Col>
      <Result
        status={error === ErrorType.NotFound ? 'warning' : 'error'}
        title={
          error === ErrorType.NotFound ? "No s'ha trobat el llibre" : 'Hi ha hagut un problema'
        }
        subTitle={
          error !== ErrorType.NotFound && (
            <>No s&apos;ha pogut registrar la venda d&apos;aquest llibre.</>
          )
        }
        extra={[
          <Button icon={<ScanOutlined />} type="primary" key="scan" onClick={onScanAgain}>
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

export default ScannerError;
