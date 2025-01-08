// exports.isAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.status(401).json({ message: 'Unauthorized' });
//   };
  
exports.isAuthenticated = (req, res, next) => {
    console.log('Session data:', req.session);
    console.log('Authenticated user:', req.user);
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Not authenticated' });
  };
  