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
      postName: this.props.postName,
      postTagline: this.props.postTagline,
      postedBy: this.props.postedBy,
      postVotes: this.props.postVotes,
      postComments: this.props.postComments,
      postImage: this.props.postImage,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      comments: [],
      loaded: false
    }
  },
  componentWillMount: function() {
    var headersObj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.accessToken}`,
        'Host': 'api.producthunt.com'
      }
    };

    fetch(`https://api.producthunt.com/v1/posts/${this.props.postId}`, headersObj)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          productLink: responseData.post.redirect_url,
          comments: responseData.post.comments
        })
      })
  },
  // render: function() {
  //   return (
  //     <TouchableHighlight onPress={this.onSelect}>
  //     <View style={styles.container}>
  //       <View style={styles.head}>
  //         <Text style={styles.postTitle}>
  //           {this.props.postName}
  //         </Text>
  //         <Text style={styles.postDetailsLine}>
  //         {this.props.postComments} Comments | {this.props.postVotes} Votes | Posted by {this.props.postedBy}
  //         </Text>
  //         <View style={styles.separator}/>
  //       </View>
  //     </View>
  //     </TouchableHighlight>
  //   )
  // },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.postTitle}>
          Test
        </Text>
      </View>
    )
  },

  onPress: function() {
    console.log('in onpress, hello')
  }
});

module.exports = Item;
