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
        <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <ViewBusinessCard />
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
      </Routes>
    </Router>
  );
}

export default App;
