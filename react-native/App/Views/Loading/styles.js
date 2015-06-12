var React = require('react-native');

var {
  StyleSheet,
  Image
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFD',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
  logo: {
    justifyContent: 'center'
  }
})

module.exports = styles;
