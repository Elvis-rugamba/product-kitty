var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../../Utils/api.js');
var Loading = require('../../Loading');
var Cell = require('../../Products/Cell');
var Comments = require('../../Comments');

var BlurView = require('react-native-blur').BlurView
var ActivityView = require('react-native-activity-view');
var Icon = require('EvilIcons');

var {
  View,
  ListView,
  Text,
  Image,
  AlertIOS,
  AppStateIOS
} = React;

var SingleCollection = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      collectionId: this.props.collectionId,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loaded: false
    }
  },

  componentWillMount: function() {
    Icon.getImageSource('share-apple', 30)
      .then((source) => {
        this.setState({ shareIcon: source })
      });

      if (!this.state.loaded) {
        this.getSingleCollection()
      }
  },

  componentDidMount: function () {
    AppStateIOS.addEventListener('change', this.handleAppStateChange);
  },

  componentWillUnmount: function() {
    AppStateIOS.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function(state) {
    if (!this.state.loaded) {
      this.getSingleCollection()
    }
  },

  getSingleCollection: function() {
    api.getSingleCollection(this.state.accessToken, this.state.collectionId)
      .then((responseData) => {
        this.setState({
          collection: responseData.collection,
          dataSource: this.state.dataSource.cloneWithRows(responseData.collection.posts),
          loaded: true
        })
      })
      .catch((error) => {
        AlertIOS.alert('Error', 'You need to be connected to the internet')
      })
      .done();
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
          renderRow={this.renderPostCell}
          renderHeader={this.renderHeader}
          style={styles.postsListView} />
          )
  },

  renderPostCell: function(post) {
    return (
      <Cell
      onSelect={() => this.selectPost(post)}
      post={post} />
      )
  },

  renderHeader: function() {
    return (
      <View>
        <Image style={styles.backgroundImage}
          source={{uri: this.state.collection.background_image_url}}>
          <BlurView blurType="xlight" style={styles.blur}>
            <Text style={styles.postTitle}>
              {this.state.collection.name}
            </Text>
            <Text style={styles.postDetailsLine}>
              {this.state.collection.title}
            </Text>
            <Text style={styles.postDetailsLine}>
              {this.state.collection.posts_count} Items
            </Text>
            <Text style={styles.postDetailsLine}>
              Curated by {this.state.collection.user.name}
            </Text>
          </BlurView>
        </Image>
      </View>
      )
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

  shareSheet: function(post) {
    return (
      ActivityView.show({
        text: 'Check out ' + post.name + ' on Product Hunt',
        url: post.redirect_url,
        imageUrl: post.screenshot_url['300px']
      }))
  }
});

module.exports = SingleCollection;
