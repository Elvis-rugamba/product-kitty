/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var Products = require('./App/Views/Products');

var {
  AppRegistry,
  NavigatorIOS
} = React;

var PHReactNative = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#D6573D'
        barTintColor='#FFFFFD'
        titleTextColor='#D6573D'
        initialRoute={{
          title: 'Products',
          component: Products,
        }} />
    );
  }
});

AppRegistry.registerComponent('PHReactNative', () => PHReactNative);

module.exports = 'PHReactNative';
