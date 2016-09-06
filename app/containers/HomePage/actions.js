import { SIMPLIFY_LINK, CLEAR_SIMPLIFIED_LINK } from './constants';

export function simplify(link) {
  return {
    type: SIMPLIFY_LINK,
    async: true,
    payload: {
      link,
    },
  };
}

export function clearSimplifiedUrl() {
  return {
    type: CLEAR_SIMPLIFIED_LINK,
  };
}
