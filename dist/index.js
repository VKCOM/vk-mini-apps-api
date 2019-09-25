'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

var version = "1.6.5";
/**
 * Creates counter interface
 */

var createCounter = function () {
  return {
    current: 0,
    next: function () {
      this.current += 1;
      return this.current;
    }
  };
};
/**
 * Creates interface for resolving request promises by request id's (or not)
 */


var createRequestResolver = function () {
  var counter = createCounter();
  var promiseControllers = {};
  return {
    /**
     * Adds new controller with resolve/reject methods
     * @param resolve Resolve function
     * @param reject Reject function
     * @returns New request id of the added controller
     */
    add: function (controller) {
      var id = counter.next();
      promiseControllers[id] = controller;
      return id;
    },

    /**
     * Resolves/rejects an added promise by request id and the `isSuccess`
     * predicate
     * @param requestId Request ID
     * @param data Data to pass to the resolve- or reject-function.
     * @param isSuccess Predicate to select the desired function
     */
    resolve: function (requestId, data, isSuccess) {
      var requestPromise = promiseControllers[requestId];

      if (requestPromise) {
        if (isSuccess(data)) {
          requestPromise.resolve(data);
        } else {
          requestPromise.reject(data);
        }

        promiseControllers[requestId] = null;
      }
    }
  };
};
/**
 * Returns send function that returns promises
 * @param send VK Connect send method
 * @param subscribe VK Connect subscribe method
 */


var promisifySend = function (send, subscribe) {
  var requestResolver = createRequestResolver(); // Subscribe to receive a data

  subscribe(function (event) {
    if (!event.detail || !event.detail.data) {
      return;
    }

    var _a = event.detail.data,
        requestId = _a.request_id,
        data = __rest(_a, ["request_id"]);

    if (requestId) {
      requestResolver.resolve(requestId, data, function (data) {
        return !('error_type' in data);
      });
    }
  });
  return function (method, props) {
    return new Promise(function (resolve, reject) {
      var requestId = requestResolver.add({
        resolve: resolve,
        reject: reject
      });
      send(method, __assign(__assign({}, props), {
        request_id: requestId
      }));
    });
  };
};
/**
 * Methods supported on the desktop
 */


var DESKTOP_METHODS = ['VKWebAppInit', 'VKWebAppGetCommunityAuthToken', 'VKWebAppAddToCommunity', 'VKWebAppGetUserInfo', 'VKWebAppSetLocation', 'VKWebAppGetClientVersion', 'VKWebAppGetPhoneNumber', 'VKWebAppGetEmail', 'VKWebAppGetGeodata', 'VKWebAppSetTitle', 'VKWebAppGetAuthToken', 'VKWebAppCallAPIMethod', 'VKWebAppJoinGroup', 'VKWebAppAllowMessagesFromGroup', 'VKWebAppDenyNotifications', 'VKWebAppAllowNotifications', 'VKWebAppOpenPayForm', 'VKWebAppOpenApp', 'VKWebAppShare', 'VKWebAppShowWallPostBox', 'VKWebAppScroll', 'VKWebAppResizeWindow', 'VKWebAppShowOrderBox', 'VKWebAppShowLeaderBoardBox', 'VKWebAppShowInviteBox', 'VKWebAppShowRequestBox', 'VKWebAppAddToFavorites'];
/**
 * Creates the CustomEvent ponyfill. VK clients use the CustomEvents to transfer data.
 */

