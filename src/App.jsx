import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import MainBody from './Components/MainBody'
import RootPage from './Components/RootPage'
import PrivateRoute from './Components/PrivateRoute'
import Profile from './Components/MainBody/Profile'

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <MainBody></MainBody>
        </PrivateRoute>
      ),
    },
    {
      path: "profile",
      element: (
        <PrivateRoute>
          <Profile></Profile>
        </PrivateRoute>
      ),
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/signup",
      element: <Register></Register>,
    },
  ]);

  return <RouterProvider router={route}>

  </RouterProvider>;
}

export default App
