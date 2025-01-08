const axios = require('axios');

const getRepositoriesFromProvider = async (user) => {
  let repos;
  switch (user.gitProvider) {
    case 'github':
      repos = await getGithubRepos(user.accessToken);
      break;
    case 'gitlab':
      repos = await getGitlabRepos(user.accessToken);
      break;
    case 'bitbucket':
      repos = await getBitbucketRepos(user.accessToken);
      break;
    default:
      throw new Error('Invalid git provider');
  }
  return repos;
};

const getGithubRepos = async (accessToken) => {
  const response = await axios.get('https://api.github.com/user/repos', {
    headers: { Authorization: `token ${accessToken}` }
  });
  return response.data.map(repo => ({
    id: repo.id.toString(),
    name: repo.name,
    fullName: repo.full_name,
    private: repo.private
  }));
};

const getGitlabRepos = async (accessToken) => {
  const response = await axios.get('https://gitlab.com/api/v4/projects', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response.data.map(repo => ({
    id: repo.id.toString(),
    name: repo.name,
    fullName: repo.path_with_namespace,
    private: repo.visibility === 'private'
  }));
};

const getBitbucketRepos = async (accessToken) => {
  const response = await axios.get('https://api.bitbucket.org/2.0/repositories?role=owner', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response.data.values.map(repo => ({
    id: repo.uuid,
    name: repo.name,
    fullName: repo.full_name,
    private: repo.is_private
  }));
};

module.exports = { getRepositoriesFromProvider };


