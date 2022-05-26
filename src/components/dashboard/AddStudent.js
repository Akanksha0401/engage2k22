import React from 'react'
import { Link } from 'react-router-dom'

const AddStudent = () => {
    return (
        <div className='add-student-container'>
            <div className='add-student'>
                <div className='navbar-container'>
                    <div className='navbar'>
                        <Link to='/dashboard'>
                            <svg width="26" height="26" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.438 18.75 4.688 12l6.75-6.75"></path>
                                <path d="M5.625 12h13.688"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className='add-container'>
                    <div className='add-form'>
                        <div className='add-form-title'>
                            Mention Student Details
                        </div>
                        <div className='add-form-content'>
                            <div className='add-form-group'>
                                <label>First Name</label>
                                <input type='text' />
                            </div>
                            <div className='add-form-group'>
                                <label>Last Name</label>
                                <input type='text' />
                                <div className='add-form-group'>
                                    <label>Email Id</label>
                                    <input type='text' />
                                </div>
                            </div>
                            <div className='add-form-group'>
                                <label>University Roll Number</label>
                                <input type='text' />
                            </div>
                            <div className='add-form-group'>
                                <label>Library Id</label>
                                <input type='text' />
                            </div>
                            <div className='add-form-group'>
                                <input type='submit' value='Add' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStudent