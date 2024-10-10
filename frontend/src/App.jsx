import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar'
import Error from './components/Error'
import Login from './components/Login'
import Signup from './components/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Navbar/>,
			errorElement: <Error/>,
		},
		{
			path: '/login',
			element: <Login/>,
			errorElement: <Error/>,
		},
		{
			path: '/Signup',
			element: <Signup/>,
			errorElement: <Error/>,
		}
	])
  return (
	<div>
		<RouterProvider router={router}/>
		<ToastContainer/>
	</div>
  )
}

export default App
