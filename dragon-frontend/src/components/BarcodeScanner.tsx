/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { getConfig } from '../helpers/barcode';
import { playSound } from '../helpers/sound';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Quagga = require('quagga');

type Props = { deviceId: string; onDetected: (code: string) => void; overlay?: React.ReactNode };
class BarcodeScanner extends React.Component<Props> {
  scanner: any;

  scanUntilResult: any;

  sound: HTMLAudioElement;

  constructor(props: Props) {
    super(props);
    this.createScanner = this.createScanner.bind(this);
    this.startScanner = this.startScanner.bind(this);
    this.onCodeDetected = this.onCodeDetected.bind(this);
    this.onCancel = this.onCancel.bind(this);

    const { deviceId } = props;
    this.createScanner(deviceId);
    this.sound = new Audio('beep.mp3');
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
    this.sound.play();

    onDetected(result.codeResult.code);
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
      this.scanUntilResult.promise.then(this.onCodeDetected).catch(this.onCancel);
    });
  }

  createScanner(deviceId: string) {
    const config = getConfig(deviceId, '.viewport');
    this.scanner = Quagga.fromConfig(config);
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
