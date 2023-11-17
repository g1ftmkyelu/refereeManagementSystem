// useAuth.js

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://refs-29ss.onrender.com/users'; // Your JSON server endpoint

export function useLogin() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation(async (credentials) => {
    // Replace this logic with your authentication logic
    const { email, password } = credentials;

    // Simulate authentication with your JSON server
    const response = await axios.get(API_URL, {
      params: { email, password },
    });

    // If authentication is successful, you can save user data in the app
    const user = response.data[0]; // Assuming you get a single user

    if (user) {
      // Store user data in localStorage or other state management
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }

    // If authentication fails, throw an error
    throw new Error('Authentication failed');
  });

  const handleLogin = async (credentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      // After successful login, invalidate relevant queries
      queryClient.invalidateQueries('user'); // Invalidate user data query
    } catch (error) {
      throw error;
    }
  };

  return {
    login: handleLogin,
    isLoading: loginMutation.isLoading,
    error: loginMutation.isError ? loginMutation.error.message : null,
  };
}

export function useLogout() {
  const queryClient = useQueryClient();

  const logout = () => {
    // Implement your logout logic here
    // For example, clearing user data from localStorage

    // After logout, invalidate relevant queries
    queryClient.invalidateQueries('user'); // Invalidate user data query
  };

  return { logout };
}


