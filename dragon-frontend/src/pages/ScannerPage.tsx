/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Button, Row, Col, Spin } from 'antd';
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
    this.onCodeDetected = this.onCodeDetected.bind(this);
  }

  componentDidMount() {
    getDeviceId().then((id) => this.setState({ currentDevice: id }));
  }

  onCodeDetected(isbn: string) {
    this.setState({ isbn });
  }

  changeDevice() {
    changeDevice().then((newId) => this.setState({ currentDevice: newId }));
  }

  render() {
    const { isbn, currentDevice } = this.state;
    return (
      <>
        {currentDevice && !isbn && (
          <BarcodeScanner
            deviceId={currentDevice}
            onDetected={this.onCodeDetected}
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

        {isbn && (
          <div
            style={{
              height: '100vh',
            }}
          >
            <Row style={{ height: 'inherit' }} justify="space-around" align="middle">
              <Col>
                <Spin tip="Buscant llibre..." size="large" />
              </Col>
            </Row>
          </div>
        )}
      </>
    );
  }
}

export default ScannerPage;
