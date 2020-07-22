import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import Spinner from '../../components/Spinner';

type Props = {
  loading?: boolean;
  onClick?: () => void;
} & WithTranslation;

const SignInButton: React.FC<Props> = ({ loading, onClick, t }: Props) => (
  <button
    type="button"
    disabled={loading}
    onClick={onClick}
    className="mt-6 m-3 px-6 w-40 h-12 bg-red-700 font-bold text-white border-2 border-white rounded-full hover:bg-red-800 focus:outline-none disabled:bg-red-800"
  >
    {loading ? <Spinner className="w-10 mx-auto" /> : t('login.log-in')}
  </button>
);

export default withTranslation()(SignInButton);
