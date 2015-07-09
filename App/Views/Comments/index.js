var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var CommentCell = require('./CommentCell');
var ChildComments = require('./ChildComments');
var Loading = require('../Loading');
var Web = require('../Web');
var Profile = require('../Profile');

var BlurView = require('react-native-blur').BlurView;
var ActivityView = require('react-native-activity-view');


var {
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  SegmentedControlIOS
} = React;

var Comments = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      postId: this.props.postId,
      selectedTab: 'Comments',
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
          makers: responseData.post.makers,
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
      <View style={styles.container}>
        <View>
          {this.renderHeader()}
        </View>
        <View style={styles.container}>
          {this.renderSegments()}
        </View>
      </View>
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

  renderSegments: function() {
    return (
      <View style={styles.segmentControl}>
        <SegmentedControlIOS
          values={['Comments', 'Similar', 'Makers']}
          selectedIndex={0}
          tintColor={'#DA552F'}
          onValueChange={(val) => {
            this.setState({
              selectedTab: val
            })
          }} />
        {this.renderListView()}
      </View>
      )
  },

  renderListView: function() {
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCommentCell}
          style={styles.commentListView}
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom: 50}} />
      )
  },

  renderCommentCell: function(comment) {
    return (
      <CommentCell
        comment={comment}
        isChildComment={false}
        onSelect={() => this.selectComment(comment)}
        navigator={this.props.navigator}
        selectProfile={() => this.selectProfile(comment.user.id, comment.user.name)}
        selectChildComment={() => this.selectComment(comment)} />
      )
  },

  renderHeader: function() {
    return (
      <TouchableHighlight
        onPress={() => this.renderWeb()}>
        <View style={styles.header}>
          <Image style={styles.backgroundImage}
              source={{uri: this.state.image}}>
            <BlurView blurType='xlight' style={styles.blur}>
              <Text style={styles.postTitle}>
                {this.state.product.name + ' '}
              </Text>
              <Text style={styles.postDetailsLine}>
                {this.state.product.tagline + ' '}
              </Text>
              <Text style={styles.postDetailsLine}>
                Posted by {this.state.product.user.name}
              </Text>
              <Text style={styles.postDetailsLine}>
                {this.state.product.votes_count} Votes, {this.state.product.comments_count} Comments
              </Text>
            </BlurView>
          </Image>
        </View>
      </TouchableHighlight>
      )
  },

  renderWeb: function() {
    this.props.navigator.push({
      title: 'Web',
      component: Web,
      backButtonTitle: ' ',
      rightButtonIcon: this.props.shareIcon,
      onRightButtonPress: () => this.shareSheet(this.state.productLink),
      passProps: {url: this.state.productLink}
    })

  },

  selectComment: function(comment) {
    if (comment.child_comments_count > 0) {
      this.props.navigator.push({
        title: 'Replies',
        component: ChildComments,
        backButtonTitle: ' ',
        passProps: {comment: comment,
                    username: comment.user.name,
                    body: comment.body,
                    image: comment.user.image_url['48px'],
                    childComments: comment.child_comments,
                    selectProfile: (id, name) => { this.selectProfile(id, name) }
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
      })
    )
  },

  selectProfile: function(profileId, name) {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      backButtonTitle: ' ',
      passProps: {profileId: profileId,
                  name: name,
                  accessToken: this.state.accessToken
      }
    })
  }

});

module.exports = Comments;
