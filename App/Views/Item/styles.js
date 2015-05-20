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
    head: {
      marginLeft:10,
      marginRight:10,
      marginBottom:5,
    },
    foot: {
      flex:2
    },
    image: {
      height: 15,
      borderRadius: 50,
      flex: 1,
    },
    postDetailsContainer: {
      flex: 1
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
    },
    title:{
      fontSize: 20,
      textAlign: 'left',
      marginTop: 10,
      marginBottom: 10,
      color: '#D6573D',
    },
    text:{
      fontSize: 14,
      marginBottom: 3,
    },
    source:{
      fontSize: 15,
      textAlign: 'left',
      color: '#0089FF',
    },
    separator: {
      height: 0.5,
      backgroundColor: '#CCCCCC',
    },
    loadingText:{
      color: '#D6573D',
      marginTop: 5,
      fontSize: 15,
    },
    commentTitle: {
      marginTop: 10,
      color: 'gray',
    },
    commentsLoading: {
      marginLeft: 10,
      color: '#D6573D',
    },
    commentListView:{
      color: '#000000',
      margin: 0,
      padding: 0,
      backgroundColor: '#FFFFFD',
    },
    postDetailsLine: {
      fontSize: 12,
      marginBottom: 10,
      color: 'gray',
    }
});

module.exports = styles;
