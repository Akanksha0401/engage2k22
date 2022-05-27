import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar-container'>
            <div className='navbar'>
                <div className='nav-logo'>
                    <Link to='/'>
                        Attendance Tracker
                    </Link>
                </div>
                <div className='nav-items'>
                    <div className='nav-item'>
                        <Link to='/discover'>
                            Discover
                        </Link>
                    </div>
                    <div className='btn-register'>
                        <Link to='/register'>
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar