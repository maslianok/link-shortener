import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function* request(url, options = {}) {
  const params = { ...options };

  params.headers = {
    ...options.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (options.method && options.method.toLowerCase() !== 'get') {
    params.mode = 'cors';
    if (options.body && options.body !== null && typeof options.body === 'object') {
      params.body = JSON.stringify(options.body);
    }
  }

  const response = yield fetch(url, params);

  try {
    const result = yield parseJSON(response);
    return result;
  } catch (e) {
    return e;
  }
}
