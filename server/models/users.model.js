const helperFunction = require('../helpers/helperFunction');

// constructor
const User = function(user) {
    this.username = user.username;
    this.password = user.password;
};

module.exports = User;