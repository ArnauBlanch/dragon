import React from 'react';
import { Layout, Icon } from 'antd';
import { connect } from 'react-redux';
import { logOut } from '../../actions';
import UserButton from '../UserButton';
import { ReactComponent as Logo } from '../../logo.svg';
import * as style from './style';
const { Header } = Layout;

const MobileHeader = ({ showSideMenu, toggleSideMenu, username, dispatch }) => (
    <Header style={style.header}
    >
        <div className="logo logo-header-mini">
            <Logo />
        </div>
        <Icon
            className="trigger"
            onClick={toggleSideMenu}
            type={showSideMenu ? 'menu-unfold' : 'menu-fold'}
            style={style.icon} />
        <UserButton
            isMobile={true}
            username={username}
            handleLogout={() => dispatch(logOut())}
            className="logout-button"
            style={style.button} />
    </Header>
);

const mapStateToProps = state => state.user;
export default connect(mapStateToProps)(MobileHeader);