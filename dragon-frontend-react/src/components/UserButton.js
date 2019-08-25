import React from 'react';
import { Menu, Dropdown, Icon, Avatar, Button } from 'antd';

const UserButton = ({ username, handleLogout, className, textColor, isMobile }) => (
    <Dropdown overlay={
            <Menu style={{ marginTop: isMobile ? 0 : 6 }}>
                <Menu.Item key="logout" onClick={handleLogout}>
                    <Icon type="logout" />Tanca sessió
                </Menu.Item>
            </Menu>
        }
        className={className}
    >
        <Button type="link" style={{ height: '100%', color: textColor }}>
            <span className="logout">
                <Avatar icon="user" size="small" style={{ verticalAlign: 'middle', backgroundColor: '#1890ff' }} />
            </span>
            <div className="username">{username}</div> <Icon type="down" style={{ verticalAlign: 'middle' }} />
        </Button>
    </Dropdown>
);

export default UserButton;