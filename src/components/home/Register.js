import Footer from '../home/Footer'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { push, ref } from 'firebase/database'
import { auth, db } from '../../assets/config/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [designation, setDesignation] = useState('')
    const [department, setDepartment] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const nav = useNavigate()

    const register = async () => {
        if (firstName && lastName && designation && department && email && password && confirmPassword) {
            if (password === confirmPassword) {
                const facultyRef = ref(db, 'Faculty')
                const faculty = {
                    firstName,
                    lastName,
                    designation,
                    department,
                    email,
                    password
                }
                await push(facultyRef, faculty)

                try {
                    const user = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    )
                    nav('/dashboard')
                } catch (error) {
                    console.log(error.message)
                }

                setFirstName('')
                setLastName('')
                setDesignation('')
                setDepartment('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
            } else {
                alert('Passwords do not match')
            }
        } else {
            alert('Input all fields')
        }
    }

    useEffect(() => {

    }, [])


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
                            <input
                                type='text'
                                placeholder='First Name'
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                            />
                        </div>
                        <div className='reg-form-group'>
                            <label>Last Name</label>
                            <input type='text'
                                placeholder='Last Name'
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                            />
                        </div>
                        <div className='reg-form-group'>
                            <label>Designantion</label>
                            <input type='text'
                                placeholder='Designation'
                                onChange={(e) => {
                                    setDesignation(e.target.value)
                                }}
                            />
                        </div>
                        <div className='reg-form-group'>
                            <label>Department</label>
                            <input type='text'
                                placeholder='Department'
                                onChange={(e) => {
                                    setDepartment(e.target.value)
                                }} />
                        </div>
                        <div className='reg-form-group'>
                            <label>Email Id</label>
                            <input type='email'
                                placeholder='email@exapmle.com'
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                        </div>
                        <div className='reg-form-group'>
                            <label>Password</label>
                            <input type='password'
                                placeholder='Password'
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                        </div>
                        <div className='reg-form-group'>
                            <label>Confirm Password</label>
                            <input type='password'
                                placeholder='Confirm Password'
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }} />
                        </div>
                        {/* <div className='reg-form-group'>
                            <input type='checkbox' />
                            <label>Agree to terms and conditions.</label>
                        </div> */}
                        <div className='btn-reg'>
                            <input
                                type='submit'
                                value='Register'
                                onClick={() => {
                                    register()
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register