/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { getConfig, getDeviceId, changeDevice, hasTorch, toggleTorch } from '../../helpers/barcode';
import BarcodeModal from './BarcodeModal';
import SwitchIcon from './SwitchIcon';
import FlashlightIcon from './FlashlightIcon';
import KeyboardIcon from './KeyboardIcon';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Quagga = require('quagga');

type Props = {
  onDetected: (code: number) => void;
  disabled?: boolean;
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
    this.changeDevice = this.changeDevice.bind(this);
    this.toggleTorch = this.toggleTorch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.sound = new Audio('beep.mp3');
  }

  componentDidMount() {
    getDeviceId().then(({ id, numDevices }) => {
      this.setState({ canChangeDevice: numDevices > 1 });
      this.createScanner(id);
      this.startScanner();
    });
  }

  componentDidUpdate(nextProps: Props) {
    const { disabled } = this.props;
    if (disabled && nextProps.disabled) {
      this.scanner.addEventListener('processed', this.onCodeDetected);
    }
  }

  componentWillUnmount = () => {
    this.scanner.removeEventListener('processed', this.onCodeDetected);
    this.scanner.stop();
  };

  onCodeDetected(result: any) {
    const { onDetected, disabled } = this.props;
    if (!result || !result.codeResult) return;

    this.sound.play();
    const code = Number.parseInt(result.codeResult.code, 10);
    if (code !== Number.NaN && !disabled) {
      this.scanner.removeEventListener('processed', this.onCodeDetected);
      onDetected(code);
    }
  }

  createScanner(deviceId: string) {
    const config = getConfig(deviceId, '.viewport');
    this.scanner = Quagga.fromConfig(config);
  }

  startScanner() {
    this.scanner.addEventListener('processed', this.onCodeDetected);
    this.scanner.start().then(() => {
      this.setState({ initialized: true });
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
    const { onDetected, disabled } = this.props;
    return (
      <div>
        <div id="interactive" className="viewport mt-14" />
        {modal && <BarcodeModal onCodeEntered={onDetected} onClose={this.toggleModal} />}
        {initialized && !disabled && !modal && (
          <>
            <div className="relative w-full mt-14">
              <div className="flex justify-end">
                {hasTorch() && (
                  <button
                    type="button"
                    onClick={this.toggleTorch}
                    className="relative z-50 flex items-center p-3 m-3 mr-0 md:m-6 md:-mr-2 self-right bg-red-500 text-white border-2 border-white rounded-full shadow-xl focus:outline-none active:bg-red-400 md:hover:bg-red-400"
                  >
                    <FlashlightIcon className="block t-2 h-6 w-6 fill-current shadow-xl" />
                  </button>
                )}
                {canChangeDevice && (
                  <button
                    type="button"
                    onClick={this.changeDevice}
                    className="relative z-50 flex items-center p-3 m-3 mr-0 md:m-6 md:-mr-2 self-right bg-red-500 text-white border-2 border-white rounded-full shadow-xl focus:outline-none active:bg-red-400 md:hover:bg-red-400"
                  >
                    <SwitchIcon className="block t-2 h-6 w-6 fill-current" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={this.toggleModal}
                  className="relative z-50 flex items-center p-3 m-3 md:m-6 self-right bg-red-500 text-white border-2 border-white rounded-full shadow-xl focus:outline-none active:bg-red-400 md:hover:bg-red-400"
                >
                  <KeyboardIcon className="block t-2 h-6 w-6 fill-current" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default BarcodeScanner;
