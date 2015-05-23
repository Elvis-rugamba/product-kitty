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
      marginBottom:10,
    },
    foot: {
      flex:2
    },
    image: {
      height: 48,
      width: 48,
      borderRadius: 25,
      marginTop: 75,
      alignSelf: 'center',
      marginRight: 5,
      marginLeft: 5
    },
    postDetailsContainer: {
      flex: 1
    },
    postTitle: {
      fontSize: 15,
      textAlign: 'center',
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
