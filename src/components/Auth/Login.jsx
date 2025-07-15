import React from 'react'
import { useState } from 'react'

const Login = ({handleLogin}) => {
    console.log({handleLogin})
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const submitHandler = (e)=>{
            e.preventDefault()
            handleLogin(email,password)
            console.log(`${email} and ${password}`)
            setemail("")
            setpassword("")
        }
        return (
        
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center p-4">
                <h1 className='text-white text-3xl font-semibold mb-5'>Demo only — no real data is stored.</h1>
                <div className="loginCard min-h-[400px] w-full max-w-md bg-zinc-800 rounded-xl hover:bg-zinc-900 shadow-lg">

                    <form 
                    onSubmit={(e)=>{
                        submitHandler(e)
                    }}
                    className='flex flex-col justify-between h-full' action="">
                        <h1 className='text-emerald-600 p-5 text-2xl md:text-3xl lg:text-4xl font-semibold'>Login</h1>
                        <div className='flex flex-col gap-3 w-full px-5 pb-6'>
                            <label htmlFor="email">Email</label>
                            <input
                            id="email"
                            value={email}
                            onChange={(e)=>{
                                setemail(e.target.value)
                            }}
                            required
                            className='h-10 rounded w-full px-5 outline-none bg-zinc-300 text-black' name='email' placeholder='Enter Your Email' type="email"/>

                            <label htmlFor="password">Password</label>
                            <input 
                            id="password"
                            value={password}
                            name='password'
                            onChange={(e)=>{
                                setpassword(e.target.value)
                            }} 
                            required className='h-10 rounded w-full px-5 outline-none bg-zinc-300 text-black' placeholder='Enter Password' type="password"/>
                            <div className="btns w-full flex flex-wrap justify-between items-center px-1 gap-2">
                                <button className='text-zinc-400 text-sm hover:text-zinc-200'>Show Password</button>
                                <button className='text-zinc-400 text-sm hover:text-zinc-200'>Forgot Password?</button>
                            </div>
                            <input className='w-full md:w-auto px-6 py-2 mt-4 bg-emerald-600 text-white rounded cursor-pointer hover:bg-emerald-700 transition-colors' type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
