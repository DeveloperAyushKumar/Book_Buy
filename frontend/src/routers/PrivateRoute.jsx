import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router'
function PrivateRoute({children}) {
    const {currentUser,loading }=useAuth()
    if(loading)return <div>Loading...</div>

    if(!currentUser){
        return <Navigate to="/login" replace />
    }

  return children
}

export default PrivateRoute