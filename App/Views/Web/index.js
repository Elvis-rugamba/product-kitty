var React = require('react-native');
var styles = require('./styles.js');

var {
  View,
  WebView
} = React;

var Web = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <WebView url={this.props.url} />
      </View>
      )
  }
})

module.exports = Web;
