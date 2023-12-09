import{useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInputError from '../UI/form/FormInputError';
import TextInput from '../UI/form/TextInput';


const Register = () => {
  
  const nav = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const [serverError, setServerError] = useState(null);

  const handleRegister = async (formData) => {
    setServerError(null);
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Registration successful, redirect to login page
        nav('/login');
      } else {
        const error = await response.json();
        setServerError(error.message);
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <button
        className="self-end mt-6 mr-6 bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold"
        onClick={() => nav('/login')}
      >
        Register
      </button>
      <div className="flex-grow flex items-center justify-center">
        <div className="Register bg-blue-400 p-10 rounded-lg max-w-sm mx-auto">
          <h2 className="text-xl font-semibold mb-6">Register</h2>
          <form onSubmit={handleSubmit(handleRegister)}>
          <TextInput
        label="Name"
        type="text"
        name="name"
        register={register}
        validation={{ required: true }}
      />
      <label className="block mb-3"></label>
      {formState.errors.name && (
        <FormInputError>Name must not be empty.</FormInputError>
      )}
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
            <button className="w-full bg-blue-600 text-white p-2 rounded-lg" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;