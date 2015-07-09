var React = require('react-native');
var styles = require('./styles.js');

var Icon = require('EvilIcons');

var {
  Text,
  Image,
  View,
  ListView,
  TouchableHighlight,
  SegmentedControlIOS,
  AlertIOS,
  AppStateIOS
} = React;

var Profile = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      profileId: this.props.profileId,
      name: this.props.name,
      selectedTab: 'Upvoted',
      upvotedDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      submittedDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      collectionsDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      madeDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loaded: false
    }
  },

  componentWillMount: function() {
    Icon.getImageSource('share-apple', 30)
      .then((source) => {
        this.setState({ shareIcon: source })
      });

    this.getProfileInfo();
  },

  componentDidMount: function () {
    AppStateIOS.addEventListener('change', this.handleAppStateChange);
  },

  componentWillUnmount: function() {
    AppStateIOS.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function(state) {
    this.getProfileInfo();
  },

  getProfileInfo: function() {
    var api = require('../../Utils/api.js');

    api.getProfileInfo(this.state.accessToken, this.state.profileId)
      .then((responseData) => {
        this.setState({
          image: responseData.user.image_url['original'],
          user: responseData.user,
          upvotedDataSource: responseData.user.votes_count === 0 ? false : this.state.upvotedDataSource.cloneWithRows(responseData.user.votes),
          submittedDataSource: responseData.user.posts_count === 0 ? false : this.state.submittedDataSource.cloneWithRows(responseData.user.posts),
          madeDataSource: responseData.user.maker_of_count === 0 ? false : this.state.madeDataSource.cloneWithRows(responseData.user.maker_of),
          loaded: true
        })

        if (responseData.user.collections_count === 0) {
          this.setState({
            collectionsDataSource: false
          })
        } else {
          api.getUserCollectionInfo(this.state.accessToken, this.state.profileId)
            .then((responseData) => {
              this.setState({
                collectionsDataSource: this.state.collectionsDataSource.cloneWithRows(responseData.collections)
              })
            })
            .done()
        }
      })
      .catch((error) => {
        AlertIOS.alert('Error', 'You need to be connected to the internet')
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
    var Loading = require('../Loading');

    return (
      <View style={styles.container}>
        <Loading
          loaded={this.state.loaded} />
      </View>
          )
  },

  renderHeader: function() {
    var BlurView = require('react-native-blur').BlurView;

    return (
      <View style={styles.header}>
        <View>
          <Image style={styles.backgroundImage}
            source={{uri: this.state.image}}>
            <BlurView blurType='xlight' style={styles.blur}>
              <Image style={styles.iconImage}
                source={{uri: this.state.image}} />
              <Text style={styles.userTitle}>
                {this.state.user.name}
              </Text>
              <Text style={styles.userDetailsLine}>
                {this.state.user.headline}
              </Text>
            </BlurView>
          </Image>
        </View>
      </View>
          )
  },

  renderSegments: function() {
    return (
      <View style={styles.segmentControl}>
        <SegmentedControlIOS
          values={['Upvoted', 'Submitted', 'Collections', 'Made']}
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
    if (this.state.selectedTab === 'Upvoted') {
      return (
        <View style={styles.container}>
            {this.renderUpvotedListView()}
        </View>
        )
    } else if (this.state.selectedTab === 'Submitted') {
      return (
          this.renderSubmittedListView()
          )
    } else if (this.state.selectedTab === 'Collections') {
      return (
          this.renderCollectionsListView()
          )
    } else if (this.state.selectedTab === 'Made') {
      return (
          this.renderMadeListView()
        )
    }
  },

  renderUpvotedListView: function() {
      if (!this.state.upvotedDataSource) {
        return (
          <View style={styles.noContent}>
            <Icon style={styles.icon} name="close-o" size={50} color="gray" />
            <Text style={styles.text}>
              No Products Upvoted
            </Text>
          </View>
          )
      } else {
        return (
          <ListView
            dataSource={this.state.upvotedDataSource}
            renderRow={this.renderProductCell}
            style={styles.productListView}
            automaticallyAdjustContentInsets={false}
            contentInset={{bottom: 50}} />
          )
      }
  },

  renderSubmittedListView: function() {
    if (!this.state.submittedDataSource) {
      return (
        <View style={styles.noContent}>
          <Icon style={styles.icon} name="close-o" size={50} color="gray" />
          <Text style={styles.text}>
            No Products Submitted
          </Text>
        </View>
        )
    } else {
      return (
        <ListView
          dataSource={this.state.submittedDataSource}
          renderRow={this.renderSubmittedCell}
          style={styles.productListView}
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom: 50}} />
        )
    }

  },

  renderCollectionsListView: function() {
    if (!this.state.collectionsDataSource) {
      return (
        <View style={styles.noContent}>
          <Icon style={styles.icon} name="close-o" size={50} color="gray" />
          <Text style={styles.text}>
            No Collections Curated
          </Text>
        </View>
        )
    } else {
      return (
        <ListView
          dataSource={this.state.collectionsDataSource}
          renderRow={this.renderCollectionCell}
          style={styles.productListView}
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom: 50}} />
        )
    }
  },

  renderMadeListView: function() {
    if (!this.state.madeDataSource) {
      return (
        <View style={styles.noContent}>
          <Icon style={styles.icon} name="close-o" size={50} color="gray" />
          <Text style={styles.text}>
            No Products Made
          </Text>
        </View>
        )
    } else {
      return (
        <ListView
          dataSource={this.state.madeDataSource}
          renderRow={this.renderSubmittedCell}
          style={styles.productListView}
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom: 50}} />
        )
    }
  },

  renderProductCell: function(post) {
    var ProductCell = require('../Products/Cell');

    return (
      <ProductCell
        onSelect={() => this.selectPost(post.post)}
        post={post.post} />
          )
  },

  renderSubmittedCell: function(post) {
    var ProductCell = require('../Products/Cell');

    return (
      <ProductCell
        onSelect={() => this.selectPost(post)}
        post={post} />
          )
  },

  renderCollectionCell: function(collection) {
    var CollectionCell = require('../Collections/CollectionCell');

    return (
      <CollectionCell
        onSelect={() => this.selectSingleCollection(collection)}
        collection={collection} />
        )
  },

  selectPost: function(post) {
    var Comments = require('../Comments');

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

  selectSingleCollection: function(collection) {
    var SingleCollection = require('../Collections/SingleCollection');

    this.props.navigator.push({
      title: collection.name,
      component: SingleCollection,
      backButtonTitle: ' ',
      passProps: {collectionId: collection.id,
                  accessToken: this.state.accessToken}
    })
  },

  shareSheet: function(post) {
    var ActivityView = require('react-native-activity-view');

    return (
      ActivityView.show({
        text: 'Check out ' + post.name + ' on Product Hunt',
        url: post.redirect_url,
        imageUrl: post.screenshot_url['300px']
      })
      )
  }

})

module.exports = Profile;
