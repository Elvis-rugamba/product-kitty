var React = require('react-native');
var styles = require('./styles');

var Comments = require('./Comments');
var Web = require('./Web');
var Icon = require('FAKIconImage')
var SMXTabBarIOS = require('SMXTabBarIOS');
var SMXTabBarItemIOS = SMXTabBarIOS.Item;

var {
  View
} = React;

var Item = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'comments'
    }
  },

  render: function() {
    return (
    <SMXTabBarIOS
      selectedTab={this.state.selectedTab}>
      <SMXTabBarItemIOS
        title="Comments"
        selected={this.state.selectedTab === 'comments'}
        iconName={'fontawesome|comments-o'}
        onPress={() => {
          this.setState({
            selectedTab: 'comments'
          });
        }}>
        {this.renderCommentsView()}
      </SMXTabBarItemIOS>
      <SMXTabBarItemIOS
        title="Web"
        selected={this.state.selectedTab === 'web'}
        iconName={'fontawesome|globe'}
        onPress={() => {
          this.setState({
            selectedTab: 'web'
          });
        }}>
        {this.renderWebView()}
      </SMXTabBarItemIOS>
    </SMXTabBarIOS>
      )
  },

  renderCommentsView: function() {

      return (
        <View style={styles.container}>
        <Comments
          accessToken={this.props.accessToken}
          postId={this.props.postId}
          link={(link) => this.getLink(link)} />
        </View>
        )
  },

  renderWebView: function() {
    return (
      <Web
        url={this.state.productLink} />
      )
  },

  getLink: function(link) {
    this.setState({
      productLink: link
    })
  }

});

module.exports = Item;
