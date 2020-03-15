import React from 'react';
import { Row, Col, Statistic } from 'antd';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Book } from '../../models/book';

type Props = { book: Book } & WithTranslation;
const BookStats: React.FC<Props> = ({ book, t }: Props) => (
  <Row gutter={16} className="scanner-stats">
    <Col span={12}>
      <Statistic
        title={t('scan.price')}
        value={book.price}
        suffix={process.env.REACT_APP_CURRENCY_SYMBOL || '€'}
        precision={2}
      />
    </Col>
    <Col span={12}>
      <Statistic
        title={t('scan.available-copies')}
        value={book.availableCopies}
        suffix={`/ ${book.totalCopies}`}
      />
    </Col>
  </Row>
);

export default withTranslation()(BookStats);
