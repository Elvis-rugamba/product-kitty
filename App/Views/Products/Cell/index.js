var React = require('react-native');
var styles = require('./styles');

var Icon = require('EvilIcons');

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

  componentWillMount: function() {
    Icon.getImageSource('chevron-up', 30)
      .then((source) => {
        this.setState({
          upvotesIcon: source
        })
      })
  },

  componentDidMount: function() {
    if (!this.state.imageLink) {
      this.state.imageLink = this.props.post.user.image_url['original']
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
            <View style={styles.votesContainer}>
              <Icon name='chevron-up' size={30} color="#D6573D" style={styles.icon}/>
              <Text style={styles.votes}>
                {this.state.numVotes}
              </Text>
            </View>
        </View>
      </TouchableHighlight>
            );
  }
})
module.exports = Cell;
