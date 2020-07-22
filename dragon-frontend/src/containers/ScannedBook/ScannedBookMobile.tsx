import React from 'react';
import { Row, Col, Button } from 'antd';
import { ScanOutlined, EuroOutlined } from '@ant-design/icons';
import Media from 'react-media';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Book } from '../../models/book';
import BookStats from '../../components/scanner/BookStats';
import '../../styles/scanner.css';

type Props = { book: Book; onScanAgain: () => void; onSell: () => void } & WithTranslation;
const ScannerBookMobile: React.FC<Props> = ({ book, onScanAgain, t }: Props) => {
  return (
    <Media query="(max-width: 719px)">
      <>
        <div className="scanner-mobile">
          <img alt="" src={book.coverUrl} />
          <h1>{book.title}</h1>
          <p>
            <i />
          </p>
          <BookStats book={book} />
        </div>
        <Row className="scanner-buttons-mobile" gutter={16}>
          <Col span={12}>
            <Button icon={<ScanOutlined />} size="large" block onClick={onScanAgain}>
              {t('scan.scan')}
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" icon={<EuroOutlined />} size="large" block>
              {t('scan.sell')}
            </Button>
          </Col>
        </Row>
      </>
    </Media>
  );
};

export default withTranslation()(ScannerBookMobile);
