import React from 'react';
import { Row, Col, Statistic } from 'antd';
import { Book } from '../../models/book';

type Props = { book: Book };
const BookStats: React.FC<Props> = ({ book }: Props) => (
  <Row gutter={16} className="scanner-stats">
    <Col span={12}>
      <Statistic title="Preu" value={book.price} suffix="€" />
    </Col>
    <Col span={12}>
      <Statistic
        title="Exemplars disponibles"
        value={book.availableCopies}
        suffix={`/ ${book.totalCopies}`}
      />
    </Col>
  </Row>
);

export default BookStats;
