import React from 'react'
import Footer from './Footer'
import Login from './Login'
import Navbar from './Navbar'
import '../../styles/home.css'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Login />
            <Footer />
        </div>
    )
}

export default Home