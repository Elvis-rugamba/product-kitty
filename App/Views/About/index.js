var React = require('react-native');
var styles = require('./styles.js');

var Icon = require('Foundation');
var Profile = require('../Profile');

var {
  View,
  Text,
  Image,
  SegmentedControlIOS,
  TouchableWithoutFeedback,
  LinkingIOS
} = React;

var About = React.createClass({
  getInitialState: function() {
    return({
      accessToken: this.props.accessToken
    })
  },

  render: function() {
    return (
      <View>
        <Text style={styles.header}>
          Product Kitty
        </Text>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.headline}>
              A Product Hunt browser built in React Native
            </Text>
            <TouchableWithoutFeedback onPress={() => this.web('producthunt.com')}>
              <Image source={require('image!ph-logo')}
                style={styles.image} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>
            Made with
          </Text>
          <Icon style={styles.lineIcon} name="heart" size={20} color="#DA552F" />
          <Text style={styles.text}>
             in San Francisco.
          </Text>
        </View>
        <Text style={styles.text}>
          Say Hello:
        </Text>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => this.email()}>
            <Icon style={styles.icon} name="mail" size={50} color="#DA552F" />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.web('github.com/rkho')}>
            <Icon style={styles.icon} name="social-github" size={50} color="#292f33" />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.twitter('twitter.com/rkho')}>
            <Icon style={styles.icon} name="social-twitter" size={50} color="#55acee" />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.selectProfile()}>
            <Image source={require('image!glasshole-kitty')} style={styles.phIcon} />
          </TouchableWithoutFeedback>
        </View>
      </View>
      )
  },

  email: function() {
    var mailApp = encodeURI('mailto:hello.productkitty@richardkho.com')

    var dispatch = encodeURI('x-dispatch:///compose?to=hello.productkitty@richardkho.com&subject=Hello from Product Kitty')

    LinkingIOS.canOpenURL(dispatch, (supported) => {
      if (!supported) {
        LinkingIOS.openURL(mailApp)
      } else {
        LinkingIOS.openURL(dispatch);
      }
    })
  },

  web: function(url) {
    var chromeURL = encodeURI('googlechromes://' + url);
    LinkingIOS.canOpenURL(chromeURL, (supported) => {
      if (!supported) {
        LinkingIOS.openURL('http://' + url);
      } else {
        LinkingIOS.openURL(chromeURL);
      }
    })
  },

  twitter: function(url) {
    var tweetBotURL = encodeURI('tweetbot://rkho/user_profile/rkho');
    var twitterURL = encodeURI('twitter://user?screen_name=rkho');
    LinkingIOS.canOpenURL(tweetBotURL, (supported) => {
      if (!supported) {
        LinkingIOS.canOpenURL(twitterURL, (supported) => {
          if (!supported) {
            this.web('https://' + url);
          } else {
            LinkingIOS.openURL(twitterURL);
          }
        })
      } else {
        LinkingIOS.openURL(tweetBotURL);
      }
    })
  },

  selectProfile: function() {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      backButtonTitle: ' ',
      passProps: {profileId: 'rkho',
                  name: 'Richard Kho',
                  accessToken: this.state.accessToken
      }
    })
  }

});

module.exports = About;
