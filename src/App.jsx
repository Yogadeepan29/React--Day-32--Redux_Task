import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Cart from './Components/Cart';
import './App.css';


const App = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Cart />
      <Footer />
    </Provider>
  );
};

export default App;
