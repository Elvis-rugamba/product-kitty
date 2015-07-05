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
            if (this.state.selectedTab !== 'products') {
              this.setState({
                selectedTab: 'products'
              });
            } else if (this.state.selectedTab === 'products') {
              this.refs.productRef.popToTop();
            }
          }}>
          {this.renderProductView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Collections"
          selected={this.state.selectedTab === 'collections'}
          iconName={'list'}
          iconSize={20}
          onPress={() => {
            if (this.state.selectedTab !== 'collections') {
              this.setState({
                selectedTab: 'collections'
              });
            } else if (this.state.selectedTab === 'collections') {
              this.refs.collectionRef.popToTop();
            }
          }}>
          {this.renderCollectionView()}
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
        ref='productRef'
        initialRoute={{
          title: 'Product Kitty',
          component: Products
        }} />
        )
  },

  renderCollectionView: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#D6573D'
        barTintColor='#FFFFFD'
        titleTextColor='#D6573D'
        ref='collectionRef'
        initialRoute={{
          title: 'Collections',
          component: Collections,
          passProps: {
            accessToken: this.state.accessToken
          }
        }} />
        )
  }

})

module.exports = Main;
