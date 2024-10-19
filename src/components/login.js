import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Logo from "./assets/image 650 1.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the token is in the response data
      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem("authToken", token); // Make sure this matches in JobForm

      console.log("Login successful! Token stored in localStorage:", token);

      // Redirect to /create-interview after successful login
      navigate("/create-interview");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  const token = localStorage.getItem("token");
  console.log("Retrieved token:", token);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <h1 className="text-xl font-semibold text-[#576474]">Contact</h1>
      </header>

      <div className="flex-1 flex">
        <div className="w-1/2 flex flex-col justify-center pl-20">
          <div className="relative mb-4">
            <p className="text-gray-600 max-w-md">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry...
            </p>
          </div>
        </div>

        <div className="w-1/2 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg border-[1px] border-blue-400 w-[55%]">
            <div className="flex justify-center items-center">
              <h2 className="text-2xl font-bold mb-6">Login</h2>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <span className="absolute left-2 top-2.5 text-gray-400">
                  {/* Email Icon */}
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <span className="absolute left-2 top-2.5 text-gray-400">
                  {/* Password Icon */}
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
