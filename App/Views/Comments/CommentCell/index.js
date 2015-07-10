var React = require('react-native');
var styles = require('./styles.js');

var Web = require('../../Web');

var Icon = require('FontAwesome');
var Hypertext = require('react-native-hypertext');
var parseLinks = require('../../../Utils/parse.js')

var {
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} = React;

var CommentCell = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.comment.user.name,
      comment: this.props.comment.body,
      image: this.props.comment.user.image_url['original']
    }
  },

  componentDidMount: function() {
    if (this.props.comment.child_comments_count === 1) {
      this.setState({
        numReplies: '1 Reply'
      })
    } else {
      this.setState({
        numReplies: this.props.comment.child_comments_count + ' Replies'
      })
    }
  },

  render: function() {
    if (!this.props.comment.isChildComment) {
      return (
        this.renderParentComment()
        )
    }
    return (
      this.renderChildComment()
      )
  },

  renderParentComment: function() {
    return (
      <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => this.props.selectProfile()}>
            <Image source={{uri: this.state.image}}
                   style={styles.image} />
          </TouchableWithoutFeedback>
        <View style={styles.postDetailsContainer}>
          <TouchableWithoutFeedback onPress={() => this.props.selectProfile()}>
            <Text style={styles.postTitle}>
            { this.state.name}
            </Text>
          </TouchableWithoutFeedback>
          <Text style={styles.commentorDetails}>{this.props.comment.user.headline}</Text>
          <Text style={styles.postDetailsLine}>
            <Hypertext
              onLinkClick={(link) => this.renderWeb(link)}>{parseLinks(this.state.comment)}</Hypertext>
          </Text>
            <View style={styles.container}>
              <Text style={styles.postChildrenDetails}>
                {this.state.numReplies}
              </Text>
              <Icon
                name='comments-o'
                size={12}
                color='#DA552F'
                style={styles.icon}
              />
            </View>
          <View style={styles.separator} />
        </View>
      </View>
      )
  },

  renderChildComment: function() {
    return (
      <View style={[styles.container, {marginLeft: this.props.comment.leftMargin}]}>
        <TouchableWithoutFeedback onPress={() => this.props.selectProfile()}>
          <Image source={{uri: this.state.image}}
                 style={styles.image} />
        </TouchableWithoutFeedback>
      <View style={styles.postDetailsContainer}>
        <TouchableWithoutFeedback onPress={() => this.props.selectProfile()}>
          <Text style={styles.postTitle}>
            {this.state.name}
          </Text>
        </TouchableWithoutFeedback>
        <Text style={styles.commentorDetails}>{this.props.comment.user.headline}</Text>
          <Text style={styles.childPostDetailsLine}>
            <Hypertext
              onLinkClick={(link) => this.renderWeb(link)}>{parseLinks(this.state.comment)}</Hypertext>
          </Text>
          <View style={styles.separator} />
        </View>
      </View>
    )
  },

  renderWeb: function() {
    this.props.navigator.push({
      title: 'Web',
      backButtonTitle: ' ',
      component: Web,
      passProps: {url: arguments[0]}
    })
  }
})

module.exports = CommentCell;
