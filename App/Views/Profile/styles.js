var React = require('react-native');

var {
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
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
    color: '#DA552F'
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
  },
  productListView: {
    flex: 1,
  },
  noContent: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10,
    color: 'gray'
  }
})

module.exports = styles;
