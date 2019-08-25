import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { ReactComponent as Logo } from '../logo.svg';
import './style.css';
const { Header, Sider, Content, Footer } = Layout;

/*
    /*<Layout style={{ height: '100%' }}>  
        <Sider collapsible>
            <div className="login-logo">
                <Logo /><span>Dragon</span>
            </div>
        <Menu theme='dark' mode='inline'>
            <Menu.Item key='1'>
                <Icon type="home" />
                <span>Inici</span>
            </Menu.Item>
            <Menu.Item key='2'>
                <Icon type="book" />
                <span>Llibres</span>
            </Menu.Item>
            <Menu.Item key='3'>
                <Icon type="shopping"/>
                <span>Vendes</span>
            </Menu.Item>
            <Menu.Item key='4'>
                <Icon type="shop" />
                <span>Botigues</span>
            </Menu.Item>
        </Menu>
        </Sider>  
        <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
                className="trigger"
                //type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                //onClick={this.toggle}
                />
            {/*<Menu
                theme='dark'
                mode='horizontal'
                style={{ lineHeight: '64px' }}>
                <Menu.Item key='1'>Inici</Menu.Item>
                <Menu.Item key='2'>Llibres</Menu.Item>
                <Menu.Item key='3'>Vendes</Menu.Item>
                <Menu.Item key='4'>Botigues</Menu.Item>
            </Menu>
        </Header>
        <Layout>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                <Breadcrumb style={{ margin: '16px 0', height: '10px' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    Content
                </div>
            </Content>
            {/*<Footer style={{ textAlign: 'center' }}>
                Agrupament Escolta i Guia Pinya de Rosa © {new Date().getFullYear()}
                &nbsp;- Made with ❤ by <a style={{  }} href="https://github.com/ArnauBlanch" target="_blank" rel="noopener noreferrer"><Icon type="github" /> ArnauBlanch</a></Footer>
}     </Layout>
    </Layout>*/

class Protected extends React.Component {
    state = { collapsed: false }
    toggle = () => this.setState({ collapsed: !this.state.collapsed })
    
    render() {
        return (
            <Layout style={{ height: '100vh' }}>
                <Sider
                    breakpoint='sm'
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => {
                        this.setState({ collapsed })
                    }}
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                    <Icon type="user" />
                    <span>nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <Icon type="video-camera" />
                    <span>nav 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                    <Icon type="upload" />
                    <span>nav 3</span>
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout>
                <Header style={{ background: '#fff' }}>
                    <Icon
                    className="trigger"
                    type={'menu-fold'}
                    onClick={this.toggle}
                    />
                    <span style={{ verticalAlign: 'middle', backgroundColor: 'red', height: '100%' }}>
                        <Logo style={{ height: '10px', verticalAlign: 'middle' }} />
                        <span style={{ fontSize: 20 }}>Dragon</span>
                    </span>
                    {/*<Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>*/}
                
                </Header>
                <Content
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                    }}
                >
                    Content
                </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Protected