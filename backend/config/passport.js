const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GitLabStrategy = require('passport-gitlab2').Strategy;
const BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy;
const User = require('../models/User');


passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); 
    done(null, user);
  } catch (error) {
    done(error);
  }
});


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/auth/github/callback`,
  scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value || profile._json?.email || null;
    if (!email) {
      return done(new Error('No email found for GitHub account'), null);
    }

    let user = await User.findOne({ gitProviderId: profile.id, gitProvider: 'github' });
    if (!user) {
      user = new User({
        name: profile.displayName || 'Unknown User',
        email,
        gitProviderId: profile.id,
        gitProvider: 'github',
        accessToken,
      });
    } else {
      user.accessToken = accessToken;
    }

    await user.save();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

// GitLab Strategy
passport.use(new GitLabStrategy({
  clientID: process.env.GITLAB_CLIENT_ID,
  clientSecret: process.env.GITLAB_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/auth/gitlab/callback`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ gitProviderId: profile.id, gitProvider: 'gitlab' });
    if (!user) {
      user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        gitProviderId: profile.id,
        gitProvider: 'gitlab',
        accessToken
      });
      await user.save();
    } else {
      user.accessToken = accessToken;
      await user.save();
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
}));

// Bitbucket Strategy
passport.use(new BitbucketStrategy({
  clientID: process.env.BITBUCKET_CLIENT_ID,
  clientSecret: process.env.BITBUCKET_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/auth/bitbucket/callback`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ gitProviderId: profile.id, gitProvider: 'bitbucket' });
    if (!user) {
      user = new User({
        name: profile.displayName,
        email: profile.emails?.[0]?.value || null,
        gitProviderId: profile.id,
        gitProvider: 'bitbucket',
        accessToken
      });
      await user.save();
    } else {
      user.accessToken = accessToken;
      await user.save();
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
}));

module.exports = passport;
