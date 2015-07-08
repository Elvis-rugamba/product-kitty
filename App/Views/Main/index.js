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
  NetInfo,
  AlertIOS
} = React;

var Main = React.createClass({
  getInitialState: function() {
    return {
      accessToken: false,
      isConnected: null,
      selectedTab: 'products'
    }
  },

  componentDidMount: function() {
    NetInfo.isConnected.fetch().done((data) => {
      this.setState({
        isConnected: data
      })
      console.log('HELLO' + data)

    })
  },

  componentWillUpdate: function() {
    if (this.state.isConnected && !this.state.accessToken){
      api.getToken()
        .then((responseData) => {
          this.setState({
            accessToken: responseData.access_token,
          });
        })
        .done();
    }
  },

  componentWillUnmount: function() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this._handleConnectivityChange
    );
  },


  handleConnectivityChange: function(change) {
    this.setState({
      isConnected: change
    })
    console.log("I have changed!" + change)
  },

  render: function() {
    if (!this.state.isConnected) {
      return (
        <View style={styles.container}>
          <Loading
            loaded={this.state.isConnected} />
        </View>
        )
    }
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
        <Icon.TabBarItem
          title="About"
          selected={this.state.selectedTab === 'about'}
          iconName={'info'}
          iconSize={20}
          onPress={() => {
            this.setState({
              selectedTab: 'about'
            });
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
        tintColor='#D6573D'
        barTintColor='#FFFFFD'
        titleTextColor='#D6573D'
        ref='productRef'
        initialRoute={{
          title: 'Product Kitty',
          component: Products,
          backButtonTitle: ' ',
          passProps: {
            isConnected: this.state.isConnected
          }
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
        tintColor='#D6573D'
        barTintColor='#FFFFFD'
        titleTextColor='#D6573D'
        initialRoute={{
          title: 'About',
          component: About,
          backButtonTitle: ' ',
          passProps: {
            heartIcon: this.state.heartIcon
          }
        }} />
      </View>
        )
  }

})

module.exports = Main;
