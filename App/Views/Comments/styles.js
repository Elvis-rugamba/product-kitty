var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFD',
    },
    blur: {
      flex: 1,
      backgroundColor: 'transparent',
      resizeMode: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
      height: 150
    },
    postTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 4,
      color: '#D6573D'
    },
    postDetailsLine: {
      fontSize: 12,
      marginBottom: 10,
      color: 'gray',
    },
    makersLine: {
      fontSize: 12,
      color: '#D6573D'
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      height: 150,
    }
});

module.exports = styles;
