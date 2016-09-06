import { LOCATION_CHANGE } from './constants';

export function locationChange(payload) { // eslint-disable-line import/prefer-default-export
  return {
    type: LOCATION_CHANGE,
    payload,
  };
}
