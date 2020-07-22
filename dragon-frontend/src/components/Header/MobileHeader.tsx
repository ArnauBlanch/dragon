import React from 'react';
import { Layout } from 'antd';
import { ReactComponent as Logo } from '../../styles/logo.svg';

const MobileHeader = () => (
  <Layout.Header className="mobile-header">
    <div className="logo logo-header-mini">
      <Logo />
    </div>
  </Layout.Header>
);

export default MobileHeader;
