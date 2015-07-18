var React = require('react-native');
var styles = require('./styles.js');
var Main = require('./App/Views/Main');

var api = require('./App/Utils/api.js');
var Loading = require('./App/Views/Loading');

var {
  AppRegistry,
  Navigator,
  View,
  AlertIOS,
  AppStateIOS
} = React;

var PHReactNative = React.createClass({

  getInitialState: function() {
    return {
      accessToken: false,
      loaded: false,
    }
  },

  componentWillMount: function() {
    if (!this.state.loaded) {
      this.getAccessToken();
    }
  },

  componentDidMount: function() {
    AppStateIOS.addEventListener('change', this.handleAppStateChange);
  },

  componentWillUnmount: function() {
    AppStateIOS.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function(state) {
    if (!this.state.loaded) {
      this.getAccessToken();
    }
  },

  getAccessToken: function() {
    api.getToken()
      .then((responseData) => {
        this.setState({
          accessToken: responseData.access_token,
          loaded: true
        });
      })
      .catch((error) => {
        if (!this.state.loaded) {
          AlertIOS.alert('Error', 'You need to be connected to the internet')
        }
      })
      .done();
  },

  renderScene: function(route, navigator) {
    var Component = route.component;
    return (
      <View style={styles.container}>
        <Component
          route={route}
          navigator={navigator}
          topNavigator={navigator}
          accessToken={this.state.accessToken} />
      </View>
      )
  },

  render: function() {

    while (!this.state.loaded) {
      return (
        this.renderLoading()
        )
    }

    return (
      <Navigator
        sceneStyle={styles.container}
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={this.renderScene}
        tintColor='#DA552F'
        barTintColor='#FFFFFD'
        titleTextColor='#DA552F'
        navigationBarHidden={true}
        initialRoute={{
          title: 'Product Kitty',
          component: Main,
        }} />
    );
  },

  renderLoading: function() {
    return (
      <View style={styles.container}>
        <Loading
          loaded={this.state.loaded} />
      </View>
      )
  }
});

AppRegistry.registerComponent('PHReactNative', () => PHReactNative);

module.exports = 'PHReactNative';
