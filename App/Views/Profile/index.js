var React = require('react-native');
var styles = require('./styles.js');

var api = require('../../Utils/api.js');
var Loading = require('../Loading');

var BlurView = require('react-native-blur').BlurView;
var ActivityView = require('react-native-activity-view');

var {
  Text,
  Image,
  View,
  ListView,
  TouchableHighlight,
  SegmentedControlIOS
} = React;

var Profile = React.createClass({
  getInitialState: function() {
    return {
      accessToken: this.props.accessToken,
      profileId: this.props.profileId,
      name: this.props.name,
      selectedTab: 'Upvoted',
      upvotedDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      submittedDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      collectionsDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      madeDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loaded: false
    }
  },

  componentDidMount: function() {
    api.getProfileInfo(this.state.accessToken, this.state.profileId)
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          image: responseData.user.image_url['original'],
          user: responseData.user,
          upvotedDataSource: this.state.upvotedDataSource.cloneWithRows(responseData.user.votes),
          submittedDataSource: this.state.submittedDataSource.cloneWithRows(responseData.user.posts),
          loaded: true
        })
      })
      .done()
  },

  render: function() {
    if (!this.state.loaded) {
      return (
        this.renderLoading()
        )
    }
    return (
      <View>
        {this.renderHeader()}
        {this.renderSegments()}
      </View>
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

  renderHeader: function() {
    return (
      <View style={styles.header}>
        <View style={styles.centering}>
          <Image style={styles.backgroundImage}
            source={{uri: this.state.image}}>
            <BlurView blurType='xlight' style={styles.blur}>
              <Image style={styles.iconImage}
                source={{uri: this.state.image}} />
              <Text style={styles.userTitle}>
                {this.state.user.name}
              </Text>
              <Text style={styles.userDetailsLine}>
                {this.state.user.headline}
              </Text>
            </BlurView>
          </Image>
        </View>
      </View>
          )
  },

  renderSegments: function() {
    return (
      <View style={styles.segmentControl}>
        <SegmentedControlIOS
          values={['Upvoted', 'Submitted', 'Collections', 'Made']}
          selectedIndex={0}
          tintColor={'#D6573D'}
          onValueChange={(val) => {
            this.setState({
              selectedTab: val
            })
          }} />
        {this.renderListView()}
      </View>
        )
  },

  renderListView: function() {
    if (this.state.selectedTab === 'Upvoted') {
      return (
        <View style={styles.container}>
          {this.renderUpvotedListView()}
        </View>
        )
    } else if (this.stateselectedTab === 'Submitted') {
      return (
        <View style={styles.container}>
          {this.renderSubmittedListView()}
        </View>
          )
    } else if (this.state.selectedTab === 'Collections') {
      return (
        <View style={styles.container}>
          {this.renderCollectionsListView()}
        </View>
          )
    } else if (this.state.selectedTab === 'Made') {
      return (
        <View style={styles.container}>
          {this.renderMadeListView()}
        </View>
        )
    }
  },

  renderUpvotedListView: function() {

  },

  renderSubmittedListView: function() {

  },

  renderCollectionsListView: function() {

  },

  renderMadeListView: function() {

  }

})

module.exports = Profile;
