import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import items from './items';

const AppMenu = ({ t, currentPath, onItemSelected, mode, style, extraItems }) => (
    <Menu theme="dark" mode={mode} selectedKeys={[currentPath]} style={{ ...style }}>
        { items.map(item => 
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
