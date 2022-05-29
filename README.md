# Attendance Tracker

Face Recognition attendance tracker that takes your attendance through webcam. It use [face-api models](https://github.com/Akanksha0401/face-api/tree/master/model) to recognise the face and uses [Google Firebase](https://firebase.google.com/?gclid=CjwKCAjwkMeUBhBuEiwA4hpqECgDZxyyZqHUjrBCTGSfVJesOKJOQmSOrqXtme970GS7qoo1KiMbjhoC7EQQAvD_BwE&gclsrc=aw.ds) to store and access the data.
Read the tutorial below to know `how to use` this web app.

## Resources

- [Node Js](https://nodejs.org/en/)
- [React Js](https://reactjs.org/)
- [Firebase](https://firebase.google.com/?gclid=CjwKCAjwkMeUBhBuEiwA4hpqECgDZxyyZqHUjrBCTGSfVJesOKJOQmSOrqXtme970GS7qoo1KiMbjhoC7EQQAvD_BwE&gclsrc=aw.ds)
- [vladmandic/face-api](https://github.com/vladmandic/face-api)
- [Chakra UI](https://chakra-ui.com/)
- [SASS](https://sass-lang.com/)
- [uuid](https://www.npmjs.com/package/uuid)

## Tutorial 🤔

### Pre-requisites 😬

Your system must have:
- [Node Js](https://nodejs.org/en/)
- Code Editor ([VS Code](https://code.visualstudio.com/) recommended)

### Installation 😌

- Fork [this](https://github.com/Akanksha0401/engage2k22) repository and open with [Github Desktop](https://desktop.github.com/) or clone this repository.

```bash
    git clone https://github.com/Akanksha0401/engage2k22.git
```
- Navigate to the cloned folder (engage2k22) and open it with the code editor(VS Code).

- Press `Ctrl + Shift + ~ ` to open new Terminal window in VS Code.

- Run this command in the terminal window.

```bash
    npm i
```
This will download all dependencies into the project folder.

- Now run this command on terminal window.
```bash
    npm start
```
- Web App will launch on `https://localhost:3000`

### How to Use 😍

- `Login with Google` or `Register` to access your dashboard.

- Add students by clicking on `Add Student` Button.

- Enter student details along with 2-3 photos of the student.

- Now go back to dashboad and click on `Mark Attendance` button.

- Click on `Load Dataset` button. This will load all the data of images from database.

- Wait until a notification showing `Dataset Loaded` pops-up at the bottom-right.

- Now click on `Start/Stop` button to access webcam. Allow access if prompted.

- A live video feed will be shown on the screen.

- Now bring the student infront of the camera and around his/her face his/her First Name will be shown.

- Now you can click on `Mark` button to mark their attendance.

- To close the camera feed, click on `Quit` button.

- Go back to dashboard and view attendance by clicking on `Past Attendance` button.

#### Points to remember 😒

- Remember to `Load Dataset` and wait until popup shows up before starting camera.

- Clicking on the `Start/Stop` button while video feed active, will pause the feed. You can click on it again to resume the feed but this would require to reload the datasets.

## Status

- In Progress..
- Not puplished.

## Author

[@Akanksha0401](https://github.com/Akanksha0401)