import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React from 'react';
import SelectLang from '@/components/SelectLang';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes, props);
  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      })}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>{formatMessage({ id: 'app.name' })}</span>
              </Link>
            </div>
            <div className={styles.desc}>{formatMessage({ id: 'app.description' })}</div>
          </div>
          {children}
        </div>
        <DefaultFooter
          links={[]}
          copyright="2019 - arnau.xyz" />
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
