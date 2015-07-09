var React = require('react-native');
var styles = require('./styles');

var {
  Text,
  View,
  Image,
  TouchableHighlight
} = React;

var CollectionCell = React.createClass({
  getInitialState: function() {
    return {
      collectionName: this.props.collection.name,
      curator: this.props.collection.user.name,
      tagLine: this.props.collection.title,
      imageLink: this.props.collection.background_image_url
    }
  },

  componentDidMount: function() {
    if (!this.state.imageLink) {
      this.setState({
        imageLink: this.props.collection.user.image_url['original']
      })
    }

    if (!this.state.tagLine) {
      if (this.props.collection.posts_count === 1) {
        this.setState({
          tagLine: this.props.collection.posts_count + ' Item'
        })
      } else {
        this.setState({
          tagLine: this.props.collection.posts_count + ' Items'
        })
      }
    }
  },

  render: function() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
            <View style={styles.commentDetailsContainer}>
              <Text style={styles.collectionTitle}>
                {this.state.collectionName}
              </Text>
              <Text style={styles.collectionCurator}>Curated by {this.state.curator} </Text>
              <Text style={styles.collectionDetailsLine}>
                {this.state.tagLine}
              </Text>
            </View>
            <Image source={{uri: this.state.imageLink}}
                   style={styles.image} />
        </View>
      </TouchableHighlight>
            )
  }
})

module.exports = CollectionCell;
