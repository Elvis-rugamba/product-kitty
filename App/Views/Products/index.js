'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var api = require('../../Utils/api.js');

var {
  Text,
  View,
} = React;

var Products = React.createClass({
  getInitialState: function() {
    return {
      accessToken: false,
      loaded: false
    }
  },
  componentWillMount: function () {
    fetch(api.token.link, api.token.object)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          accessToken: responseData.access_token,
        });
        console.log('response token = state token', responseData.access_token === this.state.accessToken);
      })
      .then(() => {
        console.log('componentWillMount', this.state.accessToken)
        this.getPosts();
      })
      .done();
  },
  getPosts: function() {
    var headersObj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.accessToken}`,
        'Origin': '',
        'Host': 'api.producthunt.com'
      }
    };
    fetch('https://api.producthunt.com/v1/posts/1', headersObj)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .done();
  },
  render: function() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <Text style={styles.loadingText}>
            {this.state.accessToken}
          </Text>
        </View>
      )
    }
    return (
      this.renderView()
    )
  },
  renderView: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>
          Hello
        </Text>
      </View>
    )
  }
  // render: function() {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.loadingText}>
  //         Test
  //       </Text>
  //     </View>
  //   );
  // },
  // render: function() {
  //   if (!this.state.loaded) {
  //     return(
  //       <View>
  //         <Text>
  //           Loading posts...
  //         </Text>
  //       </View>
  //     );
  //   }
  //   return (
  //     this.renderListView()
  //   )
  // },
  // renderListView: function() {
  //   return(
  //     <ListView
  //       dataSource={this.state.dataSource}/>

  //   )
  // }
})

// var Products = React.createClass({
//   render: function() {
//     return (
//       <View>
//         <Text>
//           Loading...
//         </Text>
//       </View>
//     )
//   }
// })


module.exports = Products;
