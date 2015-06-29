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
    return (
      <View style={styles.container}
        <RenderHeader />
        <RenderList />)
  },

  renderHeader: function() {
    return (
      <View style={styles.container}>
        <View style={styles.centering}>
          <Image style={styles.image}
            source={{uri: this.state.image}} />

        </View>
      </View>
          )
  },

  renderList: function() {

  }

})

module.exports = Profile;
