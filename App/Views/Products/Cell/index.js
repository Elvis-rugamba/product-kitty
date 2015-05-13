var React = require('react-native');

var styles = require('./styles');

var {
  Text,
  View,
  TouchableHighlight
} = React;

var Cell = React.createClass({
  componentDidMount: function() {
    console.log('In Cell!', this.props);
  },
  render: function() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
      <View style={styles.container}>
        <Text style={styles.postCount}>
          {this.props.post.votes_count}
        </Text>
        <View style={styles.postDetailsContainer}>
          <Text style={styles.postTitle}>
            {this.props.post.name}
          </Text>
          <Text style={styles.postDetailsLine}>
          Posted by {this.props.post.user.name} | {this.props.post.votes_count} Points | {this.props.post.comments_count} Comments
          </Text>
          <View style={styles.separator}/>
        </View>
      </View>
      </TouchableHighlight>
    );
  }
})
module.exports = Cell;
