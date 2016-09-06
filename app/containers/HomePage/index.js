/*
 * HomePage
 *
 */

import React, { Component, PropTypes as T } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// UI elements
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import CopyIcon from 'components/CopyIcon';
import { selectSimplifiedLink, selectLoading } from './selectors';
import { simplify, clearSimplifiedUrl } from './actions';

import messages from './messages';

import s from './styles.css';

export class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: '',
    };

    this.onChangeLink = this.onChangeLink.bind(this);
    this.onSimplify = this.onSimplify.bind(this);
    this.onShowStep1 = this.onShowStep1.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  componentDidUpdate() {
    if (this.props.simplifiedLink) {
      this.simplifiedLink.input.select();
    }
  }

  onChangeLink(e) {
    this.setState({
      link: e.target.value,
    });
  }

  onSimplify() {
    this.props.onSimplify(this.state.link);
    this.setState({
      link: '',
    });
  }

  onShowStep1() {
    this.props.onClearSimplifiedUrl();
  }

  copyToClipboard() {
    this.simplifiedLink.input.select();
    document.execCommand('copy');
  }

  render() {
    const { simplifiedLink, loading } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={`${s.inner} ${simplifiedLink ? s.flip : ''}`}>
          <Paper className={`${s.form} ${s.step1}`} zDepth={5}>
            <div className={s.legend}><FormattedMessage {...messages.step1Header} /></div>
            <TextField
              name="sourseLink"
              className={s.originalUrl}
              hintText="google.com"
              floatingLabelText={<FormattedMessage {...messages.originalUrl} />}
              value={this.state.link}
              onChange={this.onChangeLink}
              disabled={loading}
            />
            <RaisedButton
              className={s.submit}
              label={<FormattedMessage {...messages.shortenUrl} />}
              primary={!loading && !!this.state.link}
              fullWidth
              onClick={this.onSimplify}
              disabled={loading || !this.state.link}
            />
          </Paper>

          <Paper className={`${s.form} ${s.step2}`} zDepth={5}>
            <div className={s.legend}><FormattedMessage {...messages.step2Header} /></div>
            <div className={s.inputWrapper}>
              <TextField
                name="simplifiedLink"
                ref={input => (this.simplifiedLink = input)}
                className={s.simplifiedLink}
                value={simplifiedLink}
                readOnly
              />
              <IconButton
                className={s.copyIcon}
                tooltip={<FormattedMessage {...messages.copy} />}
                onClick={this.copyToClipboard}
              >
                <CopyIcon />
              </IconButton>
            </div>
            {simplifiedLink && <RaisedButton
              className={s.submit}
              label={<FormattedMessage {...messages.back} />}
              primary
              fullWidth
              onClick={this.onShowStep1}
            />}
          </Paper>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSimplify: link => dispatch(simplify(link)),
  onClearSimplifiedUrl: () => dispatch(clearSimplifiedUrl()),
});

const enhance = compose(
  connect(
    createStructuredSelector({
      simplifiedLink: selectSimplifiedLink(),
      loading: selectLoading(),
    }),
    mapDispatchToProps
  ),
);

export default enhance(HomePage);

HomePage.propTypes = {
  onSimplify: T.func,
  onClearSimplifiedUrl: T.func,
  simplifiedLink: T.string,
  loading: T.bool,
};

HomePage.defaultProps = {
  simplifiedLink: '',
};
