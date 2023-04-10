/**
 * @format
 */
 import 'react-native-gesture-handler'
 import {AppRegistry,LogBox,Text} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 import moment from 'moment-timezone';
 Text.defaultProps = Text.defaultProps || {};
 Text.defaultProps.allowFontScaling = false;
 moment.tz.setDefault("Singapore");
 LogBox.ignoreAllLogs();
 
 AppRegistry.registerComponent(appName, () => App);
 