var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var Products = require('../Products');
var Collections = require('../Collections');
var About = require('../About');
var Loading = require('../Loading');

var Icon = require('Foundation');


var {
  View,
  TabBarIOS,
  NavigatorIOS,
} = React;

var Main = React.createClass({
  getInitialState: function() {
    console.log('token' + this.props.accessToken);
    return {
      accessToken: this.props.accessToken,
      selectedTab: 'products'
    }
  },

  render: function() {
    return (
      <TabBarIOS>
        <Icon.TabBarItem
          title='Home'
          ref='productsTabBar'
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
        <Icon.TabBarItem
          title="About"
          selected={this.state.selectedTab === 'about'}
          iconName={'info'}
          iconSize={20}
          onPress={() => {
            if (this.state.selectedTab !== 'about') {
            this.setState({
              selectedTab: 'about'
            });
            } else if (this.state.selectedTab === 'about') {
              this.refs.aboutRef.popToTop();
            }
          }}>
          {this.renderAboutView()}
        </Icon.TabBarItem>
      </TabBarIOS>
      )
  },

  renderProductView: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#DA552F'
        barTintColor='#FFFFFD'
        titleTextColor='#DA552F'
        ref='productRef'
        initialRoute={{
          title: 'Product Kitty',
          component: Products,
          backButtonTitle: ' ',
          passProps: {
            accessToken: this.state.accessToken,
          }
        }} />
        )
  },

  renderCollectionView: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#DA552F'
        barTintColor='#FFFFFD'
        titleTextColor='#DA552F'
        ref='collectionRef'
        initialRoute={{
          title: 'Collections',
          component: Collections,
          backButtonTitle: ' ',
          passProps: {
            accessToken: this.state.accessToken
          }
        }} />
        )
  },

  renderAboutView: function() {
    return (
      <View style={styles.container}>
      <NavigatorIOS
        style={styles.container}
        tintColor='#DA552F'
        barTintColor='#FFFFFD'
        titleTextColor='#DA552F'
        ref='aboutRef'
        initialRoute={{
          title: 'About',
          component: About,
          backButtonTitle: ' ',
          passProps: {
            heartIcon: this.state.heartIcon,
            accessToken: this.state.accessToken
          }
        }} />
      </View>
        )
  }

})

module.exports = Main;
