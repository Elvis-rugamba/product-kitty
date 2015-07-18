var React = require('react-native');
var styles = require('./styles.js');

var {
  View,
  WebView,
  AlertIOS,
  AppStateIOS,
  NetInfo
} = React;

var Web = React.createClass({
  getInitialState: function() {
    return {
      currentState: AppStateIOS.currentState,
      isConnected: null
    }
  },

  componentWillMount: function() {
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({isConnected}); }
    );
  },

  componentDidMount: function () {
    AppStateIOS.addEventListener('change', this.handleAppStateChange);
    NetInfo.isConnected.addEventListener('change', this.handleConnectivityChange);
  },

  componentWillUnmount: function() {
    AppStateIOS.removeEventListener('change', this.handleAppStateChange);
    NetInfo.isConnected.removeEventListener('change', this.handleConnectivityChange);
  },

  handleAppStateChange: function(state) {
    this.setState({
      currentState: state
    });
  },

  handleConnectivityChange: function(connection) {
    this.setState({
      isConnected: connection
    })
  },

  render: function() {
    if (!this.state.isConnected) {
      return (
        this.renderLoading()
          )
    }

    return (
      <View style={styles.container}>
        <WebView url={this.props.url} />
      </View>
      )
  },

  renderLoading: function() {
    var Loading = require('../Loading')

    return (
      <View style={styles.container}>
        <Loading
          loaded={this.state.isConnected} />
      </View>
      )
  }
})

module.exports = Web;
