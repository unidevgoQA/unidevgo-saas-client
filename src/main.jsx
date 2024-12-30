import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './app/store.js'
import './index.css'
import AdminRegister from './pages/admin register/AdminRegister.jsx'
import CompanyRegister from './pages/company register/CompanyRegister.jsx'
import EmployeeRegister from './pages/employee register/EmployeeRegister.jsx'
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'


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
  
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
