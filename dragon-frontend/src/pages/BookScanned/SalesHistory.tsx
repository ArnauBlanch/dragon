import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getBookSales as getBookSalesAction } from '../../actions/sales';
import { RootState } from '../../reducers';

interface OwnProps {
  isbn: number;
}

const mapStateToProps = (state: RootState, props: OwnProps) => state.sales[props.isbn];
const dispatchProps = { getBookSales: getBookSalesAction.request };

type Props = OwnProps & WithTranslation & ReturnType<typeof mapStateToProps> & typeof dispatchProps;

class SalesHistory extends React.Component<Props> {
  componentDidMount() {
    const { isbn, getBookSales } = this.props;
    getBookSales({ isbn });
  }

  render() {
    const { t } = this.props;

    return (
      <div className="m-6 mb-2 w-full">
        <div className="text-red-500 font-semibold mb-2">{t('scan.sales-history')}</div>
        <div className="flex flex-wrap">
          <div className="">
            <img src="spinner.svg" alt="Loading..." />
          </div>
          {/*
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
          </div> */}
        </div>
      </div>
    );
  }
}

export default withTranslation()(connect(mapStateToProps, dispatchProps)(SalesHistory));
