/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Layout, Row, Col } from 'antd';
import '../styles/login.css';
import { Redirect } from 'react-router-dom';
import { ReactComponent as Logo } from '../styles/logo.svg';
import LoginForm from '../containers/LoginForm';
import { isAuthenticated } from '../helpers/localStorage';

type Props = WithTranslation;

const LoginPage: React.FC<Props> = ({ t }: Props) => {
  if (isAuthenticated()) return <Redirect to="/" />;

  return (
    <Layout className="login-layout">
      <Layout.Content className="login-content">
        <Row justify="center" className="login">
          <Col xs={24} md={6} className="login-col">
            <div className="login-logo">
              <Logo />
              <span>Dragon</span>
            </div>
            <p className="login-subtitle">{t('app.description')}</p>

            <LoginForm />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default withTranslation()(LoginPage);
