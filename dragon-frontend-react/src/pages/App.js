import React from 'react';
import { Layout, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import BookListPage from './Books/BookListPage';
import ListShopsPage from './Shops/ListShopsPage';
import MobileDrawer from '../components/MobileDrawer';
import { Route } from 'react-router-dom';
import Media from 'react-media';

import './style.css';
import MobileHeader from '../components/MobileHeader';
import DesktopHeader from '../components/DesktopHeader';
const { Footer } = Layout;

const routes = [
    <Route key="books" path="/books" component={BookListPage} />,
    <Route key="shops" path="/shops" component={ListShopsPage} />
];

class App extends React.Component {
    state = { showSideMenu: false }
    toggleSideMenu = () => this.setState({ showSideMenu: !this.state.showSideMenu })

    render() {
        if (!this.props.isAuthenticated) {
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: { referer: this.props.location.pathname }
                }} />
            )
        }
        const pathParts = this.props.location.pathname.split('/')
        const currentPath = pathParts.length >= 2 && pathParts[1] !== '' ? pathParts[1] : 'home'
        return (
            <Layout style={{ height: '100vh' }}>
                <Media query="(max-width: 599px)" onChange={() => this.setState({ showSideMenu: false })}>
                    <MobileDrawer
                        show={this.state.showSideMenu}
                        handleClose={() => this.setState({ showSideMenu: false })}
                        currentPath={currentPath} />
                </Media>
                <Layout>
                    <Media query="(max-width: 599px)">
                        { matches => matches ?
                            <MobileHeader showSideMenu={this.state.showSideMenu} toggleSideMenu={this.toggleSideMenu} />
                            :
                            <DesktopHeader currentPath={currentPath} /> 
                        }
                    </Media>
                    <div style={{ marginTop: 64 }}>
                        {routes}
                    </div>
                    <Footer style={{ textAlign: 'center' }}>
                        Agrupament Escolta i Guia Pinya de Rosa  © {new Date().getFullYear()}
                        <br/><span style={{ fontSize: 13 }}>Made with ❤ by&nbsp;
                        <a href="https://github.com/ArnauBlanch" target="_blank" rel="noopener noreferrer">
                            <Icon type="github" /> ArnauBlanch
                        </a></span>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({ isAuthenticated: state.user.isAuthenticated })

export default withRouter(connect(mapStateToProps)(App));