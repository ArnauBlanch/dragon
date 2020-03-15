/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ThunderboltOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { getConfig, getDeviceId, changeDevice, hasTorch, toggleTorch } from '../../helpers/barcode';

import SwitchCameraIcon from '../SwitchCameraIcon';
import BarcodeModal from './BarcodeModal';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Quagga = require('quagga');

type Props = {
  onDetected: (code: number) => void;
};
type State = { initialized: boolean; canChangeDevice: boolean; torchOn: boolean; modal: boolean };
class BarcodeScanner extends React.Component<Props, State> {
  scanner: any;

  scanUntilResult: any;

  sound: HTMLAudioElement;

  constructor(props: Props) {
    super(props);

    this.state = { initialized: false, canChangeDevice: false, torchOn: false, modal: false };

    this.createScanner = this.createScanner.bind(this);
    this.startScanner = this.startScanner.bind(this);
    this.onCodeDetected = this.onCodeDetected.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.changeDevice = this.changeDevice.bind(this);
    this.toggleTorch = this.toggleTorch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.sound = new Audio('beep.mp3');
  }

  componentDidMount() {
    getDeviceId().then(({ id, numDevices }) => {
      this.setState({ canChangeDevice: numDevices > 0 });
      this.createScanner(id);
      this.startScanner();
    });
  }

  componentWillUnmount = () => {
    this.scanner.removeEventListener('detected', this.onCodeDetected);
  };

  onCodeDetected(result: any) {
    const { onDetected } = this.props;
    this.sound.play();
    const code = Number.parseInt(result.codeResult.code, 10);
    if (code !== Number.NaN) {
      onDetected(code);
    }
  }

  onCancel(e: Event) {
    e.preventDefault();
    if (this.scanUntilResult.promise) {
      this.scanUntilResult.cancel();
      this.scanUntilResult = null;
    }
  }

  createScanner(deviceId: string) {
    const config = getConfig(deviceId, '.viewport');
    this.scanner = Quagga.fromConfig(config);
  }

  startScanner() {
    this.scanner.start().then(() => {
      this.setState({ initialized: true });
      this.scanUntilResult = this.scanner.toPromise();
      this.scanUntilResult.promise.then(this.onCodeDetected).catch(this.onCancel);
    });
  }

  changeDevice() {
    changeDevice().then((id) => {
      if (id) {
        this.scanner.stop();
        this.createScanner(id);
        this.startScanner();
      }
    });
  }

  toggleTorch() {
    const { torchOn } = this.state;
    toggleTorch(!torchOn);
    this.setState({ torchOn: !torchOn });
  }

  toggleModal() {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  }

  render() {
    const { initialized, canChangeDevice, modal } = this.state;
    const { onDetected } = this.props;
    return (
      <div>
        <div id="interactive" className="viewport" />
        {initialized && (
          <div className="button-row">
            {canChangeDevice && (
              <Button
                className="camera-button"
                shape="circle"
                size="large"
                onClick={this.changeDevice}
                icon={<SwitchCameraIcon />}
              />
            )}
            {hasTorch() && (
              <Button
                shape="circle"
                size="large"
                onClick={this.toggleTorch}
                icon={<ThunderboltOutlined />}
              />
            )}
            <Button
              size="large"
              shape="circle"
              icon={<EditOutlined />}
              onClick={this.toggleModal}
            />
            <BarcodeModal visible={modal} onCodeEntered={onDetected} onClose={this.toggleModal} />
          </div>
        )}
      </div>
    );
  }
}

export default BarcodeScanner;
