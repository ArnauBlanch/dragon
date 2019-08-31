import React from 'react';
import { Menu, Dropdown, Icon, Avatar, Button } from 'antd';

const UserButton = ({ username, handleLogout, className, textColor, isMobile }) => (
    <Dropdown overlay={
            <Menu style={{ marginTop: isMobile ? 0 : 5, top: 35 }}>
                <Menu.Item key="logout" onClick={handleLogout}>
                    <Icon type="logout" />Tanca sessió
                </Menu.Item>
            </Menu>
        }
        className={className}
    >
        <Button type="link" style={{ border: 'none', lineHeight: '64px', top: -1.5, color: textColor }}>
            <span className="logout">
                <Avatar icon="user" size="small" style={{ verticalAlign: 'middle', backgroundColor: '#1890ff' }} />
            </span>
            <div className="username">
                {username}
                <Icon type="down" style={{ verticalAlign: 'middle', height: '100%', marginLeft: 3, marginTop: 0, fontSize: 10 }} />
            </div>
        </Button>
    </Dropdown>
);

export default UserButton;