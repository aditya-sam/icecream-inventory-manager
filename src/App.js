import React from 'react';
import './App.css';
import './styles/ice-cream.scss';
import Header from './structure/Header';
import Footer from './structure/Footer';
import Menu from './ice-cream/Menu';
import EditIceCream from './ice-cream/editIceCream';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
