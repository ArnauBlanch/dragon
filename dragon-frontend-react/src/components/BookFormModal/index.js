import React from "react";
import { Modal, Form, Input } from "antd";
import { withTranslation } from "react-i18next";

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
};

class BookFormModal extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) this.props.form.resetFields();

    if (nextProps.formState !== this.props.formState) {
      if (
        nextProps.formState.success !== this.props.formState.success &&
        nextProps.formState.success
      ) {
        this.props.handleClose();
      }
    }
  }

  render() {
    const {
      t,
      isEdition = false,
      book,
      formState,
      visible,
      handleClose,
      handleSubmit,
      form
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        title={isEdition ? t("books.edit-book") : t("books.create-book")}
        confirmLoading={formState.isFetching}
        visible={visible}
        closable={false}
        onOk={() =>
          form.validateFields((err, values) => !err && handleSubmit(values))
        }
        onCancel={handleClose}
      >
        <Form {...formItemLayout}>
          <Form.Item label={t("books.isbn")}>
            {getFieldDecorator("isbn", {
              initialValue: book && book.isbn,
              rules: [{ required: true, message: t("books.empty-isbn") }]
            })(<Input type="number" />)}
          </Form.Item>
          <Form.Item label={t("books.title")}>
            {getFieldDecorator("title", {
              initialValue: book && book.title,
              rules: [{ required: true, message: t("books.empty-title") }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label={t("books.author")}>
            {getFieldDecorator("author", {
              initialValue: book && book.author,
              rules: [{ required: true, message: t("books.empty-author") }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label={t("books.publisher")}>
            {getFieldDecorator("publisher", {
              initialValue: book && book.publisher
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "book-form" })(
  withTranslation()(BookFormModal)
);
