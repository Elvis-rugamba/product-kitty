var keys = require('./keys.js');

var api = {

  getToken: function() {
    var requestObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': 'api.producthunt.com'
      },
      body: JSON.stringify({
      "client_id": keys.key,
      "client_secret": keys.secret,
      "grant_type": 'client_credentials'
      })
    };

    return fetch('https://api.producthunt.com/v1/oauth/token', requestObj)
      .then(function(res) {
        return res.json();
      })
  },

  getAllPosts: function(token, daysAgo) {
    daysAgo = daysAgo || 0;
    var requestObj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Host': 'api.producthunt.com'
      }
    };

    return fetch('https://api.producthunt.com/v1/posts?days_ago=' + daysAgo, requestObj)
      .then(function(res) {
        return res.json();
      })
  },

  getSinglePost: function(token, id) {
    var requestObj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Host': 'api.producthunt.com'
      }
    }
    return fetch('https://api.producthunt.com/v1/posts/' + id, requestObj)
      .then(function(res) {
        return res.json();
      })
  },

  getFeaturedCollections: function(token) {
    var requestObj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'origin': '',
        'Host': 'api.producthunt.com'
      }
    };
    return fetch('https://api.producthunt.com/v1/collections?search[featured]=true', requestObj)
      .then(function(res) {
        return res.json();
      })
  },

  getAllCollections: function(token) {
    var requestObj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'origin': '',
        'Host': 'api.producthunt.com'
      }
    };

    return fetch('https://api.producthunt.com/v1/collections?per_page=50', requestObj)
      .then(function(res) {
        return res.json();
      })
  },

  getSingleCollection: function(token, id) {
    var requestObj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'origin': '',
        'Host': 'api.producthunt.com'
      }
    };
    return fetch('https://api.producthunt.com/v1/collections/' + id, requestObj)
      .then(function(res) {
        return res.json();
      })
  },

  getProfileInfo: function(token, username) {
    var requestObj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'origin': '',
        'Host': 'api.producthunt.com'
      }
    };
    return fetch('https://api.producthunt.com/v1/users/' + username, requestObj)
      .then(function(res) {
        return res.json();
      })
  },


}

module.exports = api;
