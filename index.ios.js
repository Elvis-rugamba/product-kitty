/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var Main = require('./App/Views/Main');

var {
  AppRegistry,
  Navigator,
  View
} = React;

var PHReactNative = React.createClass({

  renderScene: function(route, navigator) {
    var Component = route.component;
    return (
      <View style={styles.container}>
        <Component
          route={route}
          navigator={navigator}
          topNavigator={navigator} />
      </View>
      )
  },

  render: function() {
    return (
      <Navigator
        sceneStyle={styles.container}
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={this.renderScene}
        tintColor='#D6573D'
        barTintColor='#FFFFFD'
        titleTextColor='#D6573D'
        navigationBarHidden={true}
        initialRoute={{
          title: 'Product Kitty',
          component: Main,
        }} />
    );
  }
});

AppRegistry.registerComponent('PHReactNative', () => PHReactNative);

module.exports = 'PHReactNative';
