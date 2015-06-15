var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD',
    flex: 1
  },
  postsListView:{
    backgroundColor: '#FFFFFD',
  },
  image: {
    flex: 1,
    width: 300,
  },
  postTitle: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    color: '#FFFFFD'
  },
  postDetailsLine: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
  }
});

module.exports = styles;
