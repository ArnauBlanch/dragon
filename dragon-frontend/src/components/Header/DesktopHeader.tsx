import React from 'react';
import { Layout } from 'antd';
import { ReactComponent as Logo } from '../../styles/logo.svg';

const DesktopHeader = () => (
  <Layout.Header className="desktop-header">
    <div style={{ maxWidth: 1200, margin: 'auto' }}>
      <div className="logo logo-header-mini">
        <Logo />
        <span>Dragon</span>
      </div>
    </div>
  </Layout.Header>
);

export default DesktopHeader;
