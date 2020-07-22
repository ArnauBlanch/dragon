import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Props = {
  onClick: () => void;
} & WithTranslation;

const ScanButton: React.FC<Props> = ({ onClick, t }: Props) => (
  <Link
    to="/scan"
    onClick={onClick}
    className="px-4 mr-4 py-2 bg-white text-sm text-red-500 font-semibold leading-none border border-white rounded-full md:hover:text-white md:hover:border-white md:hover:bg-red-500 active:text-white active:border-white active:bg-red-500"
  >
    {t('menu.scan-book')}
  </Link>
);

export default withTranslation()(ScanButton);
