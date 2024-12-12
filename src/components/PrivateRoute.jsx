import React from 'react'
import { Base } from './Base'
import { Navigate, Outlet } from 'react-router'
import { isLoggedIn } from '../../auth'

export const PrivateRoute = () => {
   return isLoggedIn()?<Outlet/>:<Navigate to="/login"/>
   
  
}
