import { useToast } from '@chakra-ui/react'
import { push, ref } from 'firebase/database'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../assets/config/config'

const AddStudent = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [rollNo, setRollNo] = useState('')
    const [libId, setLibId] = useState('')
    const [attendance, setAttendance] = useState(0)

    const nav = useNavigate()

    const toast = useToast()

    const addStudent = async () => {
        if (firstName && lastName && email && rollNo && libId) {
            if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                try {
                    const studentRef = ref(db, 'Students')
                    const student = {
                        firstName,
                        lastName,
                        email,
                        rollNo,
                        libId,
                        attendance: 0
                    }
                    await push(studentRef, student)
                    setFirstName('')
                    setLastName('')
                    setEmail('')
                    setRollNo('')
                    setLibId('')
                    nav('/dashboard')
                    toast({
                        title: 'Student Added!',
                        status: 'success',
                        duration: 5000,
                        position: 'bottom-right'
                    })
                } catch (error) {
                    toast({
                        title: 'Something went wrong!',
                        description: 'Sorry for the inconvinience. Try Again!',
                        status: 'error',
                        duration: 5000,
                        position: 'bottom-right'
                    })
                }
            } else {
                toast({
                    title: 'Invalid email address',
                    status: 'warning',
                    duration: '5000',
                    position: 'bottom-right'
                })
            }
        } else {
            toast({
                title: 'Fields Required!',
                description: 'Please enter all the details.',
                status: 'warning',
                duration: 5000,
                position: 'bottom-right'
            })
        }
    }

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
                                <input type='text'
                                    placeholder='First Name'
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='add-form-group'>
                                <label>Last Name</label>
                                <input type='text'
                                    placeholder='Last Name'
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                    }}
                                />
                                <div className='add-form-group'>
                                    <label>Email Id</label>
                                    <input type='text'
                                        placeholder='email@example.com'
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='add-form-group'>
                                <label>University Roll Number</label>
                                <input type='text'
                                    placeholder='University Roll Number'
                                    onChange={(e) => {
                                        setRollNo(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='add-form-group'>
                                <label>Library Id</label>
                                <input type='text'
                                    placeholder='Library Id'
                                    onChange={(e) => {
                                        setLibId(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='btn-add-student'>
                                <input
                                    type='submit'
                                    value='Add Student'
                                    onClick={() => {
                                        addStudent()
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStudent