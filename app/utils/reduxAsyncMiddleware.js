import { REDUX_ACTION_SUFFIX } from '../constants';

const [PENDING] = REDUX_ACTION_SUFFIX;

export default function asyncMiddleware() {
  return () => next => action => {
    if (action.async) {
      return next({
        ...action,
        type: `${action.type}_${PENDING}`,
        async: undefined,
      });
    }

    return next(action);
  };
}
