import{useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInputError from '../UI/form/FormInputError';
import TextInput from '../UI/form/TextInput';
import { useUser } from '../context/userContext';


const Login = () => {

  const { loginUser } = useUser();
  const nav = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const [serverError, setServerError] = useState(null);


  const handleLogin = async (formData) => {
    setServerError(null);
    try {
      console.log("before fetch");
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log('Login successful', data);
        loginUser(data);
        nav('/dashboard');
      } else {
        const error = await response.json();
        console.error('Login failed', error);
        setServerError(error.message)
        
      }
   } catch (error) {
      console.error('Login failed', error);
      setServerError('An error occurred during login. Please try again.');
   }
  };

  return (
    <div className="min-h-screen flex flex-col">
    <button
      className="self-end mt-6 mr-6 bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold"
      onClick={() => nav('/signup')}
    >
      Sign Up
    </button>
    <div className="flex-grow flex items-center justify-center">
    <div className="Login">
    <div className="bg-blue-400 p-10 rounded-lg max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-6">Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
      <TextInput
        label="Email"
        type="text"
        name="email"
        register={register}
        validation={{ required: true }}
      />
      <label className="block mb-3"></label>
      {formState.errors.email && (
        <FormInputError>Email must not be empty.</FormInputError>
      )}
       <TextInput
        label="Password"
        type="password"
        name="password"
        register={register}
        validation={{ required: true }}
      />
      <label className="block mb-3"></label>
      {formState.errors.password && (
        <FormInputError>Password must not be empty.</FormInputError>
      )}

<label className="block mb-3"></label>
       {serverError && (
        <FormInputError>{serverError}</FormInputError>
      )}  
      <label className="block mb-3"></label>
        <button className="w-full bg-blue-600 text-white p-2 rounded-lg" type="submit">Login</button>
      </form>
    </div>
  </div>
  </div>
  </div>
  );
};

export default Login;