var createCustomEventClass = function () {
  function CustomEvent(typeArg, eventInitDict) {
    var params = eventInitDict || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(typeArg, !!params.bubbles, !!params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = Event.prototype;
  return CustomEvent;
};
/**
 * List of functions that subscribed on events
 */


var subscribers = [];
var webFrameId = null;
var isBrowser = typeof window !== 'undefined';
var isIOSClientWebView = isBrowser && window.webkit && window.webkit.messageHandlers !== undefined && window.webkit.messageHandlers.VKWebAppClose !== undefined;
var androidBridge = isBrowser ? window.AndroidBridge : undefined;
var iosBridge = isIOSClientWebView ? window.webkit.messageHandlers : undefined;
var isWeb = isBrowser && !androidBridge && !iosBridge;
var eventType = isWeb ? 'message' : 'VKWebAppEvent';

if (isBrowser) {
  // Polyfill
  if (!window.CustomEvent) {
    window.CustomEvent = createCustomEventClass();
  }

  window.addEventListener(eventType, function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var _subscribers = __spreadArrays(subscribers);

    if (isWeb && args[0] && 'data' in args[0]) {
      var _a = args[0].data,
          _ = _a.webFrameId,
          connectVersion_1 = _a.connectVersion,
          data_1 = __rest(_a, ["webFrameId", "connectVersion"]); // FIXME


      if (data_1.type && data_1.type === 'VKWebAppSettings') {
        webFrameId = data_1.frameId;
      } else {
        _subscribers.forEach(function (fn) {
          fn({
            detail: data_1
          });
        });
      }
    } else {
      _subscribers.forEach(function (fn) {
        fn.apply(null, args); // FIXME
      });
    }
  });
}
/**
 * The send function
 */


var send = function (method, props) {
  if (props === void 0) {
    props = {};
  }

  if (androidBridge && typeof androidBridge[method] === 'function') {
    androidBridge[method](JSON.stringify(props));
  }

  if (iosBridge && iosBridge[method] && typeof iosBridge[method].postMessage === 'function') {
    iosBridge[method].postMessage(props);
  }

  if (isWeb) {
    parent.postMessage({
      handler: method,
      params: props,
      type: 'vk-connect',
      webFrameId: webFrameId,
      connectVersion: version
    }, '*');
  }
};
/**
 * The subscribe function
 */


var subscribe = function (fn) {
  subscribers.push(fn);
};
/**
 * The send function that returns promise
 */


var sendPromise = promisifySend(send, subscribe);
/**
 * VK connect
 */

var vkConnect = {
  /**
   * Sends a VK Connect method to client
   *
   * @example
   * message.send('VKWebAppInit');
   *
   * @param method The VK Connect method
   * @param [props] Method props object
   */
  send: send,

  /**
   * Subscribe on VKWebAppEvent
   *
   * @param fn Event handler
   */
  subscribe: subscribe,

  /**
   * Sends a VK Connect method to client and returns a promise of response data
   *
   * @param method The VK Connect method
   * @param [props] Method props object
   * @returns Promise of response data
   */
  sendPromise: sendPromise,

  /**
   * Unsubscribe on VKWebAppEvent
   *
   * @param fn Event handler
   */
  unsubscribe: function (fn) {
    var index = subscribers.indexOf(fn);

    if (index > -1) {
      subscribers.splice(index, 1);
    }
  },

  /**
   * Checks if it is client webview
   */
  isWebView: function () {
    return !!(androidBridge || iosBridge);
  },

  /**
   * Checks if native client supports handler
   *
   * @param method The VK Connect method
   */
  supports: function (method) {
    // Android support check
    if (androidBridge && typeof androidBridge[method] === 'function') {
      return true;
    } // iOS support check


    if (iosBridge && iosBridge[method] && typeof iosBridge[method].postMessage === 'function') {
      return true;
    } // Web support check


    if (!iosBridge && !androidBridge && DESKTOP_METHODS.includes(method)) {
      return true;
    }

    return false;
  }
}; // UMD exports

if (typeof exports !== 'object' || typeof module === 'undefined') {
  var root = null;

  if (typeof window !== 'undefined') {
    root = window;
  } else if (typeof global !== 'undefined') {
    root = global;
  } else if (typeof self !== 'undefined') {
    root = self;
  }

  if (root) {
    root.vkConnect = vkConnect; // Backward compatibility

    root.vkuiConnect = vkConnect;
  }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign$1 = function() {
    __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/** @ignore */
var VKConnectProvider = /** @class */ (function () {
    /** @ignore */
    function VKConnectProvider(
    /** @ignore */
    connect) {
        this.connect = connect;
    }
    /**
     * Subscribes to listen events and returns unsubscribe function
     */
    VKConnectProvider.prototype.createEventListener = function (methodName) {
        var _this = this;
        return function (callback) {
            var fn = function (event) {
                if (event.detail &&
                    event.detail.data &&
                    event.detail.type.indexOf(methodName) === 0 &&
                    !event.detail.type.includes('Failed')) {
                    callback(event.detail.data);
                }
            };
            _this.connect.subscribe(fn);
            return function () { return _this.connect.unsubscribe(fn); };
        };
    };
    return VKConnectProvider;
}());

/**
 * Converts attachment list to a attachments string.
 *
 * @param attachments List of attachments
 * @returns Comma-separated list of attachments in the above format
 */
var prepareAttachments = function (attachments) {
    return attachments.map(function (item) { return (typeof item === 'string' ? item : item.type + item.ownerId + '_' + item.mediaId); }).join(',');
};
/**
 * Common VK Mini App methods
 */
var Common = /** @class */ (function (_super) {
    __extends(Common, _super);
    function Common() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Subscribes a function for listening the `VKWebAppUpdateConfig` event.
         *
         * @platform iOS, Android
         *
         * @param callback Function to pass received data
         * @returns function for unsubscribe
         */
        _this.onUpdateConfig = _this.createEventListener('VKWebAppUpdateConfig');
        /**
         * Subscribes a function for listening the `VKWebAppViewHide` event.
         *
         * @platform iOS, Android
         *
         * @param callback Function to pass received data
         * @returns function for unsubscribe
         */
        _this.onViewHide = _this.createEventListener('VKWebAppViewHide');
        /**
         * Subscribes a function for listening the `VKWebAppViewRestore` event.
         *
         * @platform iOS, Android
         *
         * @param callback Function to pass received data
         * @returns function for unsubscribe
         */
        _this.onViewRestore = _this.createEventListener('VKWebAppViewRestore');
        /**
         * Disallows notifications
         *
         * @event VKWebAppDenyNotifications
         * @platform iOS, Android, Web
         */
        _this.denyNotifications = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppDenyNotifications')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Allows you to call a VK API method on behalf of the application.
         *
         * @remarks
         * Please note: that in order to work with the API, you need to transfer the
         * user access key with the appropriate rights obtained using `getAuthToken`
         * @see {@link getAuthToken}.
         *
         * @event VKWebAppCallAPIMethod
         * @platform iOS, Android, Web
         *
         * @param method API method name
         * @param params Parameters of the method, including access token
         */
        _this.callAPIMethod = function (method, params) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppCallAPIMethod', {
                            method: method,
                            params: params
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.response];
                }
            });
        }); };
        /**
         * Closes sub app opened via the `openApp` method. Sends data to the parent
         * app if needed.
         *
         * @event VKWebAppClose
         * @platform iOS
         */
        _this.closeApp = function (status, payload) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // TODO: figure out what openApp's returns
                    return [4 /*yield*/, this.connect.sendPromise('VKWebAppClose', { status: status, payload: payload })];
                    case 1:
                        // TODO: figure out what openApp's returns
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Requests user's access.
         *
         * @remarks
         * Please note: the location from which the token is requested must match
         * the URL specified in the app settings.
         *
         * @event VKWebAppGetAuthToken
         * @platform iOS, Android, Web
         *
         * @param [scope] List of scopes to request access
         * @returns User's access token and list of accessed scopes
         */
        _this.getAuthToken = function (appId, scope) { return __awaiter(_this, void 0, void 0, function () {
            var strScope, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strScope = Array.isArray(scope) ? scope.join(',') : '';
                        return [4 /*yield*/, this.connect.sendPromise('VKWebAppGetAuthToken', {
                                app_id: appId,
                                scope: strScope
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, {
                                accessToken: data.access_token,
                                scope: data.scope.split(',')
                            }];
                }
            });
        }); };
        /**
         * Returns client's platform and version
         *
         * @event VKWebAppGetClientVersion
         * @platform iOS, Android, Web
         */
        _this.getClientVersion = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connect.sendPromise('VKWebAppGetClientVersion')];
            });
        }); };
        /**
         * Opens sub app
         *
         * @event VKWebAppOpenApp
         * @platform iOS, Android, Web
         *
         * @param appId App id to open
         * @param locationHash String in location after `#`
         */
        _this.openApp = function (appId, locationHash) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppOpenApp', {
                            app_id: appId,
                            location: locationHash
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Requests user email
         *
         * @event VKWebAppGetEmail
         * @platform iOS, Android, Web
         *
         * @returns User email and sign of received data
         */
        _this.getEmail = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connect.sendPromise('VKWebAppGetEmail')];
            });
        }); };
        /**
         * Displays modal with friend select
         *
         * @event VKWebAppGetFriends
         * @platform iOS, Android
         *
         * @param isMultiple Multiple choice
         * @returns List of selected users data
         */
        _this.getFriends = function (isMultiple) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppGetFriends', { multi: isMultiple })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.users];
                }
            });
        }); };
        /**
         * Requests user geodata
         *
         * @event VKWebAppGetGeodata
         * @platform iOS, Android, Web
         *
         * @returns Object with current user geodata
         */
        _this.getGeodata = function () { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppGetGeodata')];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, {
                                isAvailable: !!data.available,
                                lat: parseFloat(data.lat),
                                long: parseFloat(data.long)
                            }];
                }
            });
        }); };
        /**
         * Requests user to enter some contact data. Depending on the specified
         * parameters, it is possible to request: phone, email, address.
         *
         * @param types Array of required data types: `phone`, `email`, `address`
         *
         * @event VKWebAppGetPersonalCard
         * @platform iOS >= 5.4, Android >= 5.24
         *
         * @returns Entered user data
         */
        _this.getPersonalCard = function (types) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connect.sendPromise('VKWebAppGetPersonalCard', { type: types })];
            });
        }); };
        /**
         * Requests user's phone number
         *
         * @event VKWebAppGetPhoneNumber
         * @platform iOS, Android, Web
         *
         * @returns Phone number and signature of received phone for server-side
         * validation. The signature is SHA256 checksum of concatenating next values
         * App ID, API secret (specified in the settings of your app), User ID,
         * field name (`phone_number`) and field value.
         */
        _this.getPhoneNumber = function () { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppGetPhoneNumber')];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, {
                                phone: data.phone_number,
                                sign: data.sign
                            }];
                }
            });
        }); };
        /**
         * Requests the main user data
         *
         * @event VKWebAppGetUserInfo
         * @platform iOS, Android, Web
         *
         * @returns User data
         */
        _this.getUserInfo = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connect.sendPromise('VKWebAppGetUserInfo')];
            });
        }); };
        /**
         * Opens QR codes and barcodes reader
         *
         * @event VKWebAppOpenCodeReader
         * @platform iOS, Android
         *
         * @returns Read data
         */
        _this.openCodeReader = function () { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppOpenCodeReader')];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.code_data];
                }
            });
        }); };
        /**
         * Opens a selecting contact from the contact list on the user's device.
         * If user has closed the contact list, called the `VKWebAppContactsClosed`
         * event.
         *
         * @event VKWebAppOpenContacts
         * @platform iOS, Android
         *
         * @returns Selected contact
         */
        _this.openContacts = function () { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppOpenContacts')];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, {
                                phone: data.phone,
                                firstName: data.first_name,
                                lastName: data.last_name
                            }];
                }
            });
        }); };
        /**
         * Requests the user to share a link on their wall
         *
         * @event VKWebAppShare
         * @platform iOS, Android, Web
         *
         * @param message The link to share
         * @returns ID of the post with shared link
         */
        _this.shareLink = function (message) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppShare', { link: message })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); };
        /**
         * Shows specified photos to user
         *
         * @event VKWebAppShowImages
         * @platform iOS, Android
         */
        _this.showImages = function (images, start_index) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppShowImages', { images: images, start_index: start_index })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Requests adding the app to favorites
         *
         * @event VKWebAppAddToFavorites
         * @platform iOS, Android
         */
        _this.addToFavorites = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppAddToFavorites')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Requests the user to post to the wall
         *
         * @event VKWebAppShowWallPostBox
         * @platform iOS, Android, Web
         *
         * @param message Post message. If you want to publish only attachments,
         * specify an empty string.
         * @param [attachments] List of attachments. May be one of the following
         * types:
         * - Array of attachment objects (@see {@link Attachment})
         * - Array of attachments in the following format:
         *   `<type><owner_id>_<media_id>`. E.g. `photo100172_166443618`
         * - Comma-separated list of attachments in the above format. E.g.
         *   `photo100172_166443618,photo-1_265827614`
         * @param [options] Options object (@see {@link PostMessageOptions})
         * @returns Published post ID
         */
        _this.postToWall = function (message, attachments, options) { return __awaiter(_this, void 0, void 0, function () {
            var params, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = __assign$1({ message: message, attachments: Array.isArray(attachments) ? prepareAttachments(attachments) : attachments }, (options && {
                            owner_id: options.ownerId,
                            signed: options.isSigned,
                            place_id: options.placeId,
                            lat: options.lat,
                            long: options.long
                        }));
                        return [4 /*yield*/, this.connect.sendPromise('VKWebAppShowWallPostBox', params)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.post_id];
                }
            });
        }); };
        /**
         *
         * @param peerId
         * @param message
         * @param attachments
         * @param lat
         * @param long
         */
        _this.showMessageBox = function (peerId, message, attachments, lat, long) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connect.sendPromise('VKWebAppShowMessageBox', {
                        peer_id: peerId,
                        message: message,
                        attachment: Array.isArray(attachments) ? prepareAttachments(attachments) : attachments,
                        lat: lat,
                        lng: long
                    })];
            });
        }); };
        return _this;
    }
    /**
     * Initializes the VK Mini App. Must be called before using any API method
     */
    Common.prototype.initApp = function () {
        this.connect.send('VKWebAppInit', {});
    };
    return Common;
}(VKConnectProvider));

