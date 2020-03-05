import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Layout, Row, Col } from 'antd';
import '../styles/login';
import { ReactComponent as Logo } from '../logo.svg';

type Props = WithTranslation;

class LoginPage extends React.Component<Props> {
    render() {
        const { t } = this.props;
        return (
            <Layout className="login-layout">
                <Layout.Content className="login-content">
                    <Row justify="center" className="login">
                        <Col xs={24} md={6} className="login-col">
                            <div className="login-logo">
                                <Logo /><span>Dragon</span>
                            </div>
                            <p className="login-subtitle">{t('app.description')}</p>

                            {/*<LoginForm
                                isFetching={isFetching}
                                errorMessage={(unauthorized && t('login.bad-password'))
                                    || (error && t('login.error'))}
                                onSubmit={values => dispatch(login(
                                    values.username,
                                    values.password,
                                    () => {
                                        this.props.history.push(this.state.referer)
                                    }))} />*/}
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
        )
    }
}

export default withTranslation()(LoginPage);