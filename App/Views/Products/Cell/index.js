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
      numComments: this.props.post.comments_count,
      numVotes: this.props.post.votes_count,
      postedBy: this.props.post.user.name,
      imageLink: this.props.post.user.image_url['48px']
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
          {this.state.numComments} Comments | {this.state.numVotes} Votes | Posted by {this.state.postedBy}
          </Text>
          <View style={styles.separator}/>
        </View>
      </View>
      </TouchableHighlight>
      );
  }
})
module.exports = Cell;
