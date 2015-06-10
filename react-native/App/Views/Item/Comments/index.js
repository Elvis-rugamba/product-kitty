var React = require('react-native');
var styles = require('./styles');

var api = require('../../../Utils/api.js');
var CommentCell = require('./CommentCell');

var {
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight
} = React;

var Comments = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      postId: this.props.postId,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      comments: [],
      loaded: false
    }
  },

  componentWillMount: function() {
    api.getSinglePost(this.state.accessToken, this.state.postId)
      .then((responseData) => {
        this.setState({
          productLink: responseData.post.redirect_url,
          dataSource: this.state.dataSource.cloneWithRows(responseData.post.comments),
          loaded: true
        });
      })
      .then(() => {
        this.props.link(this.state.productLink)
      })
      .done()
  },

  render: function() {
    if (!this.state.loaded) {
      return (
        <View>
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
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCommentCell}
          style={styles.commentListView}
          automaticallyAdjustContentInsets={false}
          scrollEnabled={true} />
      </View>
      )
  },

  renderCommentCell: function(comment) {
    return (
      <CommentCell
        comment={comment} />
      )
  }
});

module.exports = Comments;
