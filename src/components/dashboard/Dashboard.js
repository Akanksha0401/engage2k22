import { useToast } from '@chakra-ui/react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../../assets/config/config'
import '../../styles/dashboard.css'

const Dashboard = () => {

    const [user, setUser] = useState({})
    const [faculty, setFaculty] = useState({})
    const [currentFaculty, setCurrentFaculty] = useState({})

    const toast = useToast()

    const nav = useNavigate()

    const logout = async () => {
        try {
            await signOut(auth)
            nav('/')
            toast({
                title: 'Logged out successfully!',
                status: 'success',
                duration: 5000,
                position: 'bottom-right'
            })
        } catch (error) {
            toast({
                title: 'Something went wrong!',
                description: 'Sorry for the inconvinience.',
                status: 'error',
                duration: 5000,
                position: 'bottom-right'
            })
        }
    }

    useEffect(() => {
        const showFaculty = async (user) => {
            if (user.displayName) {
            } else {
                const facultyRef = ref(db, 'Faculty')
                await onValue(facultyRef, (snapshot) => {
                    const data = snapshot.val()
                    let faculty = []
                    for (let id in data) {
                        faculty.push({ id, ...data[id] })
                    }
                    setFaculty(faculty)
                    for (let id in faculty) {
                        if (user.email == faculty[id].email) {
                            setCurrentFaculty(faculty[id])
                        }
                    }
                })
            }
        }

        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            showFaculty(currentUser)
        })
    }, [])


    return (
        <div className='dash-container'>
            <div className='dashboard'>
                <div className='dash-left'>
                    <div className='v-nav'>
                        <Link to='/add-student'>
                            <div className='v-nav-item'>
                                <div className='v-nav-item-text'>
                                    Add Student
                                </div>
                                <svg width="26" height="26" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25Zm4.5 10.5h-3.75v3.75h-1.5v-3.75H7.5v-1.5h3.75V7.5h1.5v3.75h3.75v1.5Z"></path>
                                </svg>
                            </div>
                        </Link>
                        <Link to='/past-attendance'>
                            <div className='v-nav-item'>
                                Past Attendance
                            </div>
                        </Link>
                        <div className='btn-logout'
                            onClick={() => {
                                logout()
                            }}
                        >
                            Logout
                        </div>
                    </div>
                </div>
                <div className='dash-right'>
                    <div className='dash-top'>
                        <div className='h-nav'>
                            <div className='h-nav-item'>
                                <Link to='/profile'>
                                    <div
                                        className='profile'
                                    >
                                        <svg width="26" height="26" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.592 3.027C14.68 2.042 13.406 1.5 12 1.5c-1.414 0-2.692.54-3.6 1.518-.918.99-1.365 2.334-1.26 3.786C7.348 9.67 9.528 12 12 12c2.472 0 4.648-2.33 4.86-5.195.106-1.439-.344-2.78-1.268-3.778Z"></path>
                                            <path d="M20.25 22.5H3.75a1.454 1.454 0 0 1-1.134-.522 1.655 1.655 0 0 1-.337-1.364c.396-2.195 1.63-4.038 3.571-5.333C7.574 14.132 9.758 13.5 12 13.5c2.242 0 4.426.633 6.15 1.781 1.94 1.294 3.176 3.138 3.571 5.332.091.503-.032 1-.336 1.365a1.453 1.453 0 0 1-1.135.522Z"></path>
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='dash-bottom'>
                        <div className='dash-content'>
                            <div className='dash-title'>
                                <div className='greet-title'>
                                    Welcome {
                                        user?.displayName ?
                                            <>
                                                {user?.displayName}
                                            </>
                                            :
                                            <>
                                                {
                                                    currentFaculty.firstName
                                                } {
                                                    currentFaculty.lastName
                                                }
                                            </>
                                    }
                                </div>
                                <div className='date-title'>
                                    {
                                        new Date().getDate()
                                    }
                                    /
                                    {
                                        new Date().getMonth()
                                    }
                                    /
                                    {
                                        new Date().getFullYear()
                                    }
                                </div>
                            </div>
                            <div className='btn-attend-container'>
                                <Link to='/mark-attendance'>
                                    <div className='btn-attend'>
                                        Mark Attendance
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard