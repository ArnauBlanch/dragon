import React from 'react';
import { Row, Col, Button } from 'antd';
import { ScanOutlined, EuroOutlined } from '@ant-design/icons';
import Media from 'react-media';
import { Book } from '../../models/book';
import BookStats from '../../components/scanner/BookStats';
import '../../styles/scanner.css';

type Props = { book: Book; onScan: () => void; onSell: () => void };
const ScannerBookDesktop: React.FC<Props> = ({ book, onScan }: Props) => {
  return (
    <Media query="(min-width: 720px)">
      <div className="scanner-desktop">
        <Row justify="space-around" align="middle" className="scanner-row">
          <Col span={10}>
            <img alt="" src={book.coverUrl} />
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <h1>{book.title}</h1>
            <i>{book.author}</i>
            <BookStats book={book} />
            <Row gutter={16}>
              <Col span={12}>
                <Button icon={<ScanOutlined />} block>
                  Torna a escanejar
                </Button>
              </Col>
              <Col span={12}>
                <Button type="primary" icon={<EuroOutlined />} block onClick={onScan}>
                  Registra venda
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Media>
  );
};

export default ScannerBookDesktop;
