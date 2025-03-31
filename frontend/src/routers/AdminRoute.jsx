import React from 'react'
import {Navigate,Outlet} from 'react-router'
function AdminRoute({children}) {
    const token =localStorage.getItem('token');
if(!token){
    alert("You need to login as Admin")
    return <Navigate to="/admin" />
}
  return children? children:<Outlet/>
}

export default AdminRoute