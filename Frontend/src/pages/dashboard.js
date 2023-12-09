import React from 'react';
import {useState, useEffect} from 'react';
import ProductsList from '../components/products/productsList';
import {useUser} from '../context/userContext';
import{useNavigate} from 'react-router-dom';


const Dashboard = () => {
  const nav = useNavigate();
  const {user,logoutUser} = useUser();
  const [products,setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    const fetchProducts = async() =>{
      try {
        console.log("after before fetching")
        const response = await fetch('http://localhost:5000/api/products/myProducts', {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });

        console.log("after fetching")
        const data = await response.json();
  
        if(!response.ok){
          throw Error(data.error);
        }
        console.log('Products: ', data);
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
fetchProducts();
  },[user.token]);

  
  const handleButtonClick = (type) => {
    // Navigate to the corresponding route based on the button type
    switch (type) {
      case 'Addprod':
        nav('/addProd');
        break;
      case 'Updateprod':
        nav('/updateProd');
        break;
      case 'Deleteprod':
        nav('/deleteProd');
        break;
      case 'Logout':
        logoutUser();
        nav('/login');
        break;
      default:
        // Handle default case
        break;
    }
  };

  if(isLoading){
    return<p>Loading list of existing products...</p>
  }


  return (

    
    <div class="flex h-screen">
    <div class="w-1/6 p-4 bg-blue-200 ml-2 mt-4 rounded-lg">
    <button
          className="w-full h-20 mb-4 bg-blue-800 text-white p-2 rounded-lg"
          onClick={() => handleButtonClick('Addprod')}
        >
          Add Product
        </button>
        <button
          className="w-full h-20 mb-4 bg-blue-800 text-white p-2 rounded-lg"
          onClick={() => handleButtonClick('Updateprod')}
        >
          Update Product
        </button>
        <button
          className="w-full h-20 mb-4 bg-blue-800 text-white p-2 rounded-lg"
          onClick={() => handleButtonClick('Deleteprod')}
        >
          Delete Product
        </button>
    </div>
    <div class="w-5/6 p-4 bg-white">
        <div className="h-1/6 p-4 bg-blue-200 mb-2 flex items-center justify-between rounded-lg">
      <p className="text-8xl font-bold text-blue-900">Dashboard</p>
      <button className="text-white bg-red-500 px-4 py-2 rounded-lg" onClick={() => handleButtonClick('Logout')}>Logout</button>
    </div>
      <div class="h-5/6 p-4 bg-blue-200 rounded-lg">
      <ProductsList products={products} />
      </div>
    </div>
  </div>
  )

}

export default Dashboard;
