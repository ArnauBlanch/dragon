/* eslint-disable quotes */
import React from 'react';
import { Result, Row, Col, Button } from 'antd';
import { ScanOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { withTranslation, WithTranslation } from 'react-i18next';
import { ErrorType } from '../../models/enums';

type Props = { error?: ErrorType; onScanAgain: () => void } & WithTranslation;
const ScannerError: React.FC<Props> = ({ error, onScanAgain, t }: Props) => (
  <Row align="middle" justify="space-around" style={{ minHeight: 400 }}>
    <Col>
      <Result
        status={error === ErrorType.NotFound ? 'warning' : 'error'}
        title={
          error === ErrorType.NotFound ? t('scan.book-not-found') : t('scan.there-was-a-problem')
        }
        subTitle={
          error !== ErrorType.NotFound && (
            <>No s&apos;ha pogut registrar la venda d&apos;aquest llibre.</>
          )
        }
        extra={[
          <Button icon={<ScanOutlined />} type="primary" key="scan" onClick={onScanAgain}>
            {t('scan.scan-again')}
          </Button>,
          <Button icon={<InfoCircleOutlined />} key="info">
            Veure informació del llibre
          </Button>,
        ]}
      />
    </Col>
  </Row>
);

export default withTranslation()(ScannerError);
