import React from 'react';
import { Layout, Icon, Drawer } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import BookListPage from './Books/BookListPage';
import SiderMenu from '../components/SiderMenu';
import { Route } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import './style.css';
const { Header, Content, Footer } = Layout;

class App extends React.Component {
    state = { collapsed: false }
    toggle = () => this.setState({ collapsed: !this.state.collapsed })

    render() {
        if (!this.props.isAuthenticated) {
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: { referer: this.props.location.pathname }
                }} />
            )
        }
        const selectedKeys = [this.props.location.pathname]
        return (
            <Layout style={{ height: '100vh' }}>
                <MediaQuery maxWidth={599}>
                    <Drawer
                        placement="left"
                        closable={false}
                        mask={true}
                        maskClosable={true}
                        visible={this.state.collapsed}
                        onClose={() => this.setState({ collapsed: false })}
                        width="fit-content"
                        bodyStyle={{
                            padding: 0,
                            height: '100%'
                        }}>
                        <SiderMenu
                            handleLinkClick={() => this.setState({ collapsed: false })}
                            selectedKeys={selectedKeys} />
                    </Drawer>
                </MediaQuery>
                <MediaQuery minWidth={600}>
                    <SiderMenu
                        selectedKeys={selectedKeys}
                        onCollapse={collapsed => this.setState({ collapsed })}
                        collapsed={this.state.collapsed} />
                </MediaQuery>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            onClick={this.toggle}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24 }}>
                        <Route path="/books" component={BookListPage} />
                    </Content>
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