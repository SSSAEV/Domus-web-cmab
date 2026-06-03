import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import AppNavbar from './components/Navbar/AppNavbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import PropertyDetail from './pages/PropertyDetail';
import Mortgage from './pages/Mortgage';
import Contacts from './pages/Contacts';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <AppNavbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<PropertyDetail />} />
            <Route path="/mortgage" element={<Mortgage />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </FavoritesProvider>
    </BrowserRouter>
  );
}
