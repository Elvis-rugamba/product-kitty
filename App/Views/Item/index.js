var React = require('react-native');
var styles = require('./styles');
var api = require('../../Utils/api.js');

var {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight
} = React;

var Item = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      comments: [],
      loaded: false
    }
  },

  componentDidMount: function() {
    api.getSinglePost(this.props.accessToken, this.props.postId)
      .then((responseData) => {
        this.setState({
          productLink: responseData.post.redirect_url,
          dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
          // comments: responseData.post.comments,
          loaded: true
        });
      })
  },

  render: function() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
        <Text style={styles.loadingText}>
          Loading...
        </Text>
        <ActivityIndicatorIOS
          animating={!this.state.loaded}
          style={styles.centering}
          size="large" />
        </View>
        )
    }
    return (
      this.renderListView()
      )
  },

  renderListView: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCommentsCell}
        style={styles.commentsListView} />
      )
  },

  onSelect: function() {
    console.log('in onpress, hello')
  }
});

module.exports = Item;
