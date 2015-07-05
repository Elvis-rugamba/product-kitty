var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var Products = require('../Products');
var Collections = require('../Collections');

var Icon = require('Foundation');

var {
  View,
  TabBarIOS,
  NavigatorIOS
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
      <TabBarIOS>
        <Icon.TabBarItem
          title='Home'
          selected={this.state.selectedTab === 'products'}
          iconName={'home'}
          iconSize={20}
          onPress={() => {
            this.setState({
              selectedTab: 'products'
            });
          }}>
          {this.renderProductView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Collections"
          selected={this.state.selectedTab === 'collections'}
          iconName={'list'}
          iconSize={20}
          onPress={() => {
            this.setState({
              selectedTab: 'collections'
            });
          }}>
          {this.renderCollections()}
        </Icon.TabBarItem>
      </TabBarIOS>
      )
  },

  renderProductView: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#D6573D'
        barTintColor='#FFFFFD'
        titleTextColor='#D6573D'
        initialRoute={{
          title: 'Product Kitty',
          component: Products
        }} />
        )
  },

  renderCollections: function() {
    return (
      <View style={styles.container}>
      <Collections
        navigator={this.props.navigator}
        accessToken={this.state.accessToken} />
      </View>)
  }

})

module.exports = Main;
