import React from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { SignIn, SignUp, Main, Products, Categories, Brands, BrandCategory, Ads, Stock, Settings, SubCategory, SingleProduct } from "@pages";
import App from "../App";

const ProtectedRoute = ({ children }) => {
  const access_token = sessionStorage.getItem("access_token");
  if (!access_token) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <SingleProduct />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/categories/"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/:id"
            element={
              <ProtectedRoute>
                <SubCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/brands"
            element={
              <ProtectedRoute>
                <Brands />
              </ProtectedRoute>
            }
          />
          <Route
            path="/brand-category"
            element={
              <ProtectedRoute>
                <BrandCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ads"
            element={
              <ProtectedRoute>
                <Ads />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stock"
            element={
              <ProtectedRoute>
                <Stock />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default Index;
