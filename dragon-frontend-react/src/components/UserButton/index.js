import React from 'react';
import { Menu, Dropdown, Icon, Avatar, Button } from 'antd';
import { withTranslation } from 'react-i18next';
import * as style from './style';
import './style.css';

const UserButton = ({ t, username, handleLogout, className, textColor, isMobile }) => (
    <Dropdown
        className={className}
        overlay={
            <Menu style={style.menu(isMobile)}>
                <Menu.Item key="logout" onClick={handleLogout}>
                    <Icon type="logout" />
                    {t('menu.log-out')}
                </Menu.Item>
            </Menu>
        }
    >
        <Button type="link" style={style.button(textColor)}>
            <span className="logout">
                <Avatar icon="user" size="small" style={style.avatar} />
            </span>
            <div className="username">
                {username}
                <Icon type="down" style={style.downIcon} />
            </div>
        </Button>
    </Dropdown>
);

export default withTranslation()(UserButton);