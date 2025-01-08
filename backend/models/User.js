const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  gitProviderId: String,
  gitProvider: {
    type: String,
    enum: ['github', 'gitlab', 'bitbucket']
  },
  accessToken: String,
  repositories: [{
    id: String,
    autoReview: Boolean
  }]
});

module.exports = mongoose.model('User', UserSchema);