/**
 * VK Pay methods
 */
var VKPay = /** @class */ (function (_super) {
    __extends(VKPay, _super);
    function VKPay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Requests payment to a specified user of the specified amount via VK Pay
         *
         * @event VKWebAppOpenPayForm
         * @platform iOS, Android, Web
         *
         * @param amount The amount of payment in rubles. The minimum value is 1₽
         * @param userId User ID
         * @param appId App ID
         * @param [description] Description of the payment for user. The text will
         * be shown in payment dialog
         * @returns Payment result data
         */
        _this.payToUser = function (amount, userId, appId, description) { return __awaiter(_this, void 0, void 0, function () {
            var props;
            return __generator(this, function (_a) {
                props = {
                    action: 'pay-to-user',
                    app_id: appId,
                    params: {
                        amount: amount,
                        user_id: userId,
                        description: description
                    }
                };
                return [2 /*return*/, this.connect.sendPromise('VKWebAppOpenPayForm', props)];
            });
        }); };
        /**
         * Requests payment to a specified community of the specified amount
         * via VK Pay
         *
         * @event VKWebAppOpenPayForm
         * @platform iOS, Android, Web
         *
         * @param amount The amount of payment in rubles. The minimum value is 1₽
         * @param communityId Community ID
         * @param appId App ID
         * @param [description] Description of the payment for user. The text will
         * be shown in payment dialog
         * @param [data] Dictionary with arbitrary parameters
         * @returns Payment result data
         */
        _this.payToCommunity = function (amount, communityId, appId, description, data) { return __awaiter(_this, void 0, void 0, function () {
            var props;
            return __generator(this, function (_a) {
                props = {
                    action: 'pay-to-group',
                    app_id: appId,
                    params: {
                        amount: amount,
                        group_id: communityId,
                        description: description,
                        data: data
                    }
                };
                return [2 /*return*/, this.connect.sendPromise('VKWebAppOpenPayForm', props)];
            });
        }); };
        /**
         * Requests transfer an arbitrary amount to a specified user
         *
         * @event VKWebAppOpenPayForm
         * @platform iOS, Android, Web
         *
         * @param userId User ID to transfer
         * @param appId App ID
         * @returns Payment result data
         */
        _this.transferToUser = function (userId, appId) { return __awaiter(_this, void 0, void 0, function () {
            var props;
            return __generator(this, function (_a) {
                props = {
                    action: 'transfer-to-user',
                    app_id: appId,
                    params: { user_id: userId }
                };
                return [2 /*return*/, this.connect.sendPromise('VKWebAppOpenPayForm', props)];
            });
        }); };
        /**
         * Requests transfer an arbitrary amount to a specified community
         *
         * @event VKWebAppOpenPayForm
         * @platform iOS, Android, Web
         *
         * @param communityId Community ID
         * @param appId App ID
         * @returns Payment result data
         */
        _this.transferToCommunity = function (communityId, appId) { return __awaiter(_this, void 0, void 0, function () {
            var props;
            return __generator(this, function (_a) {
                props = {
                    action: 'transfer-to-group',
                    app_id: appId,
                    params: { group_id: communityId }
                };
                return [2 /*return*/, this.connect.sendPromise('VKWebAppOpenPayForm', props)];
            });
        }); };
        return _this;
    }
    return VKPay;
}(VKConnectProvider));

