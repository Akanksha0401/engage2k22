import { Route, Routes } from 'react-router-dom';
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
      </Routes>
    </div>
  );
}

export default App;
