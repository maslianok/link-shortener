import { createSelector } from 'reselect';

const selectHomePage = () => state => state.get('home');

const selectSimplifiedLink = () => createSelector(
  selectHomePage(),
  home => home.get('simplifiedLink')
);

const selectLoading = () => createSelector(
  selectHomePage(),
  home => home.get('loading')
);

export {
  selectSimplifiedLink,
  selectLoading,
};
