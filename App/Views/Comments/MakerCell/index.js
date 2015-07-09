var React = require('react-native');
var styles = require('./styles.js');

var {
  Text,
  View,
  Image,
  TouchableHighlight
} = React;

var MakerCell = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.user.name,
      tagline: this.props.user.headline,
      image: this.props.user.image_url['original']
    }
  },

  render: function() {
    return (
      <TouchableHighlight onPress={() => this.props.selectProfile()}>
        <View style={styles.container}>
            <Image source={{uri: this.state.image}}
              style={styles.image} />
          <View style={styles.makerDetailsContainer}>
              <Text style={styles.makerTitle}>
                {this.state.name}
              </Text>
            <Text style={styles.makerDetails}>
              {this.state.tagline}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
      )
  }
})

module.exports = MakerCell;
