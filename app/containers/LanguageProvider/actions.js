/*
 *
 * LanguageProvider actions
 *
 */

import {
  CHANGE_LOCALE,
} from './constants';

export function changeLocale(languageLocale) { // eslint-disable-line import/prefer-default-export
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
