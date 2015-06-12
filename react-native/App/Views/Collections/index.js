var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var Loading = require('../Loading');
var CollectionCell = require('./CollectionCell');
var Item = require('../Item');

var {
 View,
 Text,
 Image,
 TouchableHightlight,
 ActivityIndicatorIOS
} = React;

var Collections = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      dataSource: new ListView.dataSource({someFunctionHere})
      loaded: false,
    }
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
    }
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
        style={styles.collectionListView} />
      )
  },

  renderCollectionCell: function(collection) {
    return (
      <CollectionCell
        onselect={() => this.selectCollection}
        collection={collection} />
      )
  },

  selectCollection: function(collection) {
    this.props.navigator.push({
      title: collection.name,
      component: Item,
      passProps: {postId: post.id,
                  accessToken: this.state.accessToken}
    })
  }
})

module.exports = Collections;