/**
 * Device's flashlight API
 */
var Flashlight = /** @class */ (function (_super) {
    __extends(Flashlight, _super);
    function Flashlight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Requests device's flashlight information
         *
         * @event VKWebAppFlashGetInfo
         * @platform iOS, Android
         *
         * @returns Availability and level of the flashlight
         */
        _this.flashGetInfo = function () { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppFlashGetInfo', {})];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, {
                                isAvailable: data.is_available,
                                level: data.level
                            }];
                }
            });
        }); };
        /**
         * Sets device's flashlight level
         *
         * @event VKWebAppFlashSetLevel
         * @platform iOS, Android
         *
         * @param level The flashlight level from 0 to 1
         */
        _this.flashSetLevel = function (level) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppFlashSetLevel', { level: level })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return Flashlight;
}(VKConnectProvider));

/**
 * DirectGames API
 */
var DirectGames = /** @class */ (function (_super) {
    __extends(DirectGames, _super);
    function DirectGames() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Opens friends list for inviting to the app
         *
         * @event VKWebAppShowInviteBox
         * @platform iOS, Android
         */
        _this.showInviteBox = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppShowInviteBox')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Shows leaderboard
         *
         * @remarks
         * The leaderboard can display the progress of users by points or levels
         * (the type of leaderboard is selected in the application settings). To add
         * a level or points to users, use the `secure.addAppEvent` method.
         *
         * @event VKWebAppShowLeaderBoardBox
         * @platform iOS, Android
         *
         * @param userResult User result
         */
        _this.showLeaderBoardBox = function (userResult) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppShowLeaderBoardBox', {
                            user_result: userResult
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Shows item order box
         *
         * @event VKWebAppShowOrderBox
         *
         * @param itemName Name of product. Will be transmitted in the notification
         * of receipt of product information
         * @returns Status of ordering
         */
        _this.showOrderBox = function (itemName) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppShowOrderBox', {
                            type: 'item',
                            item: itemName
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.status];
                }
            });
        }); };
        /**
         * Shows box for sending request to the user
         *
         * @event VKWebAppShowRequestBox
         *
         * @param userId User Id
         * @param message Request test
         * @param [requestKey] Optional parameter. Custom string to track conversion.
         * It is passed in the application launch parameters in case of launch from
         * the request.
         * @returns Success flag and request key
         */
        _this.showRequestBox = function (userId, message, requestKey) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connect.sendPromise('VKWebAppShowRequestBox', { uid: userId, message: message, requestKey: requestKey })];
            });
        }); };
        return _this;
    }
    return DirectGames;
}(VKConnectProvider));

