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
    backgroundColor: '#FFFFFD'
  },
  header: {
    flex: 1,
    marginTop: 75,
    marginBottom: 60,
    fontSize: 48,
    textAlign: 'center',
    color: '#DA552F',
    fontWeight: '200'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'gray'
  },
  lineIcon: {
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'flex-start',
    marginRight: 15,
    marginLeft: 15
  }
})

module.exports = styles;
