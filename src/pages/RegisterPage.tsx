import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   console.log(storedUser);
  //   if (storedUser) {
  //     navigate("/login");
  //   }
  //   // eslint-disable-next-line
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!name || !email || !password || password.length < 8) return;
    if (email && !/\S+@\S+\.\S+/.test(email)) return;
    setSubmitted(false);
    setIsLoading(true);

    try {
      await register(name, email, password, role);
      navigate("/login");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setEmail("");
      setName("");
      setPassword("");
      console.log(err.message || "Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto min-h-[calc(100vh-4rem)]">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>

              <form className="space-y-4 md:space-y-6" action="#">
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Please select your role
                  </label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="client"
                        checked={role === "client"}
                        onChange={(e) => setRole(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700 text-sm">Client</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="professional"
                        checked={role === "professional"}
                        onChange={(e) => setRole(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700 text-sm">
                        Professional
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                  />
                  {submitted && !name && (
                    <div className="mt-2 text-red-500">
                      {"Name is required"}
                    </div>
                  )}
                </div>
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
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
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {submitted && !password && (
                    <div className="mt-2 text-red-500">
                      {"Password is required"}
                    </div>
                  )}
                  {password && password.length < 8 && (
                    <div className="mt-2 text-red-500">
                      {"Password must be at least 8 characters long"}
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
                  {isLoading ? "Loading..." : "Create an account"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
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