/**
 * Storage API
 */
var Storage = /** @class */ (function (_super) {
    __extends(Storage, _super);
    function Storage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Requests a value from the storage
         *
         * @event VKWebAppStorageGet
         * @platform iOS, Android, Web
         *
         * @param key Keys for getting ([a-zA-Z_\-0-9])
      
         * @returns The stored value or empty string if the value is not found
         */
        _this.get = function (key) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppStorageGet', { keys: [key] })];
                    case 1:
                        data = _a.sent();
                        if (!data || !Array.isArray(data.keys) || data.keys.length === 0) {
                            return [2 /*return*/, ''];
                        }
                        return [2 /*return*/, data.keys[0].value];
                }
            });
        }); };
        /**
         * Requests multiple values from the storage
         *
         * @event VKWebAppStorageGet
         * @platform iOS, Android, Web
         *
         * @param keys List of keys for getting ([a-zA-Z_\-0-9])
         *
         * @returns Map of key-value
         */
        _this.getMultiple = function (keys) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppStorageGet', { keys: keys })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data && Array.isArray(data.keys) && data.keys.length > 0
                                ? data.keys.reduce(function (acc, item) {
                                    var _a;
                                    return (__assign$1(__assign$1({}, acc), (_a = {}, _a[item.key] = item.value, _a)));
                                }, {})
                                : {}];
                }
            });
        }); };
        /**
         * Request list of keys of some stored values
         *
         * @event VKWebAppStorageGetKeys
         * @platform iOS, Android, Web
         *
         * @param count Count of keys to get. Max value is 1000
         * @param [offset] The offset required to fetch a specific subset of keys.
         * Default: 0
         */
        _this.getKeys = function (count, offset) {
            if (offset === void 0) { offset = 0; }
            return __awaiter(_this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppStorageGetKeys', { count: count, offset: offset })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, (data && data.keys) || []];
                    }
                });
            });
        };
        /**
         * Stores value in storage
         *
         * @event VKWebAppStorageSet
         * @platform iOS, Android, Web
         *
         * @param key The key of value ([a-zA-Z_\-0-9])
         * @param value Value
         */
        _this.set = function (key, value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppStorageSet', { key: key, value: value })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return Storage;
}(VKConnectProvider));

