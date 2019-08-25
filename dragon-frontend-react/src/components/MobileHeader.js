import React from 'react';
import { Layout, Icon } from 'antd';
import { ReactComponent as Logo } from '../logo.svg';
const { Header } = Layout;

const MobileHeader = ({ showSideMenu, toggleSideMenu }) => (
    <Header
        style={{
            background: '#fff',
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            padding: 0,
            WebkitBoxShadow: '0 2px 8px #f0f1f2',
            boxShadow: '0 2px 8px #f0f1f2'
        }}
    >
        <div className="logo logo-header-mini">
            <Logo />
        </div>
        <Icon
            className="trigger"
            onClick={toggleSideMenu}
            type={showSideMenu ? 'menu-unfold' : 'menu-fold'}
            style={{ padding: 10, fontSize: '18px' }} />
    </Header>
);

export default MobileHeader;