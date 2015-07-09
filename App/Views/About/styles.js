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
  logoContainer: {
    flex: 1,
    flexDirection: 'column'
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
  headline: {
    flex: 1,
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
    color: 'gray'
  },
  text: {
    fontSize: 14,
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
    marginRight: 20,
  },
  phIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    marginLeft: 10,
    marginRight: 20
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 25,
    marginBottom: 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
})

module.exports = styles;