/**
 * Taptic Engine methods
 */
var TapticEngine = /** @class */ (function (_super) {
    __extends(TapticEngine, _super);
    function TapticEngine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Triggers impact feedback in Taptic Engine
         *
         * @event VKWebAppTapticImpactOccurred
         * @platform iOS
         */
        _this.impactOccurred = function (power) {
            if (power === void 0) { power = 'medium'; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppTapticImpactOccurred', { style: power })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Triggers notification feedback in Taptic Engine
         *
         * @event VKWebAppTapticNotificationOccurred
         * @platform iOS
         */
        _this.notificationOccurred = function (type) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppTapticNotificationOccurred', { type: type })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Triggers selection feedback in Taptic Engine
         *
         * @event VKWebAppTapticSelectionChanged
         * @platform iOS
         */
        _this.selectionChanged = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppTapticSelectionChanged')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return TapticEngine;
}(VKConnectProvider));

/**
 * Communities interactions methods
 */
var Communities = /** @class */ (function (_super) {
    __extends(Communities, _super);
    function Communities() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Request to add the app to a community. Opens a community selection dialog
         *
         * @remarks
         * Please note: to call the method, in the app settings must be checked
         * "Allow installation in communities". Also, the app must be accessible to
         * everyone.
         *
         * @event VKWebAppAddToCommunity
         * @platform iOS, Android, Web
         *
         * @returns {Promise<number>} ID of group to which the app was added
         */
        _this.addApp = function () { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppAddToCommunity')];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.group_id];
                }
            });
        }); };
        /**
         * Asks user for permission to send messages from a the community
         *
         * @event VKWebAppAllowMessagesFromGroup
         * @platform iOS, Android, Web
         *
         * @param communityId Id of a community to request permissions for
         * @param [key] Arbitrary string. This parameter can be used to identify
         * the user. Its value will be returned in the message_allow Callback API
         * event.
         */
        _this.allowMessages = function (communityId, key) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppAllowMessagesFromGroup', {
                            group_id: communityId,
                            key: key
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Asks the user for permission to send messages from a the community
         *
         * @event VKWebAppAllowNotifications
         * @platform iOS, Android, Web
         */
        _this.allowNotifications = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppAllowNotifications')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Requests community access for working with API on behalf of the community.
         * The community access token can only be received by its admin.
         *
         * For further work, get a user access key with the rights `scope=groups`
         * and make a request to the `groups.get` method with the `filter=admin`
         * parameter to get a list of identifiers of the administrated communities.
         *
         * New universal event
         * @event VKWebAppGetCommunityToken
         *
         * Legacy events
         * @event VKWebAppCommunityAccessToken iOS
         * @event VKWebAppCommunityToken Android
         * @event VKWebAppGetCommunityAuthToken Web
         *
         * @platform iOS, Android, Web
         *
         * @param communityId Community ID
         * @param appId App ID
         * @param [scope] List of scopes to request access
         * @returns Community access token
         */
        _this.getToken = function (communityId, appId, scope) { return __awaiter(_this, void 0, void 0, function () {
            var strScope, availableMethod, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strScope = Array.isArray(scope) ? scope.join(',') : '';
                        availableMethod = [
                            'VKWebAppCommunityAccessToken',
                            'VKWebAppCommunityToken',
                            'VKWebAppGetCommunityAuthToken',
                            'VKWebAppGetCommunityToken'
                        ].filter(function (method) { return _this.connect.supports(method); })[0];
                        if (availableMethod == null) {
                            throw new Error("Couldn't find available method to get community token");
                        }
                        return [4 /*yield*/, this.connect.sendPromise(availableMethod, {
                                app_id: appId,
                                group_id: communityId,
                                scope: strScope
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, {
                                accessToken: data.access_token
                            }];
                }
            });
        }); };
        /**
         * Requests for join a community
         *
         * @event VKWebAppJoinGroup
         * @platform iOS, Android, Web
         */
        _this.join = function (communityId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppJoinGroup', { group_id: communityId })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Sends event to a community.
         *
         * @remarks
         * Dispatches the `app_payload` event, which you can receive through
         * `Bots Longpoll` or `callback_api`. The application from which the event is
         * dispatched must be installed in the community.
         *
         * @event VKWebAppSendPayload
         * @platform iOS, Android, Web
         *
         * @param communityId Community ID
         * @param payload Any data to send as JSON
         */
        _this.sendPayload = function (communityId, payload) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppSendPayload', {
                            group_id: communityId,
                            payload: payload
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Sens request to open a screen with a preview of the widget for a
         * community
         *
         * @event VKWebAppShowCommunityWidgetPreviewBox
         */
        _this.showWidgetPreviewBox = function (communityId, type, code) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppShowCommunityWidgetPreviewBox', {
                            type: type,
                            group_id: communityId,
                            code: code
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return Communities;
}(VKConnectProvider));

