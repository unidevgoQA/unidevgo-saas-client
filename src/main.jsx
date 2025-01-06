import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./app/store.js";
import "./index.css";
import Dashboard from "./layout/dashboard/Dashboard.jsx";
import AdminRegister from "./pages/admin register/AdminRegister.jsx";
import CompanyRegister from "./pages/company register/CompanyRegister.jsx";
import AllCompanies from "./pages/dashboard/admin/all companies/AllCompanies.jsx";
import AllEmployees from "./pages/dashboard/company/all employees/AllEmployees.jsx";
import CompanyProfile from "./pages/dashboard/company/company profile/CompanyProfile.jsx";
import EmployeeRegister from "./pages/dashboard/company/employee register/EmployeeRegister.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/company-register",
    element: <CompanyRegister />,
  },
  {
    path: "/employee-register",
    element: <EmployeeRegister />,
  },

  {
    path: "/admin-register",
    element: <AdminRegister />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <CompanyProfile />,
      },
      {
        path: "employees/add",
        element: <EmployeeRegister />,
      },
      {
        path: "employees/all",
        element: <AllEmployees />,
      },
     
      {
        path: "companies/all",
        element: <AllCompanies />,
      },
     
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
