var React = require('react-native');
var styles = require('./styles');

var Comments = require('./Comments');
var Web = require('./Web');
var Icon = require('FAKIconImage')
var SMXTabBarIOS = require('SMXTabBarIOS');
var SMXTabBarItemIOS = SMXTabBarIOS.Item;

var {
  Text,
  View,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight,
  TabBarIOS,
} = React;

var Item = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'comments'
    }
  },

  render: function() {
    return (
        <TabBarIOS
          barTintColor="FFFFFD"
          tintColor="D6573D">
          <TabBarIOS.Item
            title="Comments"
            selected={this.state.selectedTab === 'comments'}
            onPress={() => {
              this.setState({
                selectedTab: 'comments'
              });
            }}>
            {this.renderCommentsView()}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Web"
            systemIcon="more"
            selected={this.state.selectedTab === 'web'}
            onPress={() => {
              this.setState({
                selectedTab: 'web'
              });
            }}>
            {this.renderWebView()}
          </TabBarIOS.Item>
        </TabBarIOS>
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
