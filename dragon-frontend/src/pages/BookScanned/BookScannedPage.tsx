import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import BookData from './BookData';
import SalesHistory from './SalesHistory';

interface RouteParams {
  isbn: string;
}

type Props = RouteComponentProps<RouteParams> & WithTranslation;

const BookScannedPage: React.FC<Props> = ({ match, t }: Props) => {
  const isbnCode = parseInt(match.params.isbn, 10);

  return (
    <div className="flex flex-wrap items-center -mb-4 sm:max-w-4xl mx-auto sm:mt-6 select-none pb-8">
      <BookData isbn={isbnCode} />
      <SalesHistory isbn={isbnCode} />
    </div>
  );
};

export default withTranslation()(BookScannedPage);
