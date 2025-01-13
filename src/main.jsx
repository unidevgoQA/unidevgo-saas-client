import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./app/store.js";
import "./index.css";
import Dashboard from "./layout/dashboard/Dashboard.jsx";
import AdminRegister from "./pages/admin register/AdminRegister.jsx";
import CompanyRegister from "./pages/company register/CompanyRegister.jsx";
import AdminProfile from "./pages/dashboard/admin/admin profile/AdminProfile.jsx";
import AllCompanies from "./pages/dashboard/company/all companies/AllCompanies.jsx";
import CompanyProfile from "./pages/dashboard/company/company profile/CompanyProfile.jsx";
import EditCompany from "./pages/dashboard/company/edit company/EditCompany.jsx";
import AllEmployees from "./pages/dashboard/employee/all employees/AllEmployees.jsx";
import EditEmployee from "./pages/dashboard/employee/edit employee/EditEmployee.jsx";
import EmployeeProfile from "./pages/dashboard/employee/employee profile/EmployeeProfile.jsx";
import EmployeeRegister from "./pages/dashboard/employee/employee register/EmployeeRegister.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import AuthProviders from "./providers/AuthProviders.jsx";

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
    path: "/register",
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
        path: "employees/profile",
        element: <EmployeeProfile />,
      },
      {
        path: "employees/edit",
        element: <EditEmployee />,
      },

      {
        path: "companies/all",
        element: <AllCompanies />,
      },

      {
        path: "companies/profile",
        element: <CompanyProfile />,
      },
      {
        path: "companies/edit",
        element: <EditCompany />,
      },
      {
        path: "admin/profile",
        element: <AdminProfile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProviders>
      <Toaster position="top-center" reverseOrder={false} /> 
        <RouterProvider router={router} />
      </AuthProviders>
    </Provider>
  </StrictMode>
);
