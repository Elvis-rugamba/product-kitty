'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var api = require('../../Utils/api.js');

var {
  TabBarIOS,
  Text,
  View,
  ListView
} = React;

var Products = React.createClass({
  getInitialState: function() {
    return {
      clientToken: undefined,
      // dataSource: new ListView.DataSource({
      //   rowHasChanged: (row1, row2) => row1 !== row2
      // }),
      loaded: false
    }
  },
  // componentDidMount: function() {
  //   var test = this.getToken()
  //   this.setState({
  //     clientToken: test
  //   });
  // },
  componentDidMount: function () {
      this.setState({
        clientToken: this.getToken(),
        loaded: true
      })
  },
  getToken: function() {
    return api.getToken();
  },
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
  render: function() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>
          Loading
        </Text>
      </View>
    )
  }
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
