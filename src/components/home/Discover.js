import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

const Discover = () => {
    return (
        <div>
            <Navbar />
            <div className='discover-container'>
                <div className='discover'>
                    <div className='discover-header'>
                        <div className='disc-left'>
                            <div className='header-sub-title'>
                                We use <a href='https://github.com/vladmandic/face-api'>face-api</a>
                            </div>
                            <div className='head-title'>
                                Mark Attendance without any <span>Hassle</span>
                            </div>
                            <div className='head-sub-title'>
                                with our <Link to='/'>Attendance Tracker</Link>
                            </div>
                        </div>
                        <div className='desc-right'>
                            <div className='head-desc'>
                                facial recognition to mark attendance through webcam
                            </div>
                            <div className='bottom-desc'>
                                data is stored in <a href=''>Firebase Database.</a>
                            </div>
                        </div>
                    </div>
                    <div className='discover-content'>
                        <div className='discover-card-container'>
                            get in touch with us <a href='mailto:akankshamishra22122001@gmail.com'>hi@attendancetracker.com</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Discover