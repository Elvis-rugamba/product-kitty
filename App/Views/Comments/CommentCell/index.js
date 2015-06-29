var React = require('react-native');
var styles = require('./styles.js');

var Icon = require('FAKIconImage');

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
      image: this.props.comment.user.image_url['48px'],
    }
  },

  componentDidMount: function() {
    if (this.props.comment.child_comments_count === 1) {
      this.setState({
        numReplies: '1 Reply'
      })
    } else {
      this.setState({
        numReplies: this.props.comment.child_comments_count + ' Replies'
      })
    }
  },

  render: function() {
    return (
        <View style={styles.container}>
          <View>
          <TouchableHighlight onPress={() => this.props.selectProfile()}>
            <Image source={{uri: this.state.image}}
                   style={styles.image} />
          </TouchableHighlight>
          </View>
          <View style={styles.postDetailsContainer}>
            <Text style={styles.postTitle}>
              {this.state.name}
            </Text>
            <Text style={styles.postDetailsLine}>
              {this.state.comment}
            </Text>
            <TouchableHighlight onPress={this.props.selectChildComment}>
              <View style={styles.container}>
                <Text style={styles.postChildrenDetails}>
                  {this.state.numReplies}
                </Text>
                <Icon
                  name='fontawesome|comments-o'
                  size={12}
                  color='#D6573D'
                  style={styles.icon}
                />
              </View>
            </TouchableHighlight>
            <View style={styles.separator} />
          </View>
        </View>
      )
  },

})

module.exports = CommentCell;
