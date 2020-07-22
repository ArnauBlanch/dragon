import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Book } from '../models/book';

type Props = { book: Book; onScanAgain: () => void } & WithTranslation;

const BookScannedPage: React.FC<Props> = ({ book, onScanAgain, t }: Props) => (
  <div className="flex flex-wrap items-center -mb-4 sm:max-w-4xl mx-auto sm:mt-6 select-none pb-8">
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

    <div className="m-6 mb-2 w-full">
      <div className="text-red-500 font-semibold mb-2">{t('scan.sales-history')}</div>
      <div className="flex flex-wrap">
        <div className="w-full flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-gray-100">
          <div>
            24/04/20 12:23{' '}
            <span className="text-gray-600 font-thin text-sm ml-2 uppercase tracking-tighter">
              Beatrice
            </span>
          </div>
          <button
            type="button"
            className="right-auto hover:bg-red-500 rounded-md hover:text-white text-sm py-1 px-3 font-semibold focus:outline-none border border-red-500 text-red-500 bg-red-100"
          >
            Undo
          </button>
        </div>
        <div className="w-full flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-gray-100">
          <div>
            24/04/20 18:55{' '}
            <span className="text-gray-600 font-thin text-sm ml-2 uppercase tracking-tighter">
              Andrew
            </span>
          </div>
          <button
            type="button"
            className="right-auto hover:bg-red-500 rounded-md hover:text-white text-sm py-1 px-3 font-semibold focus:outline-none border border-red-500 text-red-500 bg-red-100"
          >
            Undo
          </button>
        </div>
        <div className="w-full flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-gray-100">
          <div>
            25/04/20 09:30{' '}
            <span className="text-gray-600 font-thin text-sm ml-2 uppercase tracking-tighter">
              Shaun
            </span>
          </div>
          <button
            type="button"
            className="right-auto hover:bg-red-500 rounded-md hover:text-white text-sm py-1 px-3 font-semibold focus:outline-none border border-red-500 text-red-500 bg-red-100"
          >
            Undo
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default withTranslation()(BookScannedPage);
