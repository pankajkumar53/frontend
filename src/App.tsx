import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServiceProviders from './pages/ServiceProviders';
import ServiceProviderDetail from './pages/ServiceProviderDetail';
import AddServiceProvider from './pages/AddServiceProvider';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">      
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/service-providers" element={<ServiceProviders />} />
          <Route path="/service-providers/:id" element={<ServiceProviderDetail />} />
          <Route path="/add-service-provider" element={<AddServiceProvider />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 