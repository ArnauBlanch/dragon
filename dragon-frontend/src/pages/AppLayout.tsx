/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Layout } from 'antd';
import Media from 'react-media';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/layout.css';

type Props = { children: React.ReactElement };

class AppLayout extends React.Component<Props> {
  render() {
    const { children } = this.props;
    return (
      <Layout className="app-layout">
        <Header />
        <div className="app-container">
          {children}
          <Media query="(min-width: 720px)">
            <Footer />
          </Media>
        </div>
      </Layout>
    );
  }
}

export default AppLayout;
