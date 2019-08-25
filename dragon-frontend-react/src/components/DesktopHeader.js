import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import UserButton from './UserButton';
import AppMenu from './AppMenu';
import { logOut } from '../actions';
import { ReactComponent as Logo } from '../logo.svg';
const { Header } = Layout;

const DesktopHeader = ({ dispatch, username, currentPath }) => (
    <Header
        style={{
            width: '100%',
            position: 'fixed',
            zIndex: 1,
            padding: 0,
            WebkitBoxShadow: '0 2px 8px #f0f1f2',
            boxShadow: '0 2px 8px #f0f1f2'
        }}
    >
        <div style={{ maxWidth: 1200, margin: 'auto' }}>
            <span className="logo logo-header-mini">
                <Logo /><span>Dragon</span>
            </span>
            <AppMenu
                mode="horizontal"
                style={{ lineHeight: '64px' }}
                currentPath={currentPath}
                extraItems={
                <Menu.Item key="logout" style={{ float: 'right', height: '100%', marginRight: 6, paddingRight: 0 }}>
                    <UserButton
                        isMobile={false}
                        textColor="#fff"
                        username={username}
                        handleLogout={() => dispatch(logOut())} />
                </Menu.Item>} />
        </div>
    </Header>
);

const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(DesktopHeader);