import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { sellBook as sellBookAction } from '../../actions/sales';
import { RootState } from '../../reducers';
import Spinner from '../../components/Spinner';

interface OwnProps {
  isbn: number;
}

const mapStateToProps = (state: RootState, props: OwnProps) =>
  ({
    book: state.books[props.isbn]?.data,
    bookSold: state.books[props.isbn]?.sold,
    sales: state.sales[props.isbn],
  } || {});
const dispatchProps = { sellBook: sellBookAction.request, scanAgain: () => push('/scan') };

type Props = OwnProps & WithTranslation & ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const BookData: React.FC<Props> = ({
  isbn,
  book,
  bookSold,
  sales,
  scanAgain,
  sellBook,
  t,
}: Props) => {
  if (book === undefined) return <Redirect to="/scan" />;

  const enableSale = book?.availableCopies > 0 && !sales?.isSelling && !bookSold;
  return (
    <>
      <div className="w-full sm:w-1/3">
        <img className="w-5/12 sm:w-2/3 mx-auto my-8 shadow-2xl" alt="cover" src={book?.coverUrl} />
      </div>
      <div className="w-full sm:w-2/3 mb-4 px-6 text-center">
        <span className="px-2 py-1 bg-red-300 text-white text-xs font-semibold uppercase rounded-full">
          {book?.category}
        </span>
        <div className="mt-2 text-3xl font-bold leading-tight">{book?.title}</div>
        <div className="text-md mt-2 text-gray-700">{book?.author}</div>
        <table className="w-full mt-8">
          <thead>
            <tr>
              <th className="text-red-500 text-sm uppercase">{t('books.price')}</th>
              <th className="text-red-500 text-sm uppercase">{t('books.availability')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-3xl font-thin">{book?.price.toFixed(2).replace('.', ',')} €</td>
              <td className="text-2xl font-thin">
                {' '}
                {book?.availableCopies} / {book?.totalCopies}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="grid grid-cols-2 space-x-4 my-6 text-lg">
          <button
            type="button"
            onClick={scanAgain}
            className="bg-red-100 text-red-500 hover:bg-red-200 focus:outline-none focus:shadow-outline focus:border-red-500 font-semibold border border-red-500 p-2 rounded-lg inline-flex items-center justify-center"
          >
            <span className="inline-block align-middle">{t('scan.scan-again')}</span>
          </button>
          <button
            type="button"
            disabled={!enableSale}
            onClick={() => sellBook({ isbn })}
            className="bg-red-500 hover:bg-red-400 disabled:bg-red-500 focus:outline-none focus:shadow-outline focus:border-red-500 text-white font-semibold p-2 rounded-lg align-middle inline-flex items-center justify-center"
          >
            {!bookSold && book?.availableCopies === 0 && t('scan.sold-out')}
            {sales?.isSelling && <Spinner className="w-10" />}
            {enableSale && t('scan.record-sale')}
            {bookSold && t('scan.sell-done')}
          </button>
        </div>
      </div>

      <div className="text-left text-sm text-gray-700 mt-2 m-6" />
    </>
  );
};

export default withTranslation()(connect(mapStateToProps, dispatchProps)(BookData));
