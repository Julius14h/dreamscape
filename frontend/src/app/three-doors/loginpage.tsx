"use client";
import React, { useState } from 'react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', { username, password });
    } else {
      console.log('Sign up:', { username, firstName, lastName, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white/2 backdrop-blur-lg rounded-lg border-2 border-gray-400">
        <h1 className="text-2xl font-semibold text-center">
          {isLogin ? 'Login' : 'Sign up'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded bg-transparent border"
          />
          
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-transparent border"
              />
              
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-transparent border"
              />
            </>
          )}
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-transparent border"
          />
          
          <button
            type="submit"
            className="w-full py-2 rounded-lg border bg-gray-700 hover:bg-gray-800 transition-colors duration-200"
          >
            {isLogin ? 'Login' : 'Sign up'}
          </button>
        </form>
        
        <div className="text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-sm underline hover:text-gray-400 text-gray-300"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;