import React from 'react';
import { Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import '../styles/layout.css';

const Footer: React.FC = () => (
  <Layout.Footer className="app-footer">
    © {new Date().getFullYear()} - {process.env.REACT_APP_COMPANY_NAME}
    <br />
    <span style={{ fontSize: 13 }}>
      Made with ❤ by&nbsp;
      <a href="https://github.com/ArnauBlanch" target="_blank" rel="noopener noreferrer">
        <GithubOutlined /> ArnauBlanch
      </a>
    </span>
  </Layout.Footer>
);

export default Footer;
