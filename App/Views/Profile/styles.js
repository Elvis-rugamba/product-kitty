var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    marginTop: 64,
  },
  blur: {
    flex: 1,
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150
  },
  userTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#D6573D'
  },
  userHeadline: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
  },
  segmentControl: {
    flex: 1,
  },
  iconImage: {
    height: 48,
    width: 48,
    borderRadius: 25,
    marginBottom: 15,
    alignSelf: 'center',

  }
})

module.exports = styles;
