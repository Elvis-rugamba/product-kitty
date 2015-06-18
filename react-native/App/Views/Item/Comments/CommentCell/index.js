var React = require('react-native');
var styles = require('./styles.js');

var {
  Text,
  View,
  Image,
  TouchableHighlight
} = React;

var CommentCell = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.comment.user.name,
      comment: this.props.comment.body,
      image: this.props.comment.user.image_url['48px']
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.state.image}}
               style={styles.image} />
        <View style={styles.postDetailsContainer}>
          <Text style={styles.postTitle}>
            {this.state.name}
          </Text>
          <Text style={styles.postDetailsLine}>
            {this.state.comment}
          </Text>
          <Text style={styles.postChildrenDetails}>
            {this.props.comment.child_comments_count} Replies
          </Text>
          <View style={styles.separator} />
        </View>
      </View>
      )
  }
})

module.exports = CommentCell;
