/* eslint-disable no-unused-expressions */
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Form, Alert, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { FormInstance } from 'antd/lib/form';
import { logIn as logInAction } from '../actions/auth';
import { RootState } from '../reducers';
import { ErrorType } from '../models/enums';
import '../styles/login.css';

const mapStateToProps = (state: RootState) => state.auth;
const dispatchProps = { logIn: logInAction.request };
type Props = WithTranslation & ReturnType<typeof mapStateToProps> & typeof dispatchProps;

class LoginForm extends React.Component<Props> {
  formRef = React.createRef<FormInstance>();

  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.formRef.current?.validateFields().then((values: { [name: string]: any }) => {
      const { logIn } = this.props;
      logIn({ username: values.username, password: values.password });
    });
  }

  render() {
    const { t, error, isFetching } = this.props;
    return (
      <Form ref={this.formRef} onFinish={this.handleSubmit}>
        {error && (
          <Alert
            message={error === ErrorType.Unauthorized ? t('login.bad-password') : t('login.error')}
            type="error"
            showIcon
            className="login-alert"
          />
        )}

        <Form.Item
          name="username"
          rules={[{ required: true, message: t('login.empty-name-message') }]}
        >
          <Input
            prefix={<UserOutlined className="login-form-icon" />}
            placeholder={t('login.name')}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: t('login.empty-password-message') }]}
        >
          <Input
            prefix={<LockOutlined className="login-form-icon" />}
            type="password"
            placeholder={t('login.password')}
          />
        </Form.Item>

        <Button type="primary" loading={isFetching} htmlType="submit" className="login-form-button">
          {t('login.log-in')}
        </Button>
      </Form>
    );
  }
}

export default withTranslation()(connect(mapStateToProps, dispatchProps)(LoginForm));
