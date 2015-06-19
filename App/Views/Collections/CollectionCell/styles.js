var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFD'
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'flex-end',
    marginRight: 15,
    marginLeft: 15
  },
  commentDetailsContainer: {
    flex: 1
  },
  collectionTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 25,
    color: '#D6573D'
  },
  collectionDetailsLine: {
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 25,
    color: 'gray',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
  }
})

module.exports = styles;
