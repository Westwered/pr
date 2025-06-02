import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Admin from './pages/Admin/Admin';

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
