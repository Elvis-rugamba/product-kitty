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

  getPosts: function(token) {
    var requestObj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Host': 'api.producthunt.com'
      }
    };

    return fetch('https://api.producthunt.com/v1/posts', requestObj)
      .then(function(res) {
        return res.json();
      })
  }
}

module.exports = api;
