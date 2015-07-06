var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFD',
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'flex-start',
    marginRight: 15,
    marginLeft: 15
  },
  postDetailsContainer:{
    flex: 1,
  },
  postTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 2,
    marginRight: 10,
    color: '#D6573D'
  },
  commentorDetails: {
    fontSize: 12,
    marginBottom: 5,
    color: '#D6573D'
  },
  postDetailsLine: {
    fontSize: 12,
    marginRight: 10,
    color: 'gray',
  },
  childPostDetailsLine: {
    fontSize: 12,
    marginRight: 10,
    marginBottom: 10,
    color: 'gray'
  },
  postChildrenDetails: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
    marginRight: 5,
    color: 'gray',
    textAlign: 'right',
    flex: 1
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  },
  icon: {
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
    width: 12,
    height: 12
  }
})

module.exports = styles;
