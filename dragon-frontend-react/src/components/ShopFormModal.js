import React from 'react';
import { Modal, Form, Input } from 'antd';
import { withTranslation } from 'react-i18next';

class ShopFormModal extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.props.visible)
            this.props.form.resetFields()
        
        if (nextProps.formState !== this.props.formState) {
            if (nextProps.formState.success !== this.props.formState.success && nextProps.formState.success) {
                this.props.handleClose();
            }
        }
    }

    render() {
        const { t, isEdition = false, shop, formState, visible, handleClose, handleSubmit, form } = this.props;
        const { getFieldDecorator } = form;

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        return (
            <Modal
                title={isEdition ? t('shops.edit-shop') : t('shops.create-shop')}
                confirmLoading={formState.isFetching}
                visible={visible}
                closable={false}
                onOk={() => {
                    form.validateFields((err, values) => {
                        if (err)
                            return
                        handleSubmit(values)
                    })
                }}
                onCancel={handleClose}
            >
                <Form {...formItemLayout}>
                    <Form.Item label={t('shops.id')}>
                        {getFieldDecorator('id', {
                            initialValue: shop && shop.id,
                            rules: [{ required: true, message: t('shops.empty-id') }]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label={t('shops.name')}>
                        {getFieldDecorator('name', {
                            initialValue: shop && shop.name,
                            rules: [{ required: true, message: t('shops.empty-name') }]
                        })(<Input onChange={ !isEdition
                            && (evt => form.setFieldsValue({ id: evt.target.value.replace(/[\W_]+/g, '-').toLowerCase() })
                        )} />)}
                    </Form.Item>
                    <Form.Item label={t('shops.description')}>
                        {getFieldDecorator('description', { initialValue: shop && shop.description })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create({ name: 'shop-form' })(withTranslation()(ShopFormModal))