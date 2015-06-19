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
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 4,
    marginRight: 5,
    color: '#D6573D'
  },
  postDetailsLine: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    color: 'gray',
  }
});

module.exports = styles;
