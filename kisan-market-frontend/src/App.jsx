import { Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";

import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import MyProducts from "./pages/farmer/MyProducts";
import EditProduct from "./pages/farmer/EditProduct";
import FarmerOrders from "./pages/farmer/FarmerOrders";

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerOrders from "./pages/customer/CustomerOrders";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";

import Cart from "./pages/Cart";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />

      <Route
        path="/farmer-dashboard"
        element={
          <ProtectedRoute roles={["FARMER"]}>
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <ProtectedRoute roles={["FARMER"]}>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-products"
        element={
          <ProtectedRoute roles={["FARMER"]}>
            <MyProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-product/:id"
        element={
          <ProtectedRoute roles={["FARMER"]}>
            <EditProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer-orders"
        element={
          <ProtectedRoute roles={["FARMER"]}>
            <FarmerOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer-dashboard"
        element={
          <ProtectedRoute roles={["CUSTOMER"]}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-orders"
        element={
          <ProtectedRoute roles={["CUSTOMER"]}>
            <CustomerOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-users"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-products"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <ManageProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-orders"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <ManageOrders />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
