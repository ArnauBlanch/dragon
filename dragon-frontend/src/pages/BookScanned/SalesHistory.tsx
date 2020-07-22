import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  getBookSales as getBookSalesAction,
  unsellBook as unsellBookAction,
} from '../../actions/sales';
import { RootState } from '../../reducers';
import Spinner from '../../components/Spinner';

interface OwnProps {
  isbn: number;
}

const mapStateToProps = (state: RootState, props: OwnProps) => state.sales[props.isbn] || {};
const dispatchProps = {
  getBookSales: getBookSalesAction.request,
  unsellBook: unsellBookAction.request,
};

type Props = OwnProps & WithTranslation & ReturnType<typeof mapStateToProps> & typeof dispatchProps;

class SalesHistory extends React.Component<Props> {
  componentDidMount() {
    const { isbn, getBookSales } = this.props;
    getBookSales({ isbn });
  }

  render() {
    const { t, isbn, isFetching, isSelling, data, error, unsellBook } = this.props;

    return (
      <div className="m-6 mb-2 w-full">
        <div className="text-red-500 font-semibold mb-2">{t('scan.sales-history')}</div>
        <div className="flex flex-wrap">
          {(isFetching || error !== undefined || (data !== undefined && data.length === 0)) && (
            <div className="flex items-center justify-center h-24 w-full font-normal text-gray-600 text-sm">
              {isFetching && data === undefined && <Spinner className="w-12 text-red-300" />}
              {data && data.length === 0 && t('scan.no-sales')}
              {error !== undefined && t('scan.there-was-a-problem')}
            </div>
          )}

          {!error &&
            data?.map((x) => (
              <div
                key={x.date.toISOString()}
                className="w-full flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-gray-100"
              >
                <div>
                  {x.date.toISOString()}{' '}
                  <span className="text-gray-600 font-thin text-sm ml-2 uppercase tracking-tighter">
                    {x.seller}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={isFetching || isSelling}
                  onClick={() => unsellBook({ isbn, date: x.date })}
                  className="right-auto hover:bg-red-500 rounded-md hover:text-white text-sm py-1 px-3 font-semibold focus:outline-none border border-red-500 text-red-500 bg-red-100"
                >
                  {t('scan.undo-sale')}
                </button>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default withTranslation()(connect(mapStateToProps, dispatchProps)(SalesHistory));
