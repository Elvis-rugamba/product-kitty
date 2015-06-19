var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var Loading = require('../Loading');
var Cell = require('./Cell');
var Item = require('../Item');

var {
  Text,
  View,
  ListView,
} = React;

var Products = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loaded: false
    }
  },

  componentDidMount: function () {
    if (!this.state.accessToken){
    api.getToken()
      .then((responseData) => {
        this.setState({
          accessToken: responseData.access_token,
        });
      })
      .then(() => {
        this.getAllPosts();
      })
    }
  },

  getAllPosts: function() {

    api.getAllPosts(this.state.accessToken)
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
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

  selectPost: function(post) {
    this.props.navigator.push({
      title: post.name,
      component: Item,
      passProps: {postId: post.id,
                  accessToken: this.state.accessToken}
    })
  }
})

module.exports = Products;
