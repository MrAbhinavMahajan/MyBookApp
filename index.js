/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app/App';
import {name as appName} from './app.json';
var _ = require('lodash');

AppRegistry.registerComponent(appName, () => App);
