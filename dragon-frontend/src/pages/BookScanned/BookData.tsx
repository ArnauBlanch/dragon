import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Book } from '../../models/book';

type Props = {
  book: Book;
  onScanAgain: () => void;
} & WithTranslation;

const BookData: React.FC<Props> = ({ book, onScanAgain, t }: Props) => (
  <>
    <div className="w-full sm:w-1/3">
      <img className="w-5/12 sm:w-2/3 mx-auto my-8 shadow-2xl" alt="cover" src={book.coverUrl} />
    </div>
    <div className="w-full sm:w-2/3 mb-4 px-6 text-center">
      <span className="px-2 py-1 bg-red-300 text-white text-xs font-semibold uppercase rounded-full">
        {book.category}
      </span>
      <div className="mt-2 text-3xl font-bold leading-tight">{book.title}</div>
      <div className="text-md mt-2 text-gray-700">{book.author}</div>
      <table className="w-full mt-8">
        <thead>
          <tr>
            <th className="text-red-500 text-sm uppercase">{t('books.price')}</th>
            <th className="text-red-500 text-sm uppercase">{t('books.availability')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-3xl font-thin">{book.price.toFixed(2).replace('.', ',')} €</td>
            <td className="text-2xl font-thin">
              {' '}
              {book.availableCopies} / {book.totalCopies}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="grid grid-cols-2 space-x-4 my-6 text-lg">
        <button
          type="button"
          onClick={onScanAgain}
          className="bg-red-100 text-red-500 hover:bg-red-200 focus:outline-none focus:shadow-outline focus:border-red-500 font-semibold border border-red-500 p-2 rounded-lg inline-flex items-center justify-center"
        >
          <span className="inline-block align-middle">{t('scan.scan-again')}</span>
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-400 focus:outline-none focus:shadow-outline focus:border-red-500 text-white font-semibold p-2 rounded-lg align-middle inline-flex items-center justify-center"
        >
          {t('scan.record-sale')}
        </button>
      </div>
    </div>

    <div className="text-left text-sm text-gray-700 mt-2 m-6" />
  </>
);

export default withTranslation()(BookData);
