import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();

  const { login } = useAuth();
  const navigate = useNavigate();

useEffect(() => {
  if (user) {
    if (user.role === 'admin') navigate('/dashboard');
    else if (user.role === 'client') navigate('/dashboard/client');
    else if (user.role === 'professional') navigate('/dashboard/professional');
  }
}, [user, navigate]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!email || !password) return;
    if (email && !/\S+@\S+\.\S+/.test(email)) return;
    setSubmitted(false);
    setIsLoading(true);

    try {
      await login(email, password);
      setIsLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(("Invalid email or password. Please try again."), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEmail("");
      setPassword("");
    } finally {
      setIsLoading(false);
      setSubmitted(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto min-h-[calc(100vh-4rem)]">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    autoComplete="email"
                  />
                  {submitted && !email && (
                    <div className="mt-2 text-red-500">
                      {"Email is required"}
                    </div>
                  )}
                  {email && !/\S+@\S+\.\S+/.test(email) && (
                    <div className="mt-2 text-red-500">
                      {"Please enter a valid email address"}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {submitted && !password && (
                    <div className="mt-2 text-red-500">
                      {"Password is required"}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="cursor-pointer w-full text-white 
             bg-[#7A9CA5] 
             hover:bg-[#5f7e87] 
             focus:ring-4 focus:outline-none 
             focus:ring-[#aac3c9] 
             font-medium rounded-lg 
             text-sm px-5 py-2.5 text-center 
             dark:bg-[#6b8c94] 
             dark:hover:bg-[#4d6a72] 
             dark:focus:ring-[#3d5055]"
                >
                  {isLoading ? "Loading..." : " Sign in"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to={"/register"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
