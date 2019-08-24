import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthenticatedRoute = ({ component, isAuthenticated, ...routeProps }) => {
    return (
        <Route
            {...routeProps}
            render={() => (isAuthenticated ?
                component() :
                <Redirect to={{
                    pathname: '/login',
                    state: { referer: routeProps.path }
                }} />)} />
    );
};

const mapStateToProps = state => ({ isAuthenticated: state.user.isAuthenticated })

export default connect(mapStateToProps)(AuthenticatedRoute);