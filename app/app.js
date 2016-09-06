/* eslint import/imports-first: 0 */
import 'babel-polyfill';

/* eslint-disable import/no-unresolved */
// Load the manifest.json file and the .htaccess file
import '!file?name=[name].[ext]!./manifest.json';
/* eslint-enable import/no-unresolved */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import LanguageProvider from 'containers/LanguageProvider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './store';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// Import i18n messages
import { translationMessages } from './i18n';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Set up the router, wrapping all Routes in the App component
import App from 'containers/App';
import createRoutes from './routes';

const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};


import { locationChange } from 'containers/App/actions';

let prevPath;
let prevSearch;
browserHistory.listen(location => {
  if (prevPath !== location.pathname || prevSearch !== location.search) {
    store.dispatch(locationChange(location));
    prevPath = location.pathname;
    prevSearch = location.search;
  }
});


const render = (translatedMessages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={translatedMessages}>
        <MuiThemeProvider>
          <Router
            history={browserHistory}
            routes={rootRoute}
            render={applyRouterMiddleware(useScroll())}
          />
        </MuiThemeProvider>
      </LanguageProvider>
    </Provider>,
    document.getElementById('app')
  );
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  Promise.all([
    System.import('intl'),
    System.import('intl/locale-data/jsonp/en.js'),
  ]).then(() => render(translationMessages));
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  const install = require('offline-plugin/runtime').install; // eslint-disable-line global-require

  install();
}
