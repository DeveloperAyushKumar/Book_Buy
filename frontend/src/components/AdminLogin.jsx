import React from 'react'
import {useForm } from 'react-hook-form'
import axios from 'axios'
import getBaseURL from '../utils/getBaseURL'
import { useNavigate } from 'react-router'
import { useState } from 'react'

function AdminLogin() {
    const [message,setMessage]=useState('')
    const {register,handleSubmit,formState:{errors}}=useForm()
    const navigate =useNavigate()
    const onSubmit =async (data)=>{
        // console.log(data)
        try {
            const response =await axios.post(`${getBaseURL()}/api/auth/admin`,data, {
                headers :{
                    'Content-Type':'application/json'
                }
            })
            // console.log(response)
           const authToken = response.data
           if(authToken.token){
                localStorage.setItem('token',authToken.token)
                setTimeout(()=>{
                    localStorage.removeItem('token')
                    alert('Session expired')
                    navigate('/admin')
                }, 3600*1000)
                navigate('/dashboard')

           }
        } catch (error) {
            setMessage(error.response.data.message)
        }
    }
  return (
    <div className='h-screen flex justify-center items-center '>
    <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-semibold mb-4'>Admin Dashboard Login </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                <input 
                {...register("username", { required: true })} 
                type="text" name="username" id="username" placeholder='username'
                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                />
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                <input 
                {...register("password", { required: true })} 
                type="password" name="password" id="password" placeholder='Password'
                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                />
            </div>
            {
                message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
            }
            <div className='w-full'>
                <button className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login </button>
            </div>
        </form>

        <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
        </div>
    </div>
  )
}

export default AdminLogin