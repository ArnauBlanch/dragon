import React from 'react';
import { Layout, Drawer } from 'antd';
import AppMenu from './AppMenu';
import { ReactComponent as Logo } from '../logo.svg';
const { Sider } = Layout;


const MobileDrawer = ({ currentPath, show, handleClose}) => (
    <Drawer
        placement="left"
        closable={false}
        mask={true}
        maskClosable={true}
        visible={show}
        onClose={handleClose}
        width="fit-content"
        bodyStyle={{ padding: 0, height: '100%' }}
    >
        <Sider trigger={null} style={{ padding: 0, height: '100%' }}>
            <div className="logo">
                <Logo /><span>Dragon</span>
            </div>
            <AppMenu
                currentPath={currentPath}
                onItemSelected={handleClose}
                mode="inline" />
        </Sider>
    </Drawer>
);

export default MobileDrawer;