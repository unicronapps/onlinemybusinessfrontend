// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BusinessCardsList from "./screens/BusinessCardsList";
import BusinessCard from "./screens/BusinessCard";
import CreateBusinessCard from "./screens/CreateBusinessCard";
import Login from "./screens/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import EditBusinessCard from "./screens/EditBusinessCard";
import ViewBusinessCard from "./screens/ViewBusinessCard";
import QRBusinessCard from "./screens/QRBusinessCard";
import RedirectSLink from "./screens/RedirectSLink";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BusinessCardsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBusinessCard />
            </ProtectedRoute>
          }
        />
        <Route path="/view/:id" element={<ViewBusinessCard />} />
        <Route
          path="/qr/:id"
          element={
            <ProtectedRoute>
              <QRBusinessCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditBusinessCard />
            </ProtectedRoute>
          }
        />
        <Route path="/s/:sid" element={<RedirectSLink />} />
        <Route path="/short/:sid" element={<RedirectSLink />} />
        {/* Redirect route */}
      </Routes>
    </Router>
  );
}

export default App;
