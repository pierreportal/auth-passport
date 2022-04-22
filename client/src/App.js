import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Profile } from './components/Profile';
import { Admin } from './components/Admin';
import axios from 'axios';




function App() {

  React.useEffect(() => {
    axios.get('http://localhost:5005/api/loggedin')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  })

  const [loggedInUser, setLoggedInUser] = React.useState(null);

  return (
    <div className="App">
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
          <Route path="/signup" element={<Signup setLoggedInUser={setLoggedInUser} />} />
          <Route element={<ProtectedRoute isAllowed={!!loggedInUser} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
