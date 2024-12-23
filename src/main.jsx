import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './app/store.js'
import './index.css'
import Home from './pages/home/Home.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
