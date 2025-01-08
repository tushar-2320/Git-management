import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { Button } from '../components/ui/button';
import { Switch } from '../components/switch';

const Repositories = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/repo`, { withCredentials: true });
        setRepositories(response.data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchRepositories();
  }, []);

  const handleToggleAutoReview = async (repoId) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/repo/${repoId}/toggle-auto-review`, {}, { withCredentials: true });
      setRepositories(repositories.map(repo => 
        repo.id === repoId ? { ...repo, autoReview: !repo.autoReview } : repo
      ));
    } catch (error) {
      console.error('Error toggling auto review:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Repositories</h1>
      <div className="space-y-4">
        {repositories.map(repo => (
          <div key={repo.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{repo.name}</h2>
              <p className="text-gray-600">{repo.fullName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>Auto Review</span>
              <Switch
                checked={repo.autoReview}
                onCheckedChange={() => handleToggleAutoReview(repo.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Repositories;

