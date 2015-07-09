var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  makerDetailsContainer: {
    flex: 1,
  },
  makerTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginRight: 10,
    color: '#DA552F'
  },
  makerDetails: {
    fontSize: 12,
    marginBottom: 5,
    color: 'gray'
  }
})

module.exports = styles;
