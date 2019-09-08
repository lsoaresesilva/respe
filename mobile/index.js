/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const originalSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
  if (body === '') {
    originalSend.call(this);
  } else {
    originalSend.call(this, body);
  }
};

AppRegistry.registerComponent(appName, () => App);

