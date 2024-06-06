import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Dashboard from './pages/Dashboard.jsx'

import ProtectedRoute from './utilities/ProtectedRoute.jsx'

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "/",
            element: <HomePage />
          },
        ],
      },
    ]
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={routerConfig} />  
  </React.StrictMode>,
)
