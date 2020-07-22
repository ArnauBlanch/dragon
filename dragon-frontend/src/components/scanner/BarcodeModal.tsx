import React, { createRef } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

type Props = {
  onCodeEntered: (isbn: number) => void;
  onClose: () => void;
} & WithTranslation;

interface State {
  code: string;
  invalid: boolean;
}
class BarcodeModal extends React.Component<Props, State> {
  inputRef = createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);
    this.state = { code: '', invalid: false };
    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    if (this.inputRef.current) {
      // eslint-disable-next-line no-unused-expressions
      this.inputRef.current?.focus();
    }
  }

  onSubmit() {
    const { code } = this.state;
    if (!code || code.length !== 13) {
      this.setState({ invalid: true });
      return;
    }

    const { onCodeEntered, onClose } = this.props;
    onCodeEntered(parseInt(code, 10));
    onClose();
  }

  onClose() {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const { t } = this.props;

    const { code, invalid } = this.state;
    return (
      <div className="fixed w-full h-full z-20 top-0 left-0 flex items-center justify-center">
        <div className="absolute w-full h-full bg-gray-900 opacity-50" />

        <div className="bg-red-100 w-11/12 sm:max-w-sm mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">{t('scan.type-in-isbn')}</p>
            </div>

            <input
              type="number"
              value={code}
              onChange={(event) => this.setState({ code: event.target.value, invalid: false })}
              onKeyDown={(event) => {
                if (event.key === 'Enter') this.onSubmit();
              }}
              ref={this.inputRef}
              className="w-full mt-4 px-4 py-3 bg-gray-200 text-gray-900 text-center placeholder-gray-600 rounded-full focus:outline-none focus:shadow-outline"
              placeholder={t('scan.isbn')}
            />
            <div className="text-gray-700 m-2 h-6 mb-6 text-xs font-light text-center">
              {invalid && t('scan.length-13-message')}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={this.onClose}
                className="px-4 bg-transparent p-3 rounded-full text-red-500 active:bg-red-200 active:text-red-400 sm:hover:bg-red-200 focus:outline-none mr-2"
              >
                {t('scan.cancel')}
              </button>
              <button
                type="button"
                onClick={this.onSubmit}
                className="modal-close px-4 bg-red-600 p-3 rounded-full text-white font-semibold active:bg-red-400 sm:hover:bg-red-400 focus:outline-none"
              >
                {t('scan.search')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(BarcodeModal);
