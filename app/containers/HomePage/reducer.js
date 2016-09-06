import { fromJS } from 'immutable';

import { SIMPLIFY_LINK, CLEAR_SIMPLIFIED_LINK } from './constants';

import { REDUX_ACTION_SUFFIX } from '../../constants';

const [PENDING, FULLFILLED] = REDUX_ACTION_SUFFIX;


const initialState = fromJS({
  simplifiedLink: undefined,
  loading: false,
});

function homePageReducer(state = initialState, action = {}) {
  const { response } = action;
  switch (action.type) {
    case `${SIMPLIFY_LINK}_${PENDING}`:
      return state
        .set('loading', true);
    case `${SIMPLIFY_LINK}_${FULLFILLED}`:
      return state
        .set('loading', false)
        .set('simplifiedLink', response.shorten_url);
    case CLEAR_SIMPLIFIED_LINK:
      return state
        .set('simplifiedLink', undefined);
    default:
      return state;
  }
}

export default homePageReducer;
