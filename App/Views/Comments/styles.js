var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFD',
    },
    header: {
      flex: 1,
      marginTop: 64
    },
    segmentControl: {
      flex: 1
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
      color: '#DA552F'
    },
    postDetailsLine: {
      fontSize: 12,
      color: 'gray',
    },
    makersLine: {
      fontSize: 12,
      color: '#DA552F'
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      height: 150,
    },
    commentListView: {
      flex: 1
    },
    noContent: {
      marginTop: 60,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontSize: 16,
      marginTop: 25,
      marginBottom: 10,
      color: 'gray'
    }
});

module.exports = styles;
