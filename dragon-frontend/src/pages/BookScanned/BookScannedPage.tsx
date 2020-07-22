import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Book } from '../../models/book';
import BookData from './BookData';

type Props = { book: Book; onScanAgain: () => void } & WithTranslation;

const BookScannedPage: React.FC<Props> = ({ book, onScanAgain, t }: Props) => (
  <div className="flex flex-wrap items-center -mb-4 sm:max-w-4xl mx-auto sm:mt-6 select-none pb-8">
    <BookData book={book} onScanAgain={onScanAgain} />
  </div>
);

export default withTranslation()(BookScannedPage);
