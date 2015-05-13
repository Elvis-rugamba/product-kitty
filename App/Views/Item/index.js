var React = require('react-native');
var styles = require('./styles');
var api = require('../../Utils/api.js');

var {
  Text,
  View,
  ListView,
  TouchableHighlight
} = React;

var Item = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      loaded: false
    }
  },
  componentWillMount: function() {
    // Do an API call with whatever is passed in from props. Pass in the result to getInitialState.
    var headersObj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.accessToken}`,
        'Host': 'api.producthunt.com'
      }
    };

    fetch(`https://api.producthunt.com/v1/posts/${this.props.post_id}`, headersObj)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.post.comments[0].body);
      })
  },
  render: function() {
    return (
      <Text>Hello</Text>
      )
  }
});

module.exports = Item;