var Interface = /** @class */ (function (_super) {
    __extends(Interface, _super);
    function Interface() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Resizes iframe size in web
         *
         * @event VKWebAppResizeWindow
         * @platform Web
         *
         * @param width Width of iframe
         * @param [height] Height of iframe
         *
         * @returns Result size of the iframe
         */
        _this.resizeWindow = function (width, height) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connect.sendPromise('VKWebAppResizeWindow', { width: width, height: height })];
            });
        }); };
        /**
         * Scrolls window to specified point
         *
         * @event VKWebAppScroll
         * @platform Web
         *
         * @param offsetTop Offset top
         * @param [speed] Speed of scrolling if need smooth scroll. Default: 0
         *
         * @returns Offset top and height of window after scroll
         */
        _this.scrollTo = function (offsetTop, speed) {
            if (speed === void 0) { speed = 0; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connect.sendPromise('VKWebAppScroll', { top: offsetTop, speed: speed })];
                });
            });
        };
        /**
         * Sets location hash to the app (vk.com/app123#hash)
         *
         * @event VKWebAppSetLocation
         */
        _this.setLocationHash = function (hash) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppSetLocation', { location: hash })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Changes the appearance of the mini app interface in mobile clients
         *
         * @event VKWebAppSetViewSettings
         * @platform iOS, Android
         *
         * @param statusBarStyle Status bar style type: `light` or `dark`
         * @param [actionBarColor] HEX Color of action bar
         */
        _this.setViewSettings = function (statusBarStyle, actionBarColor) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect.sendPromise('VKWebAppSetViewSettings', {
                            status_bar_style: statusBarStyle,
                            action_bar_color: actionBarColor
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return Interface;
}(VKConnectProvider));

