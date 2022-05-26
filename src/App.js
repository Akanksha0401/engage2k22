import { Route, Routes } from 'react-router-dom';
import AddStudent from './components/dashboard/AddStudent';
import Dashboard from './components/dashboard/Dashboard';
import MarkAttendance from './components/dashboard/MarkAttendance';
import PastAttendance from './components/dashboard/PastAttendance';
import Discover from './components/home/Discover';
import Home from './components/home/Home';
import Register from './components/home/Register';
import './styles/app.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/discover' element={<Discover />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-student' element={<AddStudent />} />
        <Route path='/past-attendance' element={<PastAttendance />} />
        <Route path='/mark-attendance' element={<MarkAttendance />} />
      </Routes>
    </div>
  );
}

export default App;
