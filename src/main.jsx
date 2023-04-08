import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Shop from './Components/Shop/Shop'
import Home from './Components/Layout/Home'
import Orders from './Components/Orders/Orders'
import Inventory from './Components/inventory/Inventory'
import Login from './Components/Login/Login'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        path: '/',
        element: <Shop/>,
      },
      {
        path: '/orders',
        element: <Orders/>
        
      },
      {
        path: '/inventory',
        element: <Inventory/>
      },
      {
        path: '/login',
        element: <Login/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
