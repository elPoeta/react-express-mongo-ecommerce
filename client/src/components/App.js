import React from 'react';
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';
import FloatButton from '../components/layout/header/nav/FloatButton';
import './App.css';

const App = props => (
  <div className="container">
    <div>
      <Header />
      {props.children}
    </div>
    <FloatButton />
    <Footer />
  </div>

)
export default App;
