var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD',
    flex: 1
  },
  loadingText: {
    fontSize: 75,
    textAlign: 'center',
    marginTop: 75,
    marginBottom: 10,
    marginRight: 10,
    color: '#D6573D'
  },
  postsListView:{
    backgroundColor: '#FFFFFD',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
})

module.exports = styles;
