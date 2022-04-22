import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Signup = (props) => {

    const navigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [password, sePassword] = React.useState('');

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => sePassword(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5005/api/signup', { username, password })
            .then(response => {
                props.setLoggedInUser(response.data);
                navigate('/profile');
            })
            .catch(error => console.log(error))
    };

    return <>
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={handleUsernameChange} value={username} />
            <input type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
            <button type="submit" className="primary">Sign up</button>
            <Link to="/login">Already have an account ?</Link>
        </form>
    </>
};
