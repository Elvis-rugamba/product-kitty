var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var Loading = require('../Loading');
var CollectionCell = require('./CollectionCell');
var SingleCollection = require('./SingleCollection');

var {
 View,
 ListView
} = React;

var Collections = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loaded: false,
    }
  },

  componentDidMount: function() {
    api.getAllCollections(this.props.accessToken)
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.collections),
          loaded: true
        })
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
        renderRow={this.renderCollectionCell}
        style={styles.collectionListView}
        automaticallyAdjustContentInsets={true}
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
