var React = require('react-native');
var styles = require('./styles');

var {
  Text,
  View,
  Image,
  TouchableHighlight
} = React;

var Cell = React.createClass({
  getInitialState: function() {
    return {
      postName: this.props.post.name,
      tagLine: this.props.post.tagline,
      numComments: this.props.post.comments_count,
      numVotes: this.props.post.votes_count,
      postedBy: this.props.post.user.name,
      imageLink: this.props.post.screenshot_url['300px']
    }
  },

  render: function() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <Image source={{uri: this.state.imageLink}}
                 style={styles.image} />
            <View style={styles.postDetailsContainer}>
              <Text style={styles.postTitle}>
                {this.state.postName}
              </Text>
              <Text style={styles.postDetailsLine}>
              {this.state.tagLine}
              </Text>
            </View>
        </View>
      </TouchableHighlight>
            );
  }
})
module.exports = Cell;
