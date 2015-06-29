var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var CommentCell = require('./CommentCell');
var ChildComments = require('./ChildComments');
var Loading = require('../Loading');
var Web = require('../Web');

var VibrancyView = require('react-native-blur').VibrancyView;
var ActivityView = require('react-native-activity-view');


var {
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight
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
          image: responseData.post.screenshot_url['850px'],
          productLink: responseData.post.redirect_url,
          dataSource: this.state.dataSource.cloneWithRows(responseData.post.comments),
          loaded: true
        });
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
          automaticallyAdjustContentInsets={true} />
      )
  },

  renderCommentCell: function(comment) {
    return (
      <CommentCell
        comment={comment}
        isChildComment={false}
        onSelect={() => this.selectComment(comment)}
        navigator={this.props.navigator} />
        selectProfile={() => this.selectProfile(comment.user.id)}
        selectChildComment={() => this.selectComment(comment)} />
      )
  },

  renderHeader: function() {
    return (
      <TouchableHighlight
        onPress={() => this.renderWeb()}>
        <View style={styles.container}>
          <Image style={styles.backgroundImage}
              source={{uri: this.state.image}}>
            <VibrancyView blurType="xlight" style={styles.blur}>
              <Text style={styles.postTitle}>
                {this.state.product.tagline}
              </Text>
              <Text style={styles.postDetailsLine}>
                Posted by {this.state.product.user.name}
              </Text>
              <Text style={styles.postDetailsLine}>
                {this.state.product.votes_count} Votes, {this.state.product.comments_count} Comments
              </Text>
            </VibrancyView>
          </Image>
        </View>
      </TouchableHighlight>
      )
  },

  renderWeb: function() {
    this.props.navigator.push({
      title: 'Web',
      component: Web,
      rightButtonIcon: this.props.backIcon,
      onRightButtonPress: () => this.shareSheet(this.state.productLink),
      passProps: {url: this.state.productLink}
    })

  },

  selectComment: function(comment) {
    if (comment.child_comments_count > 0) {
      this.props.navigator.push({
        title: 'Replies',
        component: ChildComments,
        passProps: {comment: comment,
                    username: comment.user.name,
                    body: comment.body,
                    image: comment.user.image_url['48px'],
                    childComments: comment.child_comments,
                    backIcon: this.props.backIcon
                    selectProfile: (id) => { this.selectProfile(id) }
                  }
      })
    }
  },

  shareSheet: function(link) {
    return (
      ActivityView.show({
        text: 'Check out ' + this.state.product.name + ' on Product Hunt',
        url: link,
        imageUrl: this.state.image
      }))
  selectProfile: function(id) {
    console.log(id);
  }

});

module.exports = Comments;
