import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { FormWrapper } from '../components/FormWrapper';
import { FormErrors } from '../types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let storedUser = localStorage.getItem('user');

    if(storedUser){
      navigate('/dashboard');
    }
  },[]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setGeneralError('Invalid email or password. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper 
      title="Welcome back" 
      subtitle="Sign in to your account to continue"
    >
      {generalError && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
          {generalError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />
        
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-6"
        >
          Sign In
        </Button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{' '}
        <Link 
          to="/register" 
          className="font-medium text-blue-400 hover:text-blue-300"
        >
          Sign up
        </Link>
      </p>
    </FormWrapper>
  );
};