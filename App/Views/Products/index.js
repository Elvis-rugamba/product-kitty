var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var Loading = require('../Loading');
var Cell = require('./Cell');
var Comments = require('../Comments');

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var Products = React.createClass({
  getInitialState: function() {

    var getSectionData = function(dataBlob, sectionId) {
      return dataBlob[sectionId];
    }


    return {
      accessToken: this.props.accessToken,
      currentDay: 0,
      dataBlob: {},
      dataSource: new ListView.DataSource({
        getSectionData: getSectionData,
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        }),
      loaded: false
    }
  },

  componentDidMount: function () {
    if (!this.state.accessToken){
    api.getToken()
      .then((responseData) => {
        this.setState({
          accessToken: responseData.access_token,
        });
      })
      .then(() => {
        this.getAllPosts();
      })
    }
  },

  getAllPosts: function() {

    api.getAllPosts(this.state.accessToken, this.state.currentDay)
      .then((responseData) => {
        var tempDataBlob = this.state.dataBlob;
        console.log(responseData.posts[0].day)
        var date = new Date(responseData.posts[0].day).toDateString();
        tempDataBlob[date] = responseData.posts;
        this.setState({
          currentDay: this.state.currentDay + 1,
          dataBlob: tempDataBlob
        });
        ;
      }).then(() => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.dataBlob, ),
          loaded: true
        })
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return (
        this.renderLoading()
        )
    }
    return (
      this.renderListView()
      )
  },

  renderLoading: function() {
    return (
      <View style={styles.container}>
        <Loading
          loaded={this.state.loaded} />
      </View>
      )
  },
  renderListView: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPostCell}
        renderSectionHeader={this.renderSectionHeader}
        renderFooter={this.renderFooter}
        onEndReached={() => {this.getAllPosts(this.state.currentDay)}}
        onEndReachedThreshold={40}
        style={styles.postsListView} />
      )
  },

  renderPostCell: function(post) {
    return (
        <Cell
          onSelect={() => this.selectPost(post)}
          post={post} />
    )
  },

  renderSectionHeader: function(sectionData, sectionID) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionText}>{sectionID}</Text>
      </View>
      )
  },

  renderFooter: function() {
    return (
      <View>
        <ActivityIndicatorIOS
          animating={true}
          size={'large'} />
      </View>)
  },

  selectPost: function(post) {
    this.props.navigator.push({
      title: post.name,
      component: Comments,
      passProps: {postId: post.id,
                  accessToken: this.state.accessToken}
    })
  }
})

module.exports = Products;
