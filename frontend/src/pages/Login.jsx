import React from 'react';
import { Button } from '../components/button';

const Login = () => {
  const handleLogin = (provider) => {
    window.location.href = `http://localhost:5000/auth/${provider}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Git Management Platform</h1>
      <div className="space-y-4">
        <Button onClick={() => handleLogin('github')} className="w-full">
          Login with GitHub
        </Button>
        <Button onClick={() => handleLogin('gitlab')} className="w-full">
          Login with GitLab
        </Button>
        <Button onClick={() => handleLogin('bitbucket')} className="w-full">
          Login with Bitbucket
        </Button>
      </div>
    </div>
  );
};

export default Login;

