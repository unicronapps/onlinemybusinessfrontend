// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import About from "./components/About";
// import Contact from "./components/Contact";
import BusinessCard from "./BusinessCard";

function Navigation() {
  return (
    <Router>
      <div>
        <h1>My React Navigation</h1>
        <Routes>
          <Route path="/" element={<BCard />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

function BCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <BusinessCard />
    </div>
  );
}

export default Navigation;
