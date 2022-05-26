import Footer from '../home/Footer'
import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className='register-container'>
            <div className='navbar-container'>
                <div className='navbar'>
                    <Link to='/'>
                        <svg width="26" height="26" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.438 18.75 4.688 12l6.75-6.75"></path>
                            <path d="M5.625 12h13.688"></path>
                        </svg>
                    </Link>
                </div>
            </div>
            <div className='reg-container'>
                <div className='reg-form'>
                    <div className='reg-form-title'>
                        Register
                    </div>
                    <div className='reg-form-content'>
                        <div className='reg-form-group'>
                            <label>First Name</label>
                            <input type='text' />
                        </div>
                        <div className='reg-form-group'>
                            <label>Last Name</label>
                            <input type='text' />
                        </div>
                        <div className='reg-form-group'>
                            <label>Designantion</label>
                            <input type='text' />
                        </div>
                        <div className='reg-form-group'>
                            <label>Department</label>
                            <input type='text' />
                        </div>
                        <div className='reg-form-group'>
                            <label>Email Id</label>
                            <input type='text' />
                        </div>
                        <div className='reg-form-group'>
                            <label>Password</label>
                            <input type='text' />
                        </div>
                        <div className='reg-form-group'>
                            <label>Confirm Password</label>
                            <input type='text' />
                        </div>
                        <div className='reg-form-group'>
                            <input type='checkbox' />
                            <label>Agree to terms and conditions.</label>
                        </div>
                        <div className='reg-form-group'>
                            <input type='submit' value='Register' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register