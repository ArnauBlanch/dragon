import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { logOut as logOutAction } from '../../actions/auth';

const dispatchProps = {
  logOut: logOutAction,
};

type Props = {
  className: string;
  listClassName: string;
  onClick: () => void;
} & WithTranslation &
  typeof dispatchProps;

const MenuItems: React.FC<Props> = ({ className, listClassName, logOut, onClick, t }: Props) => (
  <div className={`flex-grow md:items-center md:w-auto ${className}`}>
    <div className={`text-sm md:flex-grow ${listClassName}`}>
      {/* <div className="block md:inline-block mt-4 md:mt-0 mr-4">
        <Link
          className="md:hover:text-red-200 active:text-red-200 text-white font-semibold"
          to="/example"
          onClick={onClick}
        >
          Example
        </Link>
</div> */}
      <div className="block md:inline-block mt-4 md:mt-0 mr-4">
        <button
          type="button"
          className="md:hover:text-red-200 active:text-red-200 text-white"
          onClick={logOut}
        >
          {t('menu.log-out')}
        </button>
      </div>
    </div>
  </div>
);

export default withTranslation()(connect(null, dispatchProps)(MenuItems));
