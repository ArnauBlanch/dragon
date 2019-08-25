import React from 'react';
import { Layout } from 'antd';
import AppMenu from './AppMenu';
import { ReactComponent as Logo } from '../logo.svg';
const { Header } = Layout;

const DesktopHeader = ({ currentPath }) => (
    <Header
        style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            padding: 0,
            WebkitBoxShadow: '0 2px 8px #f0f1f2',
            boxShadow: '0 2px 8px #f0f1f2'
        }}
    >
        <span className="logo logo-header-mini">
            <Logo /><span>Dragon</span>
        </span>
        <AppMenu
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            currentPath={currentPath} />
    </Header>
);

export default DesktopHeader;