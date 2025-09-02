// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import your pages
import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import CustomerFormPage from "./pages/CustomerFormPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to /customers */}
        <Route path="/" element={<Navigate to="/customers" />} />

        {/* Customer list page */}
        <Route path="/customers" element={<CustomerListPage />} />

        {/* Customer details page */}
        <Route path="/customers/:id" element={<CustomerDetailsPage />} />
        <Route path="/customers/edit/:id" element={<CustomerFormPage />} />

        {/* Fallback route for 404 */}
        <Route path="*" element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
