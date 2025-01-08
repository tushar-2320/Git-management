import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "../components/button"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const backendUrl = 'http://localhost:5000/user/profile';
        const response = await axios.get(`${backendUrl}/user/profile`, { withCredentials: true });
        console.log('Fetched profile:', response.data);
        setUser(response.data);
        localStorage.setItem('isAuthenticated', 'true');
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch user profile');
        localStorage.removeItem('isAuthenticated');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const backendUrl =  'http://localhost:5000';
      await axios.get(`${backendUrl}/auth/logout`, { withCredentials: true });
      localStorage.removeItem('isAuthenticated');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Failed to logout. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">No user data available</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <Button onClick={handleLogout} className="mt-8">
        Logout
      </Button>
    </div>
  );
};

export default Profile;

