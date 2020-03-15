import React from 'react';
import { connect } from 'react-redux';
import BarcodeScanner from '../components/scanner/BarcodeScanner';
import ScannerLoading from '../components/scanner/ScannerLoading';
import ScannerError from '../components/scanner/ScannerError';
import ScannedBook from '../containers/ScannedBook';
import { getBook as getBookAction } from '../actions/books';
import { RootState } from '../reducers';
import '../styles/scanner.css';

const mapStateToProps = (state: RootState) => ({ books: state.books });
const dispatchProps = { getBook: getBookAction.request };

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
    this.setState({ isbn: undefined });
  }

  render() {
    const { isbn } = this.state;
    const { books } = this.props;
    const currentBook = isbn ? books[isbn] : undefined;
    return (
      <>
        {!isbn && <BarcodeScanner onDetected={this.onCodeScanned} />}
        {isbn && currentBook?.isFetching && <ScannerLoading />}
        {isbn && currentBook?.error && (
          <ScannerError onScanAgain={this.scanAgain} error={currentBook.error} />
        )}
        {isbn && currentBook?.data && (
          <ScannedBook book={currentBook?.data} onScanAgain={this.scanAgain} />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(ScannerPage);
