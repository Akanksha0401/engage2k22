import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='login-container'>
            <div className='login'>
                <div className='login-left'>
                    <div className='login-image'></div>
                </div>
                <div className='login-right'>
                    <div className='login-form'>
                        <div className='form-title'>
                            Login
                        </div>
                        <div className='login-form-content'>
                            <div className='form-group'>
                                <label>Email Id</label>
                                <input type='text' placeholder='you@example.com' />
                            </div>
                            <div className='form-group'>
                                <label>Password</label>
                                <input type='text' placeholder='Password' />
                            </div>
                            <div className='login-chkbox'>
                                <input type='checkbox' />
                                <label>Remember Me</label>
                            </div>
                            <Link to='/dashboard'>
                                <div className='btn-login'>
                                    <input type='submit' value='Login' />
                                </div>
                            </Link>
                            <div className='form-text'>
                                Don't have an account? <Link to='Register'>Register</Link>
                            </div>
                        </div>
                        <div className='login-google'>
                            <div className='google-text'>
                                Login with
                            </div>
                            <svg width="26" height="26" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m22.18 10.382-.107-.45h-9.77v4.136h5.838c-.606 2.878-3.419 4.393-5.716 4.393-1.672 0-3.434-.703-4.6-1.833a6.566 6.566 0 0 1-1.96-4.636c0-1.741.783-3.484 1.922-4.63 1.14-1.146 2.86-1.787 4.57-1.787 1.96 0 3.363 1.04 3.888 1.514l2.939-2.923c-.862-.757-3.23-2.666-6.922-2.666-2.847 0-5.578 1.09-7.574 3.08C2.718 6.54 1.7 9.372 1.7 12s.965 5.32 2.874 7.294C6.613 21.399 9.5 22.5 12.475 22.5c2.706 0 5.27-1.06 7.1-2.984 1.796-1.894 2.726-4.514 2.726-7.261 0-1.156-.116-1.843-.122-1.873Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login