var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var Products = require('../Products');


var Icon = require('FAKIconImage');
var SMXTabBarIOS = require('SMXTabBarIOS');
var SMXTabBarItemIOS = SMXTabBarIOS.Item;

var {
  View
} = React;

var Main = React.createClass({
  getInitialState: function() {
    return {
      accessToken: false,
      selectedTab: 'products'
    }
  },
  render: function() {
    return (
      <SMXTabBarIOS
        selectedTab={this.state.selectedTab}>
        <SMXTabBarItemIOS
          title='Products'
          selected={this.state.selectedTab === 'products'}
          iconName={'fontawesome|home'}
          onPress={() => {
            this.setState({
              selected: 'products'
            });
          }}>
          {this.renderProducts()}
        </SMXTabBarItemIOS>
        <SMXTabBarItemIOS
          title="Collections"
          selected={this.state.selectedTab === 'collections'}
          iconName={'fontawesome|bars'}
          onPress={() => {
            this.setState({
              selected: 'collections'
            });
          }}>
          {this.renderCollections()}
        </SMXTabBarItemIOS>
        <SMXTabBarItemIOS
          title="Search"
          selected={this.state.selectedTab === 'search'}
          iconName={'fontawesome|search'}
          onPress={() => {
            this.setState({
              selected: 'search'
            });
          }}>
          {this.renderSearch()}
        </SMXTabBarItemIOS>
      </SMXTabBarIOS>
      )
  },
  renderProducts: function() {
    return (
      <View style={styles.container}>
      <Products
        navigator={this.props.navigator}
        setAccessToken={this.setAccessToken} />
      </View>
      )
  },
  renderCollections: function() {

  },
  renderSearch: function() {

  },
  setAccessToken: function(token) {
    this.setState({
      accessToken: token
    });
  }
})

module.exports = Main;
