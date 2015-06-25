var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFD',
      flexDirection: 'column'
    },
    postTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'left',
      marginTop: 15,
      marginBottom: 4,
      marginLeft: 5,
      color: '#D6573D'
    },
    postDetailsLine: {
      fontSize: 12,
      textAlign: 'left',
      marginBottom: 10,
      marginLeft: 5,
      color: 'gray',
    }
});

module.exports = styles;
