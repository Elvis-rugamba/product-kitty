var React = require('react-native');
var styles = require('./styles');
var api = require('../../Utils/api.js');
var CommentCell = require('./CommentCell');
var Web = require('./Web');

var {
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight
} = React;

var Item = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      comments: [],
      loaded: false
    }
  },

  componentWillMount: function() {
    api.getSinglePost(this.props.accessToken, this.props.postId)
      .then((responseData) => {
        this.setState({
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
        <View style={styles.container}>
        <Text style={styles.loadingText}>
          Loading...
        </Text>
        <ActivityIndicatorIOS
          animating={!this.state.loaded}
          style={styles.centering}
          size="large" />
        </View>
        )
    }
    return (
      this.renderListView()
      )
  },

  renderListView: function() {
    return (
      <View style={styles.container}>
      <TouchableHighlight onPress={this.onSelect}>
      <View style={styles.header}>

      </View>
      </TouchableHighlight>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderCommentCell}
        style={styles.commentListView}
        automaticallyAdjustContentInsets={false} />
      </View>
      )
  },

  renderCommentCell: function(comment) {
    return (
      <CommentCell
        comment={comment} />
      )
  },

  onSelect: function() {
    this.props.navigator.push({
      title: 'Web View',
      component: Web,
      passProps: {
        url: this.state.productLink
      }
    });
  }
});

module.exports = Item;
