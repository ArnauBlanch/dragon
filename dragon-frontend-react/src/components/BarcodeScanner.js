import React, { Component } from 'react';
import Quagga from 'quagga';
import { Button } from 'antd';
import { withTranslation } from 'react-i18next';

class BarcodeScanner extends Component {
    state = { torch: false, hasInitialized: false }

    constructor(props) {
        super(props)
        this.scanner = Quagga
            .config(this.getConfig())
            .fromSource({ ...this.getConfig().inputStream, target: '.viewport' })
    }

    getConfig = () => ({
            frequency: 5,
            numOfWorkers: 2,
            locate: true,
            inputStream: {
                name: "Live",
                type: "LiveStream",
                constraints: {
                    width: 800,
                    height: 600,
                    deviceId: 0,
                    facingMode: "environment",
                },
                area: {
                    top: "0%",
                    right: "0%",
                    left: "0%",
                    bottom: "0%",
                },
            },
            decoder: {
                readers: ['ean_reader'],
            },
            locator: {
                halfSample: true,
                patchSize: "medium",
            },
        })
    
    getWidthAndHeight = () => {
        const { offsetWidth } = document.querySelector('#' + this.props.containerId)
        return { height: offsetWidth, width: offsetWidth }
    }

    componentDidMount = () => {
        this.scanUntilResult = this.scanner.toPromise()
        this.scanUntilResult.promise
            .then(this._onDetected)
            .catch(this._onCancel)
        this.setState({ hasInitialized: true })
    }

    hasTorch = () => {
        const track = Quagga.CameraAccess.getActiveTrack()
        if (track) {
            const capabilities = track.getCapabilities()
            return capabilities ? capabilities.torch : false
        }
        return false
    }

    toggleTorch = () => {
        const track = Quagga.CameraAccess.getActiveTrack()
        const capabilities = track.getCapabilities()
        if (capabilities.torch)
            track.applyConstraints({ advanced: [{ torch: !this.state.torch }] })

        this.setState({ torch: !this.state.torch })
    }

    componentWillUnmount = () => {
        this.scanner.removeEventListener('detected', this._onDetected)
    }

    _onDetected = (result) => {
        this.props.onDetected(result.codeResult.code);
    }

    _onCancel = e => {
        e.preventDefault()
        if (this.scanUntilResult.promise) {
            this.scanUntilResult.cancel()
            this.scanUntilResult = null
        }
    }

    render() {
        return (
            <React.Fragment>
                { //this.state.hasInitialized && this.hasTorch() &&
                    <Button
                        type={this.state.torch ? "primary" : "default"}
                        icon="thunderbolt"
                        onClick={this.toggleTorch}
                        style={{ margin: 20 }}>
                        {this.props.t('scan.torch')}
                    </Button> }
                <div style={{ position: 'relative' }}>
                    <div id="interactive" className="viewport" style={{ display: 'block', maxWidth: 500 }}></div>
                    {this.props.overlay}
                </div>
            </React.Fragment>
        );
    }
}

export default withTranslation()(BarcodeScanner);