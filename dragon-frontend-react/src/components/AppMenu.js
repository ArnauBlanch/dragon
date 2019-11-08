import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import './components.css';

const menuItems = [
    { key: 'home', icon: 'home', name: 'menu.home', path: '/' },
    { key: 'scan', icon: 'scan', name: 'menu.scan', path: '/scan' },
    { key: 'books', icon: 'book', name: 'menu.books', path: '/books' },
    { key: 'sales', icon: 'shopping', name: 'menu.sales', path: '/sales' },
    { key: 'shops', icon: 'shop', name: 'menu.shops', path: '/shops' },
]

const AppMenu = ({ t, currentPath, onItemSelected, mode, style, extraItems }) => (
    <Menu theme="dark" mode={mode} selectedKeys={[currentPath]} style={{ ...style }}>
        { menuItems.map(item => 
            <Menu.Item key={item.key}>
                <Link to={item.path} onClick={onItemSelected}>
                    <Icon type={item.icon} />
                    <span>{t(item.name)}</span>
                </Link>
            </Menu.Item>)
        }
        {extraItems}
    </Menu>
);

export default withTranslation()(AppMenu)
