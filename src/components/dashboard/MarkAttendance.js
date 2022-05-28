import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from '@vladmandic/face-api'
import { Link } from 'react-router-dom'
import { onValue, ref } from 'firebase/database';
import { db } from '../../assets/config/config';

const MarkAttendance = () => {
    const videoRef = useRef();
    const canvasRef = useRef();

    const videoHeight = 480;
    const videoWidth = 640;

    const [students, setStudents] = useState([])
    const [labels, setLabels] = useState([])
    const [labeledImages, setLabeledImages] = useState([])
    const [imageArray, setImageArray] = useState([])

    const handleVideo = () => {
        setInterval(async () => {
            const detections = await faceapi
                .detectAllFaces(
                    videoRef.current,
                    new faceapi.SsdMobilenetv1Options()
                )
                .withFaceLandmarks()
                .withFaceExpressions()

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
            faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)
            resizedDetections.forEach(detection => {
                const box = detection.detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: 'Face' })
                drawBox.draw(canvasRef.current)
            })

            // new faceapi.draw.DrawBox(canvasRef.current, { label: 'Face' })
            // faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
        }, 100)
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
                .then()
                .catch((err) => {
                    console.log(err);
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
                // console.log(students)
                setStudents(students)

                let labels = []
                for (let id in students) {
                    labels.push(students[id].firstName)
                }
                // console.log(labels)
                setLabels(labels)

                let labeledImages = []
                for (let id in students) {
                    labeledImages.push(students[id].images)
                }
                // console.log(labeledImages[0][0])
                setLabeledImages(labeledImages)

                let imageArray = []
                for (let i = 0; i < labeledImages.length; i++) {
                    for (let j = 0; j < labeledImages[i].length; j++) {
                        imageArray.push(labeledImages[i][j])
                    }
                }
                // console.log(imageArray[5])
                setImageArray(imageArray)
                // loadLabeledImages(imageArray)
            })
        }
        getImages()
    }, [])

    const triggerVideo = () => {
        if (videoRef.current.paused) {
            playVideo()
        } else {
            videoRef.current.pause()
        }
    }

    const quitVideo = () => {
        window.location.reload()
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
            })
    }

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
                                triggerVideo()
                            }}
                        >
                            Start Marking
                        </button>
                        <button
                            className='btn-mark'
                            onClick={() => {
                                quitVideo()
                            }}
                        >
                            Stop Marking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarkAttendance