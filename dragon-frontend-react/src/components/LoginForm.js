import React from 'react';
import { Form, Button, Icon, Input, Alert } from 'antd';

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
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                {this.props.errorMessage &&
                    <Alert message={this.props.errorMessage} type="error" showIcon style={{ marginBottom: 15 }} />}

                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Sisplau, escriu el teu nom' }]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                            placeholder="Nom" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Sisplau, escriu la contrasenya' }],
                        errors: [new Error('test error')],
                        validateStatus: 'error'
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Contrasenya" />
                    )}
                </Form.Item>
                
                <Button
                    type="primary"
                    loading={this.props.isFetching}
                    htmlType="submit"
                    className="login-form-button">
                    Inicia sessió
                </Button>
            </Form>
        )
    }
}

export default Form.create({ name: 'login' })(LoginForm)