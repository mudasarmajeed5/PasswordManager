import './App.css'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import { useState,useEffect } from 'react';
function App() {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === 'mudasarmajeed5') {
      setLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true');
    } else {
      alert('Incorrect password');
    }
  };
  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h1 className="text-2xl mb-6">Login</h1>
          <form onSubmit={handleSubmit}>
            <label className='text-black text-center text-xl ' htmlFor="auth">Enter your password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              className="p-2 mb-4 border rounded w-full text-black"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }


  return (
    <>
      <Navbar onLogout={handleLogout} />
      <Manager/>
    </>
  )
}

export default App
