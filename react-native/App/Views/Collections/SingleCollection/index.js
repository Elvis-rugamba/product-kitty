var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../../Utils/api.js');
var Loading = require('../../Loading');
var Cell = require('../../Products/Cell');
var Item = require('../../Item');

var {
  View,
  ListView,
  Image,
  Text,
  ScrollView
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

  componentDidMount: function() {
    api.getSingleCollection(this.state.accessToken, this.state.collectionId)
      .then((responseData) => {
        this.setState({
          collection: responseData.collection,
          dataSource: this.state.dataSource.cloneWithRows(responseData.collection.posts),
          loaded: true
        })
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
      <Text style={styles.postTitle}>
        {this.state.collection.title}
      </Text>
      <Text style={styles.postDetailsLine}>
        Curated by {this.state.collection.user.name}
      </Text>
      </View>
      )
  },

  selectPost: function(post) {
    this.props.navigator.push({
      title: post.name,
      component: Item,
      passProps: {postId: post.id,
                  accessToken: this.state.accessToken}
    })
  }
});

module.exports = SingleCollection;
