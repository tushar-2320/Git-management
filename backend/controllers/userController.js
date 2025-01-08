// exports.getProfile = (req, res) => {
//     res.json({
//       name: req.user.name,
//       userId: req.user.id,
//       email: req.user.email
//     });
//   };
  
exports.getProfile = (req, res) => {
    if (!req.user) {
      console.error('User is not authenticated or req.user is missing');
      return res.status(401).json({ message: 'Not authenticated' });
    }
    console.log('Authenticated user:', req.user);
    res.json({
      name: req.user.name,
      userId: req.user.id,
      email: req.user.email,
    });
  };
  