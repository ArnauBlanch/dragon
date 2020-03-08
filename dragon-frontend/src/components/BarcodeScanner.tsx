/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { getConfig } from '../helpers/barcode';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Quagga = require('quagga');

type Props = { deviceId: string; onDetected: (code: string) => void; overlay?: React.ReactNode };
class BarcodeScanner extends React.Component<Props> {
  scanner: any;

  scanUntilResult: any;

  constructor(props: Props) {
    super(props);
    this.createScanner = this.createScanner.bind(this);
    this.startScanner = this.startScanner.bind(this);
    this.onCodeDetected = this.onCodeDetected.bind(this);
    this.onCancel = this.onCancel.bind(this);

    const { deviceId } = props;
    this.createScanner(deviceId);
  }

  componentDidMount() {
    this.startScanner();
  }

  componentDidUpdate(prevProps: Props) {
    const { deviceId } = this.props;
    if (prevProps.deviceId !== deviceId) {
      this.scanner.stop();
      this.createScanner(deviceId);
      this.startScanner();
    }
  }

  componentWillUnmount = () => {
    this.scanner.removeEventListener('detected', this.onCodeDetected);
  };

  onCodeDetected(result: any) {
    const { onDetected } = this.props;
    onDetected(result.codeResult.code);
    console.log(result);
  }

  onCancel(e: Event) {
    e.preventDefault();
    if (this.scanUntilResult.promise) {
      this.scanUntilResult.cancel();
      this.scanUntilResult = null;
    }
  }

  startScanner() {
    this.scanner.start().then(() => {
      this.scanUntilResult = this.scanner.toPromise();
      // this.scanUntilResult.promise.then(this.onCodeDetected).catch(this.onCancel);
    });
  }

  createScanner(deviceId: string) {
    const config = getConfig(deviceId);
    this.scanner = Quagga.config(config).fromSource({
      ...config.inputStream,
      target: '.viewport',
    });
  }

  render() {
    const { overlay } = this.props;
    return (
      <div>
        <div id="interactive" className="viewport" />
        {overlay}
      </div>
    );
  }
}

export default BarcodeScanner;
