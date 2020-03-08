/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Button } from 'antd';
import { getDeviceId, changeDevice } from '../helpers/barcode';
import BarcodeScanner from '../components/BarcodeScanner';
import SwitchCameraIcon from '../components/SwitchCameraIcon';
import '../styles/scanner.css';

type State = { currentDevice?: string; isbn?: string };
class ScannerPage extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {};

    this.changeDevice = this.changeDevice.bind(this);
  }

  componentDidMount() {
    getDeviceId().then((id) => this.setState({ currentDevice: id }));
  }

  changeDevice() {
    changeDevice().then((newId) => this.setState({ currentDevice: newId }));
  }

  render() {
    return (
      <>
        {this.state.currentDevice && (
          <BarcodeScanner
            deviceId={this.state.currentDevice}
            onDetected={console.log}
            overlay={
              <Button
                className="camera-button"
                shape="circle"
                size="large"
                onClick={this.changeDevice}
                icon={<SwitchCameraIcon />}
              />
            }
          />
        )}
      </>
    );
  }
}

export default ScannerPage;
