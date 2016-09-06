import { take, put, call } from 'redux-saga/effects';

import request from 'utils/request';
import { REDUX_ACTION_SUFFIX, API } from '../constants';

const [PENDING, FULLFILLED, REJECTED] = REDUX_ACTION_SUFFIX;

export function* takeAsync(type) {
  const pendingType = Array.isArray(type) ? type.map(t => `${t}_${PENDING}`) : `${type}_${PENDING}`;
  return yield take(pendingType);
}

export function* putAsync({ type, ...restData }, suffix = FULLFILLED) {
  return yield put({ type: `${type.replace(`_${PENDING}`, '')}_${suffix}`, ...restData });
}

export function* callAsync(action, url, options) {
  // place to handle API calls
  const response = yield call(request, `${API}/${url}`, options);

  if (response.status === 'error') {
    yield putAsync(action, REJECTED);
  } else {
    yield putAsync({ ...action, response, cache: false });
  }

  return response;
}
