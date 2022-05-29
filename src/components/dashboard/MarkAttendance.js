import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from '@vladmandic/face-api'
import { Link } from 'react-router-dom'
import { onValue, ref } from 'firebase/database';
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
    // const [img, setImg] = useState()
    const [names, setNames] = useState([])

    const toast = useToast()

    const faceRecog = async () => {
        let descriptions = []
        for (let i in imageArray) {
            let desc = []
            let refArray = imageArray[i]
            // console.log(refArray)
            for (let j in refArray) {
                const img = await faceapi.fetchImage(refArray[j])
                // console.log(img)
                // console.log(refArray[j])
                // setImg(img)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                desc.push(detections.descriptor)
            }
            refArray = []
            descriptions.push(desc)
            // console.log(descriptions)
        }
        setDescriptions(descriptions)
        console.log(descriptions)
    }

    const loadLabeledImages = () => {
        return Promise.all(
            labels.map(async (label, id) => {
                return new faceapi.LabeledFaceDescriptors(label, descriptions[id])
            })
        )
    }

    const handleVideo = async () => {
        setInterval(async () => {
            const labeledFaceDescriptors = await loadLabeledImages()
            // console.log(labeledFaceDescriptors)
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
            // faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)

            const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))

            results.forEach((result, i) => {
                // let res = result.toString()
                // console.log(res)
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvasRef.current)
                let names = []
                names.push(result.toString())
                // console.log(names)
            })
        }, 100)
    }

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

    useEffect(() => {
        const loadModels = async () => {
            Promise.all([
                await faceapi.nets.ssdMobilenetv1.load('/models'),
                await faceapi.nets.ageGenderNet.load('/models'),
                await faceapi.nets.faceLandmark68Net.load('/models'),
                await faceapi.nets.faceRecognitionNet.load('/models'),
                await faceapi.nets.faceExpressionNet.load('/models')
            ])
                .then(
                    // playVideo()
                )
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
                // console.log(labeledImages)
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
                // console.log(imageArray)
            })
            faceRecog()
        }
        getImages()
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