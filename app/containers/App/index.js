/**
 * App
 */

import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { selectLocale } from 'containers/LanguageProvider/selectors';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { LOCALES } from '../../constants';

import s from './styles.css';

const listStyle = { paddingTop: '0px', paddingBottom: '0px' };

export class App extends Component {
  constructor(props) {
    super(props);

    this.onChangeLocale = this.onChangeLocale.bind(this);
  }

  onChangeLocale(event, key, payload) {
    this.props.onChangeLocale(payload);
  }

  render() {
    const { locale } = this.props;
    return (
      <div className={s.container}>
        <div className={s.localeSelectWrapper}>
          <DropDownMenu value={locale} onChange={this.onChangeLocale} listStyle={listStyle}>
            {LOCALES.map(({ value, label }) =>
              <MenuItem key={value} value={value} primaryText={label} className={s.localeItem} />)
            }
          </DropDownMenu>
        </div>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onChangeLocale: locale => dispatch(changeLocale(locale)),
});

const enhance = compose(
  connect(
    createStructuredSelector({
      locale: selectLocale(),
    }),
    mapDispatchToProps
  ),
);

export default enhance(App);

App.propTypes = {
  children: T.node,
  locale: T.string,
  onChangeLocale: T.func,
};
