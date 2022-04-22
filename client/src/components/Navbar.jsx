import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Navbar = (props) => {

    const userLoggedin = props.loggedInUser;

    // const navigate = useNavigate();

    // const handleFastLog = () => {
    //     axios
    //         .post('http://localhost:5005/api/login', { username: 'Pipo', password: 'Pipo1234' })
    //         .then(response => {
    //             props.setLoggedInUser(response.data)
    //             navigate("/profile");
    //         })
    //         .catch(err => console.log(err))
    // };

    const handleLogout = () => {
        axios
            .post('http://localhost:5005/api/logout')
            .then(() => props.setLoggedInUser(null))
            .catch(err => console.log(err))
    };

    return (
        <header>
            <h1 id="logo">Auth</h1>
            {userLoggedin ? userLoggedin.username : ''}
            {/* <button onClick={handleFastLog}>FAST</button> */}
            <nav>
                <NavLink to="/" activeclassname="active">Home</NavLink>
                {
                    !userLoggedin ?
                        <>
                            <NavLink to="/login" activeclassname="active">Login</NavLink>
                            <NavLink to="/signup" activeclassname="active">Signup</NavLink>
                        </>
                        :
                        <>
                            <NavLink to="/profile" activeclassname="active">Profile</NavLink>
                            <NavLink to="/admin" activeclassname="active">Admin</NavLink>
                            <button onClick={handleLogout} className="danger">Logout</button>
                        </>
                }
            </nav>
        </header>
    )
}