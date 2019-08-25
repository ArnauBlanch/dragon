import React from 'react';
import { Row, Col, Layout } from 'antd';
import { connect } from 'react-redux';
import { login } from '../../actions';
import LoginForm from '../../components/LoginForm';
import { ReactComponent as Logo } from '../../logo.svg';
import './style.css';

class Login extends React.Component {
    state = { referer: null }
    componentWillMount() {
        let referer = this.props.history.location.state ? this.props.history.location.state.referer : '/';
        if (referer === '/login')
            referer = '/'
        this.setState({ referer })
    }

    render() {
        const { dispatch, isFetching, error, unauthorized } = this.props;
        return (
            <Layout style={{ height: '100vh' }}>
                <Layout.Content className="login-layout">
                    <Row justify="center" type="flex" className="login">
                        <Col xs={24} md={6} className="login-col">
                            <div className="login-logo">
                                <Logo /><span>Dragon</span>
                            </div>
                            <p className="login-subtitle">Plataforma de gestió de vendes de llibres</p>

                            <LoginForm 
                                isFetching={isFetching}
                                errorMessage={(unauthorized && 'Contrasenya incorrecta')
                                    || (error && 'Hi ha hagut un problema')}
                                onSubmit={values => dispatch(login(
                                    values.username,
                                    values.password,
                                    () => {
                                        this.props.history.push(this.state.referer)
                                    }))} />
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
        )
    }
}

const mapStateToProps = state => state.login

export default connect(mapStateToProps)(Login)