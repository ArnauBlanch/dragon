/* eslint-disable no-unused-expressions */
import React from 'react';
import { Modal, Form, Input } from 'antd';
import { withTranslation, WithTranslation } from 'react-i18next';
import { FormInstance } from 'antd/lib/form';

type Props = {
  visible: boolean;
  onCodeEntered: (isbn: number) => void;
  onClose: () => void;
} & WithTranslation;
class BarcodeModal extends React.Component<Props> {
  formRef = React.createRef<FormInstance>();

  constructor(props: Props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onSubmit() {
    const { onCodeEntered } = this.props;
    this.formRef.current
      ?.validateFields()
      .then(({ isbn }) => onCodeEntered(isbn as number))
      .catch(() => null);
  }

  onClose() {
    const { onClose } = this.props;
    onClose();
    this.formRef.current?.resetFields();
  }

  render() {
    const { visible, t } = this.props;
    return (
      <Modal
        forceRender
        className="barcode-modal"
        title={t('scan.type-in-isbn')}
        visible={visible}
        onOk={this.onSubmit}
        onCancel={this.onClose}
        centered
        style={{ width: 'auto', margin: 16, maxWidth: 350 }}
      >
        <Form
          ref={this.formRef}
          name="barcode"
          validateMessages={{
            required: t('scan.length-13-message'),
            string: { len: t('scan.length-13-message') },
          }}
        >
          <Form.Item name="isbn" label={t('scan.isbn')} rules={[{ required: true, len: 13 }]}>
            <Input type="number" onPressEnter={this.onSubmit} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default withTranslation()(BarcodeModal);
