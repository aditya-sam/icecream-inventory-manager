import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/ice-cream.scss';
import Header from './structure/Header';
import Footer from './structure/Footer';
import Menu from './ice-cream/Menu';
import EditIceCream from './ice-cream/editIceCream';
import IceCreams from './ice-cream/iceCreams';
import AddIceCream from './ice-cream/addIceCream';

function App() {
    return (
        <Router>
            <a href="#menu" className="skip-link">
                Skip to main content
            </a>
            <Header />
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/edit/:id" element={<EditIceCream />} />
                <Route path="/ice-creams" element={<IceCreams />} />
                <Route path="/menu/add" element={<AddIceCream />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
