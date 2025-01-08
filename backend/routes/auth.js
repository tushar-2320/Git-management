
const express = require('express');
const passport = require('passport');
const router = express.Router();

// GitHub Auth
router.get('/github', passport.authenticate('github', { scope: ['user', 'repo'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect('http://localhost:5173/profile')
);

// GitLab Auth
router.get('/gitlab', passport.authenticate('gitlab', { scope: ['read_user', 'read_repository'] }));
router.get('/gitlab/callback', passport.authenticate('gitlab', { failureRedirect: '/login' }),
  (req, res) => res.redirect(process.env.FRONTEND_URL + '/profile')
);

// Bitbucket Auth
router.get('/bitbucket', passport.authenticate('bitbucket'));
router.get('/bitbucket/callback', passport.authenticate('bitbucket', { failureRedirect: '/login' }),
  (req, res) => res.redirect(process.env.FRONTEND_URL + '/profile')
);

// Logout
// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect(process.env.FRONTEND_URL);
// });
router.get('/logout', (req, res) => {
    req.logout(err => {
      if (err) {
        console.error('Error during logout:', err);
        return res.status(500).send('Error during logout');
      }
      req.session.destroy(); // Destroy the session
      res.clearCookie('connect.sid'); // Clear session cookie
      res.redirect(process.env.FRONTEND_URL + '/login'); // Redirect to login page
    });
  });
  router.get('/auth/check', (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).send('Authenticated');
    } else {
      res.status(401).send('Not authenticated');
    }
  });
  
  
module.exports = router;

