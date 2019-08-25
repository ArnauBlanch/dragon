import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const menuItems = [
    { key: 'home', icon: 'home', name: 'Inici', path: '/' },
    { key: 'books', icon: 'book', name: 'Llibres', path: '/books' },
    { key: 'sales', icon: 'shopping', name: 'Vendes', path: '/sales' },
    { key: 'shops', icon: 'shop', name: 'Botigues', path: '/shops' }
]

const DesktopMenu = ({ currentPath, onItemSelected }) => (
    <Menu theme="dark" mode="horizontal" selectedKeys={[currentPath]} style={{ lineHeight: '64px' }}>
        { menuItems.map(item => 
            <Menu.Item key={item.key}>
                <Link to={item.path} onClick={onItemSelected}>
                    <Icon type={item.icon} />
                    <span>{item.name}</span>
                </Link>
            </Menu.Item>)
        }
    </Menu>
);

export default DesktopMenu
