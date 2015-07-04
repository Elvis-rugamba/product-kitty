String.prototype.parseURL = function() {
  return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=@]+/g, function(url) {
    return url.link(url);
  });
};

String.prototype.parseUsername = function() {
  return this.replace(/(?:^|\s)[@]+[A-Za-z0-9-_]+/g, function(u) {
    var username = u.replace("@","")
    if (username.charAt(0) === ' ') {
      username = username.replace(/\s+/g, '');
    }
    return u.link("http://twitter.com/"+username);
  });
};

var parseLinks = function(string) {
  return(string.parseURL().parseUsername());
}

module.exports = parseLinks;
