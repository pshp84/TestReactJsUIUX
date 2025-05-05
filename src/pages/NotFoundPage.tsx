import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h1 className="text-9xl font-bold text-blue-400">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Page not found
        </h2>
        <p className="mt-4 text-base text-gray-400 max-w-md">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8 flex space-x-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
          <Button onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      </div>
    </Layout>
  );
};