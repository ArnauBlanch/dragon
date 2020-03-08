import React from 'react';
import { Row, Col, Card, PageHeader, Affix, Button, Statistic, Progress, Layout } from 'antd';
import '../styles/scanner.css';
import { ScanOutlined, EuroOutlined } from '@ant-design/icons';
import Media from 'react-media';

const ScannerFoundPage: React.FC = () => (
  <>
    <Media query="(max-width: 719px)">
      <>
        <div className="scanner-mobile">
          <img alt="" src="https://images-na.ssl-images-amazon.com/images/I/71jvSNnYONL.jpg" />
          <h1>Wilt</h1>
          <p>
            <i>Tom Sharpe</i>
          </p>
          <Row className="scanner-stats">
            <Col span={12}>
              <Statistic title="Preu" value={12.75} suffix="€" />
            </Col>
            <Col span={12}>
              <Statistic title="Exemplars disponibles" value={1} suffix="/ 4" />
            </Col>
          </Row>
        </div>
        <Row className="scanner-buttons-mobile" gutter={16}>
          <Col span={12}>
            <Button icon={<ScanOutlined />} size="large" block>
              Escanejar
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" icon={<EuroOutlined />} size="large" block>
              Vendre
            </Button>
          </Col>
        </Row>
      </>
    </Media>
    <Media query="(min-width: 720px)">
      <div className="scanner-desktop">
        <Row justify="space-around" align="middle" className="scanner-row">
          <Col span={10}>
            <img alt="" src="https://images-na.ssl-images-amazon.com/images/I/71jvSNnYONL.jpg" />
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <h1>Wilt</h1>
            <i>Tom Sharpe</i>
            <Row gutter={16} className="scanner-stats">
              <Col span={12}>
                <Statistic title="Preu" value={12.75} suffix="€" />
              </Col>
              <Col span={12}>
                <Statistic title="Exemplars disponibles" value={1} suffix="/ 4" />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Button icon={<ScanOutlined />} block>
                  Torna a escanejar
                </Button>
              </Col>
              <Col span={12}>
                <Button type="primary" icon={<EuroOutlined />} block>
                  Registra venda
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Media>
  </>
);

export default ScannerFoundPage;
