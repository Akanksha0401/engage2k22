import { Box, Text } from '@chakra-ui/react'
import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../../assets/config/config'

const Profile = () => {
    const [user, setUser] = useState({})
    const [faculty, setFaculty] = useState({})
    const [currentFaculty, setCurrentFaculty] = useState({})

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
                        if (user.email === faculty[id].email) {
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
        <div className='profile-container'>
            <div className='profile'>
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
                <div className='profile-content-container'>
                    <div className='profile-content'>
                        <Text
                            fontSize={'2rem'}
                            fontWeight={'700'}
                            textAlign={'center'}
                        >
                            My Profile
                        </Text>
                        {
                            user?.displayName ?
                                <Box
                                    textAlign={'center'}
                                >
                                    <Text
                                        fontWeight={'700'}
                                        fontSize={'2xl'}
                                    >
                                        {user?.displayName}
                                    </Text>
                                    <Text
                                        fontWeight={'400'}
                                    >
                                        {
                                            user?.email
                                        }
                                    </Text>
                                </Box>
                                :
                                <Box
                                    textAlign={'center'}
                                >
                                    <Text
                                        fontWeight={'700'}
                                        fontSize={'2xl'}
                                    >
                                        {
                                            currentFaculty.firstName
                                        } {
                                            currentFaculty.lastName
                                        }
                                    </Text>
                                    <Text
                                        fontWeight={'400'}
                                    >
                                        {
                                            currentFaculty.email
                                        }
                                    </Text>
                                    <Text
                                        fontWeight={'200'}
                                    >
                                        {
                                            currentFaculty.designation
                                        }
                                    </Text>
                                    <Text
                                        fontWeight={'200'}
                                    >
                                        {
                                            currentFaculty.department
                                        }
                                    </Text>
                                </Box>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile