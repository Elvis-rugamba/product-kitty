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
    backgroundColor: '#FFFFFD'
  },
  section: {
    flex: 1,
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#F0F0F0'
  },
  sectionText: {
    color: '#D6573D',
    fontWeight: 'bold'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

module.exports = styles;
