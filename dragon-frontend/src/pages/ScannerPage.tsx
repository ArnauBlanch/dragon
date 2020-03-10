/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Button, Row, Col, Spin } from 'antd';
import { connect } from 'react-redux';
import { ThunderboltOutlined } from '@ant-design/icons';
import { getDeviceId, changeDevice, hasTorch, toggleTorch } from '../helpers/barcode';
import BarcodeScanner from '../components/scanner/BarcodeScanner';
import SwitchCameraIcon from '../components/SwitchCameraIcon';
import { RootState } from '../reducers';
import { getBook as getBookAction } from '../actions/books';
import '../styles/scanner.css';
import ScannerLoading from '../components/scanner/ScannerLoading';
import ScannerError from '../components/scanner/ScannerError';
import ScannedBook from '../containers/ScannedBook';

const mapStateToProps = (state: RootState) => ({ books: state.books });
const dispatchProps = { getBook: getBookAction.request };

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;
type State = { currentDevice?: string; isbn?: number; initialized: boolean; torch: boolean };
class ScannerPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { initialized: false, torch: false };

    this.changeDevice = this.changeDevice.bind(this);
    this.onCodeDetected = this.onCodeDetected.bind(this);
    this.scanAgain = this.scanAgain.bind(this);
    this.onInitialized = this.onInitialized.bind(this);
    this.toggleTorch = this.toggleTorch.bind(this);
  }

  componentDidMount() {
    getDeviceId().then((id) => this.setState({ currentDevice: id }));
  }

  onCodeDetected(code: string) {
    const { getBook } = this.props;
    const isbn = Number.parseInt(code, 10);
    if (isbn !== Number.NaN) {
      this.setState({ isbn });
      getBook({ isbn });
    }
  }

  onInitialized() {
    const { torch } = this.state;
    this.setState({ initialized: true });
    toggleTorch(torch);
  }

  changeDevice() {
    changeDevice().then((newId) => this.setState({ currentDevice: newId }));
  }

  scanAgain() {
    this.setState({ isbn: undefined, initialized: false });
  }

  toggleTorch() {
    const { torch } = this.state;
    toggleTorch(!torch);
    this.setState({ torch: !torch });
  }

  render() {
    const { isbn, currentDevice } = this.state;
    const { books } = this.props;
    return (
      <>
        {currentDevice && !isbn && (
          <BarcodeScanner
            deviceId={currentDevice}
            onDetected={this.onCodeDetected}
            onInitialized={this.onInitialized}
            overlay={
              <>
                <Button
                  className="camera-button"
                  shape="circle"
                  size="large"
                  onClick={this.changeDevice}
                  icon={<SwitchCameraIcon />}
                />
                {hasTorch() && (
                  <Button
                    className="torch-button"
                    shape="circle"
                    size="large"
                    onClick={this.toggleTorch}
                    icon={<ThunderboltOutlined />}
                  />
                )}
              </>
            }
          />
        )}

        {isbn && books[isbn]?.isFetching && <ScannerLoading />}
        {isbn && books[isbn]?.error && (
          <ScannerError onScanAgain={this.scanAgain} error={books[isbn]?.error} />
        )}
        {isbn && books[isbn]?.data && (
          <ScannedBook book={books[isbn]?.data} onScan={this.scanAgain} />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(ScannerPage);
