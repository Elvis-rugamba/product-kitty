var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var Loading = require('../Loading');

var {
  Text
  Image,
  View,
  ListView
} = React;

var Profile = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      profileId: this.props.profileId,
      loaded: false
    }
  },

  render: function() {
    if (!this.state.loaded) {
      return (
        this.renderLoading()
        )
    }
    return (
      this.renderProfile()
      )
  },

  renderLoading: function() {
    return (
      <View style={styles.container}
        <Loading
          loaded={this.state.loaded} />
          )
  },

  renderProfile: function() {

  }

})

module.exports = Profile;
