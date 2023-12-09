import{useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInputError from '../UI/form/FormInputError';
import TextInput from '../UI/form/TextInput';
import {useUser} from '../context/userContext';

const AddProd = () => {
  
  const nav = useNavigate();
  const {user} = useUser();
  const { register, handleSubmit, formState } = useForm();
  const [serverError, setServerError] = useState(null);

  const handleAddprod = async (formData) => {
    setServerError(null);
    console.log(formData);
   
    try {
      const response = await fetch('http://localhost:5000/api/products/createprod', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product added successfully', data);
        nav('/dashboard');
      } else {
        const error = await response.json();
        console.error('Adding product failed', error);
        setServerError(error.message);
      }
    } catch (error) {
      console.error('Error during product addition', error);
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
        <div className="Register bg-blue-400 p-10 rounded-lg max-w-sm mx-auto">
          <h2 className="text-xl font-semibold mb-6">Add Product</h2>
          <form onSubmit={handleSubmit(handleAddprod)}>
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
        label="Category"
        type="text"
        name="category"
        register={register}
        validation={{ required: true }}
      />
      <label className="block mb-3"></label>
      {formState.errors.category && (
        <FormInputError>Category must not be empty.</FormInputError>
      )}
       <TextInput
        label="Quantity"
        type="number"
        name="quantity"
        register={register}
        validation={{ required: true }}
      />
      <label className="block mb-3"></label>
      {formState.errors.quantity && (
        <FormInputError>Quantity must not be empty.</FormInputError>
      )}
      <TextInput
        label="ReOrder Limit"
        type="number"
        name="reorderLimit"
        register={register}
        validation={{ required: true }}
      />
      <label className="block mb-3"></label>
      {formState.errors.reoderLimit && (
        <FormInputError>ReOrder Limit must not be empty.</FormInputError>
      )}
      <TextInput
        label="Price"
        type="number"
        name="price"
        register={register}
        validation={{ required: true }}
      />
      <label className="block mb-3"></label>
      {formState.errors.quantity && (
        <FormInputError>Quantity must not be empty.</FormInputError>
      )}
      <TextInput
        label="Description"
        type="text"
        name="description"
        register={register}
        validation={{ required: true }}
      />
      <label className="block mb-3"></label>
      {formState.errors.description && (
        <FormInputError>Description must not be empty.</FormInputError>
      )}
      <TextInput
        label="Image"
        type="text"
        name="image"
        register={register}
        validation={{ required: true }}
      />
      <label className="block mb-3"></label>
      {formState.errors.image && (
        <FormInputError>Image must not be empty.</FormInputError>
      )}

        <label className="block mb-3"></label>
       {serverError && (
        <FormInputError>{serverError}</FormInputError>
      )}  
      <label className="block mb-3"></label>
            <button className="w-full bg-blue-600 text-white p-2 rounded-lg" type="submit">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProd;