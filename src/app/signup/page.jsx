import React from 'react'
import Link from 'next/link'

const page = () => {

    
  return (
    <>
    <div className='container'>
        <article className='row'>
    <form>
        <div className='text-center mt-2 mb-5'>
            <h3>Sign Up</h3>
        </div>

        <div className='mb-3 col-3 mx-auto'>
            <label>First name</label>
            <input 
                type="text"
                className='form-control'
                placeholder='First name'
                required
                
                />
        </div>

        <div className='mb-3 col-3 mx-auto'>
            <label>Last name</label>
            <input 
                type="text"
                className='form-control'
                placeholder='Last name'
                required

                />
        </div>

        <div className='mb-3 col-3 mx-auto'>
            <label>Email Address</label>
            <input 
                type="email"
                className='form-control'
                placeholder='Enter email'
                required

                />
        </div>

        <div className='mb-3 col-3 mx-auto'>
            <label>Password</label>
            <input 
                type="password"
                className='form-control'
                placeholder='Enter password'
                required

                />
        </div>

        <div className='d-grid col-3 mx-auto'>
            <button type='submit' className='btn btn-primary'>
                Sign up
            </button>
        </div>
        <p className='forgot-password text-center '>
            Already registered? <Link href={"/login"}>Sign in</Link>
        </p>
    </form>
    </article>
    </div>
    </>
  )
}

export default page