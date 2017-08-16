'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

var _CALL_API = require('./CALL_API');

var _CALL_API2 = _interopRequireDefault(_CALL_API);

var _validation = require('./validation');

var _errors = require('./errors');

var _util = require('./util');

/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */
function apiMiddleware(_ref) {
  var _this = this;

  var getState = _ref.getState;

  return function (next) {
    return function callee$2$0(action) {
      var validationErrors, _callAPI, _requestType, callAPI, endpoint, headers, _callAPI$options, options, method, body, credentials, bailout, types, _normalizeTypeDescriptors, requestType, successType, failureType, res;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (_validation.isRSAA(action)) {
              context$3$0.next = 2;
              break;
            }

            return context$3$0.abrupt('return', next(action));

          case 2:
            validationErrors = _validation.validateRSAA(action);

            if (!validationErrors.length) {
              context$3$0.next = 7;
              break;
            }

            _callAPI = action[_CALL_API2['default']];

            if (_callAPI.types && Array.isArray(_callAPI.types)) {
              _requestType = _callAPI.types[0];

              if (_requestType && _requestType.type) {
                _requestType = _requestType.type;
              }
              next({
                type: _requestType,
                payload: new _errors.InvalidRSAA(validationErrors),
                error: true
              });
            }
            return context$3$0.abrupt('return');

          case 7:
            callAPI = action[_CALL_API2['default']];
            endpoint = callAPI.endpoint;
            headers = callAPI.headers;
            _callAPI$options = callAPI.options;
            options = _callAPI$options === undefined ? {} : _callAPI$options;
            method = callAPI.method;
            body = callAPI.body;
            credentials = callAPI.credentials;
            bailout = callAPI.bailout;
            types = callAPI.types;
            _normalizeTypeDescriptors = _util.normalizeTypeDescriptors(types);
            requestType = _normalizeTypeDescriptors[0];
            successType = _normalizeTypeDescriptors[1];
            failureType = _normalizeTypeDescriptors[2];
            context$3$0.prev = 21;

            if (!(typeof bailout === 'boolean' && bailout || typeof bailout === 'function' && bailout(getState()))) {
              context$3$0.next = 24;
              break;
            }

            return context$3$0.abrupt('return');

          case 24:
            context$3$0.next = 32;
            break;

          case 26:
            context$3$0.prev = 26;
            context$3$0.t0 = context$3$0['catch'](21);
            context$3$0.next = 30;
            return _regeneratorRuntime.awrap(_util.actionWith(_extends({}, requestType, {
              payload: new _errors.RequestError('[CALL_API].bailout function failed'),
              error: true
            }), [action, getState()]));

          case 30:
            context$3$0.t1 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t1));

          case 32:
            if (!(typeof endpoint === 'function')) {
              context$3$0.next = 43;
              break;
            }

            context$3$0.prev = 33;

            endpoint = endpoint(getState());
            context$3$0.next = 43;
            break;

          case 37:
            context$3$0.prev = 37;
            context$3$0.t2 = context$3$0['catch'](33);
            context$3$0.next = 41;
            return _regeneratorRuntime.awrap(_util.actionWith(_extends({}, requestType, {
              payload: new _errors.RequestError('[CALL_API].endpoint function failed'),
              error: true
            }), [action, getState()]));

          case 41:
            context$3$0.t3 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t3));

          case 43:
            if (!(typeof headers === 'function')) {
              context$3$0.next = 54;
              break;
            }

            context$3$0.prev = 44;

            headers = headers(getState());
            context$3$0.next = 54;
            break;

          case 48:
            context$3$0.prev = 48;
            context$3$0.t4 = context$3$0['catch'](44);
            context$3$0.next = 52;
            return _regeneratorRuntime.awrap(_util.actionWith(_extends({}, requestType, {
              payload: new _errors.RequestError('[CALL_API].headers function failed'),
              error: true
            }), [action, getState()]));

          case 52:
            context$3$0.t5 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t5));

          case 54:
            if (!(typeof options === 'function')) {
              context$3$0.next = 65;
              break;
            }

            context$3$0.prev = 55;

            options = options(getState());
            context$3$0.next = 65;
            break;

          case 59:
            context$3$0.prev = 59;
            context$3$0.t6 = context$3$0['catch'](55);
            context$3$0.next = 63;
            return _regeneratorRuntime.awrap(_util.actionWith(_extends({}, requestType, {
              payload: new _errors.RequestError('[CALL_API].options function failed'),
              error: true
            }), [action, getState()]));

          case 63:
            context$3$0.t7 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t7));

          case 65:
            context$3$0.next = 67;
            return _regeneratorRuntime.awrap(_util.actionWith(requestType, [action, getState()]));

          case 67:
            context$3$0.t8 = context$3$0.sent;
            next(context$3$0.t8);
            context$3$0.prev = 69;
            context$3$0.next = 72;
            return _regeneratorRuntime.awrap(_isomorphicFetch2['default'](endpoint, _extends({}, options, {
              method: method, body: body, credentials: credentials, headers: headers
            })));

          case 72:
            res = context$3$0.sent;
            context$3$0.next = 81;
            break;

          case 75:
            context$3$0.prev = 75;
            context$3$0.t9 = context$3$0['catch'](69);
            context$3$0.next = 79;
            return _regeneratorRuntime.awrap(_util.actionWith(_extends({}, requestType, {
              payload: new _errors.RequestError(context$3$0.t9.message),
              error: true
            }), [action, getState()]));

          case 79:
            context$3$0.t10 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t10));

          case 81:
            if (!res.ok) {
              context$3$0.next = 88;
              break;
            }

            context$3$0.next = 84;
            return _regeneratorRuntime.awrap(_util.actionWith(successType, [action, getState(), res]));

          case 84:
            context$3$0.t11 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t11));

          case 88:
            context$3$0.next = 90;
            return _regeneratorRuntime.awrap(_util.actionWith(_extends({}, failureType, {
              error: true
            }), [action, getState(), res]));

          case 90:
            context$3$0.t12 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t12));

          case 92:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[21, 26], [33, 37], [44, 48], [55, 59], [69, 75]]);
    };
  };
}

exports.apiMiddleware = apiMiddleware;

// Do not process actions without a [CALL_API] property

// Try to dispatch an error request FSA for invalid RSAAs

// Parse the validated RSAA action

// Should we bail out?

// Process [CALL_API].endpoint function

// Process [CALL_API].headers function

// Process [CALL_API].options function

// We can now dispatch the request FSA

// Make the API call

// The request was malformed, or there was a network error

// Process the server response