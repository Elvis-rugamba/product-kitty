var React = require('react-native');
var styles = require('./styles.js');

var Icon = require('EvilIcons');


var {
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  SegmentedControlIOS,
  AlertIOS,
  AppStateIOS
} = React;

var Comments = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      postId: this.props.postId,
      selectedTab: 'Comments',
      commentsDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      similarDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      makersDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loaded: false
    }
  },

  componentWillMount: function() {
    this.getSinglePost();
  },

  componentDidMount: function () {
    AppStateIOS.addEventListener('change', this.handleAppStateChange);
  },

  componentWillUnmount: function() {
    AppStateIOS.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function(state) {
    this.getSinglePost();
  },

  getSinglePost: function() {
    var api = require('../../Utils/api.js');

    api.getSinglePost(this.state.accessToken, this.state.postId)
      .then((responseData) => {
        this.setState({
          product: responseData.post,
          image: responseData.post.screenshot_url['850px'],
          productLink: responseData.post.redirect_url,
          commentsDataSource: responseData.post.comments.length === 0 ? false : this.state.commentsDataSource.cloneWithRows(this.loadAllComments(responseData.post.comments)),
          similarDataSource: responseData.post.related_posts.length === 0 ? false : this.state.similarDataSource.cloneWithRows(responseData.post.related_posts),
          makersDataSource: responseData.post.makers.length === 0 ? false : this.state.makersDataSource.cloneWithRows(responseData.post.makers),
          loaded: true
        });
      })
      .catch((error) => {
        AlertIOS.alert('Error', 'You need to be connected to the internet')
      })
      .done()
  },

  loadAllComments: function(commentsArray) {
    var commentsArr = [];

    commentsArray.forEach(function(elem) {
      commentsArr.push(elem);

      if (elem.child_comments_count > 0) {
        elem.child_comments.forEach(function(childElem) {
          childElem.leftMargin = 30;
          childElem.isChildComment = true;
          commentsArr.push(childElem);
        })
      }
    })

    return commentsArr;
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
    var Loading = require('../Loading');

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
    if (this.state.selectedTab === 'Comments') {
      return (
        <View style={styles.container}>
          {this.renderCommentsListView()}
        </View>
        )
    } else if (this.state.selectedTab === 'Similar') {
      return (
        this.renderSimilarListView()
        )
    } else if (this.state.selectedTab === 'Makers') {
      return (
        this.renderMakersListView()
        )
    }
  },

  renderCommentsListView: function() {

    if (!this.state.commentsDataSource) {
      return (
        <View style={styles.noContent}>
          <Icon style={styles.icon} name="close-o" size={50} color="gray" />
          <Text style={styles.text}>
            No Comments Written
          </Text>
        </View>
        )
    } else {
    return (
        <ListView
          dataSource={this.state.commentsDataSource}
          renderRow={this.renderCommentCell}
          style={styles.commentListView}
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom: 50}} />
      )
    }
  },

  renderSimilarListView: function() {
    if (!this.state.similarDataSource) {
      return (
        <View style={styles.noContent}>
          <Icon style={styles.icon} name="close-o" size={50} color="gray" />
          <Text style={styles.text}>
            No Similar Products
          </Text>
        </View>
        )
    } else {
    return (
      <ListView
        dataSource={this.state.similarDataSource}
        renderRow={this.renderPostCell}
        style={styles.commentListView}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: 50}} />
        )
    }
  },

  renderMakersListView: function() {
    if (!this.state.makersDataSource) {
      return (
        <View style={styles.noContent}>
          <Icon style={styles.icon} name="close-o" size={50} color="gray" />
          <Text style={styles.text}>
            No Makers Identified
          </Text>
        </View>
        )
    } else {
      return (
        <ListView
          dataSource={this.state.makersDataSource}
          renderRow={this.renderMakerCell}
          style={styles.commentListView}
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom: 50}} />
          )
    }
  },

  renderCommentCell: function(comment) {
    var CommentCell = require('./CommentCell');

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

  renderMakerCell: function(user) {
    var MakerCell = require('./MakerCell');

    return (
      <MakerCell
        user={user}
        selectProfile={() => this.selectProfile(user.id, user.name)}
        navigator={this.props.navigator} />
        )
  },

  renderHeader: function() {
    var BlurView = require('react-native-blur').BlurView;

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

  renderPostCell: function(post) {
    var Cell = require('../Products/Cell');

    return (
        <Cell
          onSelect={() => this.selectPost(post)}
          post={post} />
    )
  },

  renderWeb: function() {
    var Web = require('../Web');

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
    var ChildComments = require('./ChildComments');

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

  selectPost: function(post) {
    this.props.navigator.push({
      title: post.name,
      component: Comments,
      backButtonTitle: ' ',
      rightButtonIcon: this.state.shareIcon,
      onRightButtonPress: () => this.shareSheet(post),
      passProps: {postId: post.id,
                  accessToken: this.state.accessToken,
                  shareIcon: this.state.shareIcon}
    })
  },

  shareSheet: function(link) {
    var ActivityView = require('react-native-activity-view');

    return (
      ActivityView.show({
        text: 'Check out ' + this.state.product.name + ' on Product Hunt',
        url: link,
        imageUrl: this.state.image
      })
    )
  },

  selectProfile: function(profileId, name) {
    var Profile = require('../Profile');

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
