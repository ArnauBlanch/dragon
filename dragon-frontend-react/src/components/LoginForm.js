import React from 'react';
import { Form, Button, Icon, Input, Alert } from 'antd';
import { withTranslation } from 'react-i18next';

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        })
    }

    render() {
        const { form: { getFieldDecorator }, t } = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                {this.props.errorMessage &&
                    <Alert message={this.props.errorMessage} type="error" showIcon style={{ marginBottom: 15 }} />}

                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: t('login.empty-name-message') }]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                            placeholder={t('login.name')} />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: t('login.empty-password-message') }],
                        errors: [new Error('test error')],
                        validateStatus: 'error'
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder={t('login.password')} />
                    )}
                </Form.Item>
                
                <Button
                    type="primary"
                    loading={this.props.isFetching}
                    htmlType="submit"
                    className="login-form-button">
                    {t('login.log-in')}
                </Button>
            </Form>
        )
    }
}

export default Form.create({ name: 'login' })(withTranslation()(LoginForm))