// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { http } from "../config/Axios";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signup = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await http.post("/users/signup", data);
      const { accessToken, user, message } = response.data;

      toast.success(message || "Signup successful!");

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userData", JSON.stringify(user));

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Signup error:", error);
      const message =
        error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(signup)} noValidate>
          {/* Name */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-2 text-white rounded transition ${
              isSubmitting
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
