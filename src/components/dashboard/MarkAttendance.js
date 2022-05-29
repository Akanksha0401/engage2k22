import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from '@vladmandic/face-api'
import { Link } from 'react-router-dom'
import { onValue, ref, set } from 'firebase/database';
import { db } from '../../assets/config/config';
import { useToast } from '@chakra-ui/react';

const MarkAttendance = () => {
    const videoRef = useRef();
    const canvasRef = useRef();

    const videoHeight = 480;
    const videoWidth = 640;

    const [students, setStudents] = useState([])
    const [labels, setLabels] = useState([])
    const [labeledImages, setLabeledImages] = useState([])
    const [imageArray, setImageArray] = useState([])
    const [descriptions, setDescriptions] = useState([])
    const [names, setNames] = useState([])

    const toast = useToast()

    const faceRecog = async () => {
        try {
            let descriptions = []
            for (let i in imageArray) {
                let desc = []
                let refArray = imageArray[i]
                for (let j in refArray) {
                    const img = await faceapi.fetchImage(refArray[j])
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                    desc.push(detections.descriptor)
                }
                refArray = []
                descriptions.push(desc)
            }
            setDescriptions(descriptions)
            if (descriptions) {
                toast({
                    title: 'Dataset Loaded',
                    status: 'success',
                    duration: 5000,
                    position: 'bottom-right'
                })
            }
        } catch (error) {
            toast({
                title: 'Something went wrong!',
                status: 'error',
                duration: 5000,
                position: 'bottom-right'
            })
        }
    }

    const loadLabeledImages = () => {
        return Promise.all(
            labels.map(async (label, id) => {
                return new faceapi.LabeledFaceDescriptors(label, descriptions[id])
            })
        )
    }

    const handleVideo = async () => {
        let names = []
        setInterval(async () => {
            const labeledFaceDescriptors = await loadLabeledImages()
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
            const detections = await faceapi
                .detectAllFaces(
                    videoRef.current,
                    new faceapi.SsdMobilenetv1Options()
                )
                .withFaceLandmarks()
                .withFaceDescriptors()
            canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current)
            faceapi.matchDimensions(canvasRef.current, {
                width: videoRef.current.width,
                height: videoRef.current.height
            })
            const resizedDetections = faceapi.resizeResults(detections, {
                width: videoRef.current.width,
                height: videoRef.current.height
            })
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
            const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
            results.forEach((result, i) => {
                let n = result.label
                if (n != 'unknown') {
                    names.push(n)
                    mark(names)
                }
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvasRef.current)
            })
        }, 100)
    }

    const mark = (names) => {
        let newNames = [...new Set(names)]
        setNames(newNames)
    }

    const sendData = async () => {
        let userId = ''
        let num = 0
        for (let i in names) {
            for (let j in students) {
                if (names[i] == students[j].firstName) {
                    userId = students[j].id
                    num = students[j].attendance
                    let fname = students[j].firstName
                    let lname = students[j].lastName
                    let em = students[j].email
                    let im = students[j].images
                    let lid = students[j].libId
                    let rno = students[j].rollNo
                    const studentRef = ref(db, 'Students/' + userId)
                    const attend = {
                        firstName: fname,
                        lastName: lname,
                        email: em,
                        images: im,
                        libId: lid,
                        rollNo: rno,
                        attendance: num + 1
                    }
                    await set(studentRef, attend)
                    toast({
                        title: 'Attendance Marked',
                        status: 'success',
                        duration: 5000,
                        position: 'bottom-right'
                    })
                }
            }
        }
        setNames('')
    }

    const triggerVideo = () => {
        if (videoRef.current.paused) {
            playVideo()
        } else {
            videoRef.current.pause()
            toast({
                title: 'Video Paused',
                status: 'success',
                duration: 5000,
                position: 'bottom-right'
            })
        }
    }

    const quitVideo = () => {
        window.location.reload()
        toast({
            title: 'Camera Closed',
            status: 'success',
            duration: 5000,
            position: 'bottom-right'
        })
    }

    const playVideo = async () => {
        const video = videoRef.current
        await navigator.mediaDevices.getUserMedia(
            {
                video: {
                    facingMode: 'user'
                }
            }
        )
            .then(stream => {
                video.srcObject = stream
                video.play()
                handleVideo()
                toast({
                    title: 'Camera Opened',
                    status: 'success',
                    duration: 5000,
                    position: 'bottom-right'
                })
            })
    }

    useEffect(() => {
        const loadModels = async () => {
            Promise.all([
                await faceapi.nets.ssdMobilenetv1.load('/models'),
                await faceapi.nets.ageGenderNet.load('/models'),
                await faceapi.nets.faceLandmark68Net.load('/models'),
                await faceapi.nets.faceRecognitionNet.load('/models'),
                await faceapi.nets.faceExpressionNet.load('/models')
            ])
                .then(() => {
                    getImages()
                    toast({
                        title: 'Models Loaded',
                        status: 'success',
                        duration: 5000,
                        position: 'bottom-right'
                    })
                })
                .catch((err) => {
                    toast({
                        title: 'Something went wrong!',
                        status: 'error',
                        duration: 5000,
                        position: 'bottom-right'
                    })
                })
        }
        loadModels()

        const getImages = async () => {
            const imageRef = ref(db, 'Students')
            await onValue(imageRef, (snapshot) => {
                const data = snapshot.val()
                let students = []
                for (let id in data) {
                    students.push({ id, ...data[id] })
                }
                setStudents(students)
                let labels = []
                for (let id in students) {
                    labels.push(students[id].firstName)
                }
                setLabels(labels)
                let labeledImages = []
                for (let id in students) {
                    labeledImages.push(students[id].images)
                }
                setLabeledImages(labeledImages)
                let imageArray = []
                for (let i in labeledImages) {
                    let imgArray = []
                    for (let j in labeledImages[i]) {
                        imgArray.push(labeledImages[i][j].substr(68))
                    }
                    imageArray.push(imgArray)
                }
                setImageArray(imageArray)
            })
        }
    }, [])

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
                        <video
                            ref={videoRef}
                            height={videoHeight}
                            width={videoWidth}
                        />
                        <canvas
                            ref={canvasRef}
                            height={videoHeight}
                            width={videoWidth}
                        />
                    </div>
                    <div className='btn-mark-container'>
                        <button
                            className='btn-mark'
                            onClick={() => {
                                faceRecog()
                            }}
                        >
                            Load Dataset
                        </button>
                        <button
                            className='btn-mark'
                            onClick={() => {
                                triggerVideo()
                            }}
                        >
                            Start/Stop
                        </button>
                        <button
                            className='btn-mark'
                            onClick={() => {
                                sendData()
                            }}
                        >
                            Mark
                        </button>
                        <button
                            className='btn-mark'
                            onClick={() => {
                                quitVideo()
                            }}
                        >
                            Quit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarkAttendance