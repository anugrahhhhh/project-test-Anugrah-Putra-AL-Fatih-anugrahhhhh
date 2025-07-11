import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import PostList from './components/PostList';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <PostList />
            </>
          }
        />
        {/* Placeholder untuk halaman lain */}
        <Route path="/about" element={<div className="mt-5 pt-5 text-center">About Page</div>} />
        <Route path="/services" element={<div className="mt-5 pt-5 text-center">Services Page</div>} />
        <Route path="/ideas" element={
          <>
            <Banner />
            <PostList />
          </>
        } />
        <Route path="/careers" element={<div className="mt-5 pt-5 text-center">Careers Page</div>} />
        <Route path="/contact" element={<div className="mt-5 pt-5 text-center">Contact Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
