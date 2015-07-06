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


  render: function() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
            <View style={styles.commentDetailsContainer}>
              <Text style={styles.collectionTitle}>
                {this.state.collectionName} <Text style={styles.collectionDetailsLine}> {this.state.curator} </Text>
              </Text>
              <Text style={styles.collectionDetailsLine}>
                {this.state.tagLine}
              </Text>
            </View>
            <View style={styles.separator} />
            <Image source={{uri: this.state.imageLink}}
                   style={styles.image} />
        </View>
      </TouchableHighlight>
            )
  }
})

module.exports = CollectionCell;
