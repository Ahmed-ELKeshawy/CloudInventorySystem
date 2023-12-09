import React from 'react';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import ProductSummarys from './components/products/productSummary';
import AddProd from './pages/addProd';
import UpdateProd from './pages/updateProd';
import DeleteProd from './pages/deleteProd';

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}  />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/addProd" element={<AddProd />} />
        <Route path="/updateProd" element={<UpdateProd />} />
        <Route path="/deleteProd" element={<DeleteProd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
