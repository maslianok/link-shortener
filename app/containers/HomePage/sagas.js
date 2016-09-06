import { take, fork, cancel } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'containers/App/constants';
import { takeAsync, callAsync } from 'utils/sagaUtils';
import { SIMPLIFY_LINK } from 'containers/HomePage/constants';

export function* simplifyLink() {
  while (true) {
    const action = yield takeAsync(SIMPLIFY_LINK);

    const options = {
      method: 'POST',
      body: {
        url: action.payload.link,
      },
    };

    yield callAsync(action, 's', options);
  }
}

export function* homeSaga() {
  const simplifyLinkWatcher = yield fork(simplifyLink);

  yield take(LOCATION_CHANGE);
  yield cancel(simplifyLinkWatcher);
}

export default [homeSaga];
