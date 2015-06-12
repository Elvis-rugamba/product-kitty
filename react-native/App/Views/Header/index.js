var React = require('react-native');
var styles = require('./styles.js');

var {
  View,
  Text,
  Image,
  ActivityIndicatorIOS
} = React;

var api = require('../../Utils/api.js');
var ParallaxView = require('react-native-parallax-view');

var Header = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      id: this.props.id,
      type: this.props.type
      loaded: false
    }
  },

  render: function() {
    if (!this.state.loaded) {
      return (
        this.renderLoadingSpinner()
        )
    }
    if (this.state.type === 'profile') {
      return (
        this.renderProfile()
        )
    } else if (this.state.type === 'product') {
      return (
        this.renderProduct()
        )
    }
  },

  renderLoadingSpinner: function() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          style={styles.spinner}
          size='large' />
      </View>
          )
  },

  renderProfile: function() {

  },

  renderProduct: function() {

  }
})

module.exports = Header;
