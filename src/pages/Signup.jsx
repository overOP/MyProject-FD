import React from 'react';
import { Link, useNavigate } from 'react-router';
import { ToastContainer, toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { http } from '../config/Axios';

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const signup = async (data) => {
    try {
      const response = await http.post('users/signup', data);

      if (response.data.success) {
        toast.success(response.data.message || 'SignUp successful');
        
        const accessToken = response.data.accessToken;
        localStorage.setItem('accessToken', accessToken);

        const userData = response.data.user;
        localStorage.setItem('userData', JSON.stringify(userData));

        navigate('/');
      } else {
        toast.error(response.data.message || 'SignUp failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('SignUp failed');
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit(signup)}>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
