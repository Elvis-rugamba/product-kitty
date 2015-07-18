var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var Loading = require('../Loading');
var CollectionCell = require('./CollectionCell');
var SingleCollection = require('./SingleCollection');

var {
 View,
 ListView,
 SegmentedControlIOS,
 AlertIOS,
 AppStateIOS
} = React;

var Collections = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      featuredCollectionsDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      allCollectionsDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      selectedTab: 'Featured',
      loaded: false
    }
  },

  componentWillMount: function() {
    if (!this.state.loaded) {
      this.getCollectionsData()
    }
  },

  componentDidMount: function() {
    AppStateIOS.addEventListener('change', this.handleAppStateChange);
  },

  componentWillUnmount: function() {
    AppStateIOS.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function(state) {
    if (!this.state.loaded) {
      this.getCollectionsData()
    }
  },

  getCollectionsData: function() {
    api.getFeaturedCollections(this.props.accessToken)
      .then((responseData) => {
        this.setState({
          featuredCollectionsDataSource: this.state.featuredCollectionsDataSource.cloneWithRows(responseData.collections),
          loaded: true
        })
      })
    .then(() => {
      api.getAllCollections(this.props.accessToken)
        .then((responseData) => {
          this.setState({
            allCollectionsDataSource: this.state.allCollectionsDataSource.cloneWithRows(responseData.collections),
          })
        })
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
          <View style={styles.segmentControl}>
            <SegmentedControlIOS
              values={['Featured', 'All']}
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

  renderLoading: function() {
    return (
      <View style={styles.container}>
        <Loading
          loaded={this.state.loaded} />
      </View>
      )
  },

  renderListView: function() {
    if (this.state.selectedTab === 'Featured') {
      return (
        <View style={styles.container}>
          {this.renderFeaturedCollectionsListView()}
        </View>
        )
    } else if (this.state.selectedTab === 'All') {
      return (
          this.renderAllCollectionsListView()
        )
    }
  },

  renderFeaturedCollectionsListView: function() {
    return (
      <ListView
        dataSource={this.state.featuredCollectionsDataSource}
        renderRow={this.renderCollectionCell}
        style={styles.collectionListView}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: 50}} />
        )
  },

  renderAllCollectionsListView: function() {
    return (
      <ListView
        dataSource={this.state.allCollectionsDataSource}
        renderRow={this.renderCollectionCell}
        style={styles.collectionListView}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: 50}}
       />
      )
  },

  renderCollectionCell: function(collection) {
    return (
      <CollectionCell
        onSelect={() => this.selectCollection(collection)}
        collection={collection} />
      )
  },

  selectCollection: function(collection) {
    this.props.navigator.push({
      title: collection.name,
      component: SingleCollection,
      backButtonTitle: ' ',
      passProps: {collectionId: collection.id,
                  accessToken: this.state.accessToken}
    })
  }
})

module.exports = Collections;
