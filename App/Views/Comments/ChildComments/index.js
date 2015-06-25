var React = require('react-native');
var styles = require('./styles.js');

var Loading = require('../../Loading');
var CommentCell = require('../CommentCell');

var {
  Text,
  View,
  ListView,
  Image
} = React;

var ChildComments = React.createClass({
  getInitialState: function() {
    return {
      comment: this.props.comment,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loaded: false
    }
  },

  componentDidMount: function() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.childComments),
      loaded: true
    })
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
        renderRow={this.renderCommentCell}
        renderHeader={this.renderHeader}
        contentInset={{bottom: 49}}
        automaticallyAdjustContentInsets={true} />
        )
  },

  renderCommentCell: function(comment) {
    return (
      <CommentCell
        comment={comment} />
        )
  },

  renderHeader: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.postTitle}>
          {this.props.username} wrote:
        </Text>
        <Text style={styles.postDetailsLine}>
          {this.props.body}
        </Text>
      </View>
        )
  }
})

module.exports = ChildComments;
