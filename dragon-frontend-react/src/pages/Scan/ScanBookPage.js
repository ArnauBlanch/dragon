import React from 'react';
import { Layout, PageHeader, Alert, Spin, Result } from 'antd';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getBook } from '../../actions';
import BarcodeScanner from '../../components/BarcodeScanner';

const verticalCenterStyle = {
    margin: 0,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
}

class ScanBookPage extends React.Component {
    state = { isbn: null }

    searchBook = (isbn) => {
        if (!this.state.isbn) {
            this.props.dispatch(getBook('arnau-test', isbn));
            this.setState({ isbn })
        }
    }

    render() {
        const { t, books } = this.props;
        const { isbn } = this.state;
        return (
            <React.Fragment>
                <div style={{ width: '100%', background: '#fff' }}>
                    <PageHeader
                        title={t('scan.scan')}
                        style={{ maxWidth: 1200, margin: 'auto' }} />
                </div>
                <Layout.Content style={{ margin: '24px auto 24px auto', textAlign: 'center', background: '#fff', padding: 24, maxWidth: '1200px' }}>
                    <div style={{ width: '100%', maxWidth: 500, margin: 'auto' }}>
                        <Alert message={t('scan.instructions')} type="info" showIcon />
                    </div>
                    <div id="camera-container" style={{ maxWidth: 500, margin: 'auto', textAlign: 'center' }}>
                        <div>
                        <BarcodeScanner
                            containerId="camera-container"
                            onDetected={this.searchBook}
                            overlay={ isbn && books[isbn] &&
                                <div className="overlay" style={{ 
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    zIndex: 0,
                                    background: 'rgba(255, 255, 255, 0.3)'
                                }}>
                                    { books[isbn].isFetching && <Spin style={verticalCenterStyle} size="large" /> }
                                    { books[isbn].data &&
                                        <Result
                                            status="success"
                                            title={books[isbn].data.title}
                                            subtitle={books[isbn].data.author} />}
                                </div>
                            } />
                        </div>
                    </div>
                </Layout.Content>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({ books: state.books });

export default withTranslation()(connect(mapStateToProps)(ScanBookPage))