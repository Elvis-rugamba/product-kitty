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
  postTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    color: '#D6573D'
  },
  postDetailsLine: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
  }
});

module.exports = styles;
