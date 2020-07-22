import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import Spinner from '../Spinner';

type Props = WithTranslation;
const ScannerLoading: React.FC<Props> = ({ t }: Props) => (
  <div className="fixed w-full h-full z-20 top-0 left-0 flex items-center justify-center">
    <div className="absolute w-full h-full bg-gray-900 opacity-75" />
    <div className="z-50 text-white text-2xl text-center font-semibold">
      <Spinner className="w-20 mx-auto mb-10" />
      {t('scan.searching-book')}
    </div>
  </div>
);

export default withTranslation()(ScannerLoading);
