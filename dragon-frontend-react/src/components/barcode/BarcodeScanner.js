import React, { Component } from "react";
import getConfig from './config';
import { withTranslation } from "react-i18next";

class BarcodeScanner extends Component {
  state = {
    torch: false,
    hasInitialized: false,
  };

  constructor(props) {
    super(props);
    this.createScanner(props.deviceId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.deviceId !== nextProps.deviceId) {
      this.scanner.stop();
      this.createScanner(nextProps.deviceId);
      this.startScanner();
    }
  }

  createScanner = (deviceId) => {
    const config = getConfig(deviceId)
    this.scanner = Quagga.config(config).fromSource({
      ...config.inputStream,
      target: ".viewport"
    });
  }

  startScanner = () => {
    this.scanner.start().then(() => {
      this.scanUntilResult = this.scanner.toPromise();
      this.scanUntilResult.promise.then(this._onDetected).catch(this._onCancel);
    });
  }

  componentDidMount = () => {
    this.startScanner();
  };
/*
  getActiveTrack = () => {
    const video = document.querySelector("video");
    if (video && video.srcObject) {
      const tracks = video.srcObject.getVideoTracks();
      if (tracks && tracks.length) {
        return tracks[0];
      }
    }
  };

  hasTorch = () => {
    const track = this.getActiveTrack();
    if (track) {
      const capabilities = track.getCapabilities();
      return capabilities ? capabilities.torch : false;
    }
    return false;
  };

  toggleTorch = () => {
    const track = this.getActiveTrack();
    const capabilities = track.getCapabilities();
    if (capabilities.torch)
      track.applyConstraints({ advanced: [{ torch: !this.state.torch }] });

    this.setState({ torch: !this.state.torch });
  };*/

  componentWillUnmount = () => {
    this.scanner.removeEventListener("detected", this._onDetected);
  };

  _onDetected = result => {
    this.props.onDetected(result.codeResult.code);
    console.log(result);
  };

  _onCancel = e => {
    e.preventDefault();
    if (this.scanUntilResult.promise) {
      this.scanUntilResult.cancel();
      this.scanUntilResult = null;
    }
  };

  render() {
    return (
      <React.Fragment>
        {/*this.state.hasInitialized && this.hasTorch() && (
          <Button
            type={this.state.torch ? "primary" : "default"}
            icon="thunderbolt"
            onClick={this.toggleTorch}
            style={{ margin: 20 }}
          >
            {this.props.t("scan.torch")}
          </Button>
        )*/}
        <div style={{ position: "relative" }}>
          <div id="interactive" className="viewport"></div>
          {this.props.overlay}
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(BarcodeScanner);
