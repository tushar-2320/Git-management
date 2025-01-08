const User = require('../models/User');
const { getRepositoriesFromProvider } = require('../services/gitProviderService');

exports.getRepositories = async (req, res) => {
  try {
    const repos = await getRepositoriesFromProvider(req.user);
    res.json(repos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repositories' });
  }
};

exports.toggleAutoReview = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const repoId = req.params.id;
    
    const repoIndex = user.repositories.findIndex(repo => repo.id === repoId);
    
    if (repoIndex === -1) {
      user.repositories.push({ id: repoId, autoReview: true });
    } else {
      user.repositories[repoIndex].autoReview = !user.repositories[repoIndex].autoReview;
    }
    
    await user.save();
    res.json({ message: 'Auto review setting updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating auto review setting' });
  }
};

