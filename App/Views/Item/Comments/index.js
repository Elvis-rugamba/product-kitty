var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../../Utils/api.js');
var CommentCell = require('./CommentCell');
var ChildComments = require('./ChildComments');
var Loading = require('../../Loading');

var {
  Text,
  View,
  ListView,
} = React;

var Comments = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      postId: this.props.postId,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loaded: false
    }
  },

  componentWillMount: function() {
    api.getSinglePost(this.state.accessToken, this.state.postId)
      .then((responseData) => {
        this.setState({
          product: responseData.post,
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
        this.renderLoading()
        )
    }
    return (
      this.renderListView()
      )
  },

  renderLoading: function() {
    return (
      <View style={styles.container}>
        <Loading
          loaded={this.state.loaded} />
      </View>
      )
  },

  renderListView: function() {
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCommentCell}
          renderHeader={this.renderHeader}
          contentInset={{top: 20, bottom: 49}}
          automaticallyAdjustContentInsets={false} />
      )
  },

  renderCommentCell: function(comment) {
    return (
      <CommentCell
        comment={comment}
        onSelect={() => this.selectComment(comment)} />
      )
  },

  renderHeader: function() {
    return (
      <View>
        <Text style={styles.postTitle}>
          {this.state.product.tagline}
        </Text>
        <Text style={styles.postDetailsLine}>
          {this.state.product.votes_count} Votes, {this.state.product.comments_count} Comments
        </Text>
      </View>
      )
  },

  selectComment: function(comment) {
    if (comment.child_comments_count > 0) {
      this.props.navigator.push({
        title: 'Replies',
        component: ChildComments,
        passProps: {commet: comment,
                    username: comment.user.name,
                    body: comment.body,
                    image: comment.user.image_url['48px'],
                    childComments: comment.child_comments}
      })
    }
  }

});

module.exports = Comments;