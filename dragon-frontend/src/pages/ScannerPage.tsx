import React from 'react';
import { connect } from 'react-redux';
import BarcodeScanner from '../components/scanner/BarcodeScanner';
import ScannerLoading from '../components/scanner/ScannerLoading';
import ScannerError from '../components/scanner/ScannerError';
import { getBook as getBookAction, clearBookError as clearBookErrorAction } from '../actions/books';
import { RootState } from '../reducers';
import '../styles/scanner.css';
import BookScannedPage from './BookScannedPage';

const mapStateToProps = (state: RootState) => ({ books: state.books });
const dispatchProps = { getBook: getBookAction.request, clearBookError: clearBookErrorAction };

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;
type State = { isbn?: number };
class ScannerPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};

    this.onCodeScanned = this.onCodeScanned.bind(this);
    this.scanAgain = this.scanAgain.bind(this);
  }

  onCodeScanned(isbn: number) {
    const { getBook } = this.props;
    this.setState({ isbn });
    getBook({ isbn });
  }

  scanAgain() {
    const { isbn } = this.state;
    if (isbn) {
      const { clearBookError } = this.props;
      clearBookError({ isbn });
    }
    this.setState({ isbn: undefined });
  }

  render() {
    const { isbn } = this.state;
    const { books } = this.props;
    const currentBook = isbn ? books[isbn] : undefined;
    return (
      <>
        {!currentBook?.data && (
          <BarcodeScanner
            disabled={currentBook?.isFetching || currentBook?.error !== undefined}
            onDetected={this.onCodeScanned}
          />
        )}
        {isbn && currentBook?.isFetching && <ScannerLoading />}
        {isbn && currentBook?.error && (
          <ScannerError onScanAgain={this.scanAgain} error={currentBook.error} />
        )}
        {isbn && currentBook?.data && (
          <BookScannedPage book={currentBook?.data} onScanAgain={this.scanAgain} />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(ScannerPage);
