/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import AppHeader from '../components/AppHeader/AppHeader';

type Props = { children: React.ReactElement };

class AppLayout extends React.Component<Props> {
  render() {
    const { children } = this.props;
    return (
      <>
        <AppHeader />
        {children}
      </>
    );
  }
}

export default AppLayout;
