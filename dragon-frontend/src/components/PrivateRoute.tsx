/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../helpers/localStorage';

interface PrivateRouteProps extends RouteProps {
  children?: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
