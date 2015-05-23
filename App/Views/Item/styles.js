var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#FFFFFD',
      flexDirection: 'column',
    },
    commentListView:{
      color: '#000000',
      margin: 0,
      marginTop: 10,
      marginRight: 15,
      padding: 0,
      backgroundColor: '#FFFFFD',
    },
    centering: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    },
    loadingText: {
      fontSize: 75,
      textAlign: 'center',
      marginTop: 75,
      marginBottom: 10,
      marginRight: 10,
      color: '#D6573D'
    }
});

module.exports = styles;
