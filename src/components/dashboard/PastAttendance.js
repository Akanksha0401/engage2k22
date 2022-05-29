import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../assets/config/config'

const PastAttendance = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        const getStudent = async () => {
            const studRef = ref(db, 'Students')
            await onValue(studRef, (snapshot) => {
                const data = snapshot.val()
                let students = []
                for (let id in data) {
                    students.push({ id, ...data[id] })
                }
                setStudents(students)
                console.log(students)
            })
        }

        getStudent()
    }, [])


    return (
        <div className='past-attendance-container'>
            <div className='past-attendance'>
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
                <div className='past-container'>
                    <div className='past-form'>
                        <div className='past-form-title'>
                            Attendance Details
                        </div>
                        <div className='past-form-content'>
                            {
                                students.map((student) => {
                                    return (
                                        <div className='past-cards'>
                                            <div className='form-card'>
                                                <div className='form-title'>
                                                    Name:
                                                </div>
                                                <div className='past-name'>
                                                    {
                                                        student.firstName
                                                    }
                                                    &nbsp;
                                                    {
                                                        student.lastName
                                                    }
                                                </div>
                                            </div>
                                            <div className='form-card'>
                                                <div className='form-title'>
                                                    Attendance:
                                                </div>
                                                <div className='past-attendance'>
                                                    {
                                                        student.attendance
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PastAttendance