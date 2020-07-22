/* eslint-disable quotes */
import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { ErrorType } from '../../models/enums';
import QuestionIcon from './QuestionIcon';

type Props = { error?: ErrorType; onScanAgain: () => void } & WithTranslation;
const ScannerError: React.FC<Props> = ({ error, onScanAgain, t }: Props) => (
  <div className="fixed w-full h-full z-20 top-0 left-0 flex items-center justify-center">
    <div className="absolute w-full h-full bg-gray-900 opacity-75" />
    <div className="z-50 text-white text-2xl text-center font-semibold">
      {error === ErrorType.NotFound && (
        <>
          <QuestionIcon className="w-24 h-24 block t-2 fill-current mx-auto my-8" />
          {t('scan.not-found-error')}
        </>
      )}

      <button
        type="button"
        onClick={onScanAgain}
        className="modal-close px-4 my-4 bg-red-600 p-3 rounded-full text-white text-lg font-semibold active:bg-red-400 sm:hover:bg-red-400 focus:outline-none"
      >
        {t('scan.scan-again')}
      </button>
    </div>
  </div> /*
  <Row align="middle" justify="space-around" style={{ minHeight: 400 }}>
    <Col>
      <Result
        status={error === ErrorType.NotFound ? 'warning' : 'error'}
        title={
          error === ErrorType.NotFound ? t('scan.book-not-found') : t('scan.there-was-a-problem')
        }
        subTitle={
          error !== ErrorType.NotFound && (
            <>No s&apos;ha pogut registrar la venda d&apos;aquest llibre.</>
          )
        }
        extra={[
          <Button icon={<ScanOutlined />} type="primary" key="scan" onClick={onScanAgain}>
            {t('scan.scan-again')}
          </Button>,
          <Button icon={<InfoCircleOutlined />} key="info">
            Veure informació del llibre
          </Button>,
        ]}
      />
    </Col>
  </Row> */
);

export default withTranslation()(ScannerError);
