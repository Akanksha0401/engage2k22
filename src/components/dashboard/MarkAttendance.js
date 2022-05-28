import React from 'react'
import { Link } from 'react-router-dom'

const MarkAttendance = () => {
    return (
        <div className='mark-attendance-container'>
            <div className='mark-attendance'>
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
                <div className='mark-content'>
                    <div className='cam-container'>

                    </div>
                    <div className='btn-mark-container'>
                        <button className='btn-mark'>
                            Start Marking
                        </button>
                        <button className='btn-mark'>
                            Stop Marking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarkAttendance