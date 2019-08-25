import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../logo.svg';
const { Sider } = Layout;


const SiderMenu = ({ selectedKeys, collapsed, handleLinkClick}) => (
    <Sider
        breakpoint="sm"
        collapsedWidth="0"
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        style={{
            padding: 0,
            height: '100%'
        }}>
        <div className="logo">
            <Logo /><span>Dragon</span>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
            <Menu.Item key="/">
                <Link to="/" onClick={handleLinkClick}>
                    <Icon type="home" />
                    <span>Inici</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="/books">
                <Link to="/books" onClick={() => handleLinkClick && handleLinkClick()}>
                    <Icon type="book" />
                    <span>Llibres</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="/sales">
                <Link to="/sales" onClick={() => handleLinkClick && handleLinkClick()}>
                    <Icon type="shopping" />
                    <span>Vendes</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="/shops">
                <Link to="/shops" onClick={() => handleLinkClick && handleLinkClick()}>
                    <Icon type="shop" />
                    <span>Botigues</span>
                </Link>
            </Menu.Item>
        </Menu>
    </Sider>
);

export default SiderMenu;