var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFD',
    },
    postTitle: {
      fontSize: 16,
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
