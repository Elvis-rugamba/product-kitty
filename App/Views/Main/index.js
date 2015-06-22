var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var Products = require('../Products');
var Collections = require('../Collections');

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

  componentWillMount: function() {
    if (!this.state.accessToken){
    api.getToken()
      .then((responseData) => {
        this.setState({
          accessToken: responseData.access_token,
        });
      })
      .done();
    }
  },

  render: function() {
    return (
      <SMXTabBarIOS
        selectedTab={this.state.selectedTab}>
        <SMXTabBarItemIOS
          title='Home'
          selected={this.state.selectedTab === 'products'}
          iconName={'fontawesome|home'}
          onPress={() => {
            this.setState({
              selectedTab: 'products'
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
              selectedTab: 'collections'
            });
          }}>
          {this.renderCollections()}
        </SMXTabBarItemIOS>
      </SMXTabBarIOS>
      )
  },

  renderProducts: function() {
    return (
      <View style={styles.container}>
      <Products
        navigator={this.props.navigator} />
      </View>
      )
  },

  renderCollections: function() {
    return (
      <View style={styles.container}>
      <Collections
        navigator={this.props.navigator}
        accessToken={this.state.accessToken} />
      </View>)
  },

  setAccessToken: function(token) {
    this.setState({
      accessToken: token
    });
  }
})

module.exports = Main;
