import { createReducer } from 'typesafe-actions';
import { ErrorType } from "../models/enums";
import { LoginActions, logIn } from "../actions/login";

export type LoginState = {
    isFetching: boolean;
    success: boolean;
    error?: ErrorType;
}

const initialState: LoginState = {
    isFetching: false,
    success: false
};

const reducer = createReducer<LoginState, LoginActions>(initialState)
    .handleAction(logIn.request, state => ({
        ...state, isFetching: true, success: false, error: undefined
    }))
    .handleAction(logIn.success, state => ({ ...state, isFetching: false, success: true }))
    .handleAction(logIn.failure, (state, action) => ({ ...state, isFetching: false, error: action.payload }));


export default reducer;