var Ads = /** @class */ (function (_super) {
    __extends(Ads, _super);
    function Ads() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Subscribes a function for listening the `VKWebAppInitAds` event.
         *
         * @platform iOS, Android, Web
         *
         * @param callback Function to pass received data
         * @returns function for unsubscribe
         */
        _this.onInitAds = _this.createEventListener('VKWebAppInitAds');
        /**
         * Subscribes a function for listening the `VKWebAppInitAds` event.
         *
         * @platform iOS, Android, Web
         *
         * @param callback Function to pass received data
         * @returns function for unsubscribe
         */
        _this.onLoadAds = _this.createEventListener('VKWebAppLoadAds');
        return _this;
    }
    return Ads;
}(VKConnectProvider));

/**
 * VK Mini apps API. Contains all VK Connect methods separated by categories
 */
var VKMiniAppAPI = /** @class */ (function () {
    function VKMiniAppAPI(connect) {
        this.connect = connect;
        /** Common Mini App methods */
        this.common = new Common(this.connect);
        /** VK Pay methods */
        this.vkPay = new VKPay(this.connect);
        /** Flashlights methods */
        this.flashlight = new Flashlight(this.connect);
        /** DirectGames methods */
        this.directGames = new DirectGames(this.connect);
        /** Storage methods */
        this.storage = new Storage(this.connect);
        /** Taptic Engine methods */
        this.tapticEngine = new TapticEngine(this.connect);
        /** Interface methods */
        this.interface = new Interface(this.connect);
        /** Communities methods */
        this.communities = new Communities(this.connect);
        /** Advertisement methods */
        this.ads = new Ads(this.connect);
    }
    return VKMiniAppAPI;
}());

/**
 * Creates instance of VK Mini App API
 * @param options Options of the instance
 */
var createVKMiniAppAPI = function (options) {
    if (options === void 0) { options = {}; }
    var connect = options.customConnect == null ? vkConnect : options.customConnect;
    return new VKMiniAppAPI(connect);
};

exports.createVKMiniAppAPI = createVKMiniAppAPI;
