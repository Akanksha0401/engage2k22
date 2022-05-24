import React from 'react'

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
                        <div className='form-group'>
                            <label>Email Id</label>
                            <input type='text' />
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input type='text' />
                        </div>
                        <div className='form-group'>
                            <input type='checkbox' />
                            <label>Remember Me</label>
                        </div>
                        <div className='form-group'>
                            <input type='submit' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login