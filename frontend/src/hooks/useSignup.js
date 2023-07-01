import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = (email, password, firstName, lastName) => {
    setIsLoading(true);
    setError(null);

    axios
      .post('/api/user/signup', {
        email,
        password,
        firstName,
        lastName,
      })
      .then(response => {
        const json = response.data;

        if (response.status !== 200) {
          setIsLoading(false);
          setError(json.error);
        } else {
          // save the user to local storage
          localStorage.setItem('user', JSON.stringify(json));

          // update the auth context
          dispatch({ type: 'LOGIN', payload: json });

          // update loading state
          setIsLoading(false);
        }
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError(error.message);
        }
      });
  };

  return { signup, isLoading, error };
};
