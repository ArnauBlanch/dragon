import React from 'react';
import { Spin, Row, Col } from 'antd';
import { WithTranslation, withTranslation } from 'react-i18next';

type Props = WithTranslation;
const ScannerLoading: React.FC<Props> = ({ t }: Props) => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <Row
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', height: 'inherit' }}
      justify="space-around"
      align="middle"
    >
      <Col>
        <Spin tip={t('scan.searching-book')} size="large" />
      </Col>
    </Row>
  </div>
);

export default withTranslation()(ScannerLoading);
