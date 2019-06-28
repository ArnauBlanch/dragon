import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { routerRedux } from 'dva/router';
import { checkApiKey } from './service';
import { getPageQuery, setAuthority } from './utils/utils';

export interface StateType {
  status?: 'ok' | 'error';
  currentUser?: CurrentUser;
}

export interface CurrentUser {
  name: string,
  type: string,
  password: string
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userLogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const callResult = yield call(checkApiKey, payload);
      if (callResult) {
        const response = callResult.response;
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: response.status === 200 ? 'ok' : 'error',
            currentUser: {
              name: payload.name,
              type: 'admin',
              password: payload.password
            }
          },
        });
        // Login successfully
        if (response.status === 200) {
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params as { redirect: string };
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = redirect;
              return;
            }
          }
          yield put(routerRedux.push('/test'));//redirect || '/'));
        }
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
            currentUser: null
          }
        })
      }
    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentUser);
      return {
        ...state,
        status: payload.status,
        currentUser: payload.currentUser,
      };
    },
  },
};

export default Model;
