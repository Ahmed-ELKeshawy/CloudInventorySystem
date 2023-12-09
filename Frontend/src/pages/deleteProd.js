import{useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInputError from '../UI/form/FormInputError';
import TextInput from '../UI/form/TextInput';
import { useUser } from '../context/userContext';



const RemoveProd = () => {

  const {user} = useUser();
  const nav = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const [serverError, setServerError] = useState(null);


  const handleRemoveprod = async (formData) => {
    setServerError(null);
        try {
            const response = await fetch('http://localhost:5000/api/products/removeprod', {
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            body: JSON.stringify(formData),
          });
      if (response.status === 200) {
        const data = await response.json();
        console.log('Delete product successful', data);
        nav('/dashboard');
      } else {
        const error = await response.json();
        console.error('Deleting failed', error);
        setServerError(error.message)
        
      }
   } catch (error) {
      console.error('Dleteing failed', error);
      setServerError('An error occurred during deleting. Please try again.');
   }
};

  return (
    <div className="min-h-screen flex flex-col">
    <button
      className="self-end mt-6 mr-6 bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold"
      onClick={() => nav('/dashboard')}
    >
      Dashboard
    </button>
    <div className="flex-grow flex items-center justify-center">
    <div className="Delete Product">
    <div className="bg-blue-400 p-10 rounded-lg max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-6">Delete Product</h2>
      <form onSubmit={handleSubmit(handleRemoveprod)}>
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
       
<label className="block mb-3"></label>
       {serverError && (
        <FormInputError>{serverError}</FormInputError>
      )}  
      <label className="block mb-3"></label>
        <button className="w-full bg-blue-600 text-white p-2 rounded-lg" type="submit">Remove Product</button>
      </form>
    </div>
  </div>
  </div>
  </div>
  );
};

export default RemoveProd;
