import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

const RegisterPage = () => {
    // reference of error msg
    const error = useRef(null);

    const [user, setUser] = useState({
        name: "",
        pass: "",
        cpass: "",
        email: ""
    })

    // toggle password see & unsee
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    useEffect(() => {
        const ip_pass = document.querySelector(".pass");
        visible ? ip_pass.type = "text" : ip_pass.type = "password";
    }, [visible])

    useEffect(() => {
        const ip_pass2 = document.querySelector(".cpass");
        visible2 ? ip_pass2.type = "text" : ip_pass2.type = "password";
    }, [visible2])


    // change state
    const input = (e) => {
        let { name, value } = e.target;
        setUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // validate info
    const Validate = () => {
        let name_regexp = /^[a-zA-Z]{3,7}\s?\d{0,2}\s?[a-zA-Z]{0,4}$/;
        if (user.pass === user.cpass) {
            if (user.name.length <= 15 && user.name.length >= 3) {
                if (name_regexp.test(user.name)) {
                    if (user.pass.length >= 4 && user.pass.length <= 8) {
                        // error.current.innerText = "Registered";
                        // post data to backend 
                        sendDataToBackend();
                    }
                    else error.current.innerText = "Password should be less than 8 and greater than 3 characters!!"
                }
                else error.current.innerText = "Invalid Username!! Check: no special Characters, no digits in beginning, first word between 3-7 digits, only 2 digits in middlename, last name between 4 characters!!";
            }
            else error.current.innerText = "Username must be atleast 3 characters long & atmost 14!!";
        }
        else error.current.innerText = "Passwords dont Match !!";
    }

    // sending data to backend server to register user in DB
    const sendDataToBackend = async () => {
        await axios.post("http://localhost:3001/user",
            { name: user.name, email: user.email, pass: user.pass })
            .then(res => {
                error.current.innerText = res.data.msg;
            }).catch(err => {
                console.log("Error sending data ", err);
            })
    }

    // JSX
    return (
        <div className="register_container">
            <div className="register_box">
                <h1>Register</h1>

                <section className="formBox">
                    <form className="registerForm">
                        {/* error msg */}
                        <p id="register_error" ref={error}></p>

                        {/* username */}
                        <div className="input_box">
                            <TextField id="standard-basic" className="standard-basic" label="Username" type="text" value={user.name} name="name" onChange={input} placeholder="Ex: yash 20 Ind" required />
                            <PersonIcon />
                        </div>

                        {/* email */}
                        <div className="input_box">
                            <TextField id="standard-basic2" className="standard-basic" label="Email" type="email" value={user.email} name="email" onChange={input} placeholder="Genuine Email" required />
                            <EmailIcon />
                        </div>

                        {/* password */}
                        <div className="input_box">
                            <input type="password" placeholder="Password" className="pass" value={user.pass} name="pass" onChange={input} required autoComplete="false" />
                            {visible ?
                                <VisibilityIcon onClick={() => setVisible(!visible)} /> :
                                <VisibilityOffIcon onClick={() => setVisible(!visible)} />}
                        </div>

                        {/* confirm password */}
                        <div className="input_box">
                            <input type="password" placeholder="Confirm Password" className="cpass" value={user.cpass} name="cpass" onChange={input} required autoComplete="false" />
                            {visible2 ?
                                <VisibilityIcon onClick={() => setVisible2(!visible2)} /> :
                                <VisibilityOffIcon onClick={() => setVisible2(!visible2)} />}
                        </div>

                        {/* submit button */}
                        <Button onClick={Validate} className="register_btn" >
                            Sign Up
                        </Button>

                        {/* redirect links */}
                        <div className="redirectLinks">
                            <NavLink to="/" className="rLink">Login</NavLink>
                        </div>
                    </form>

                    {/* second part background div */}
                    <div className="register_bg"></div>
                </section>
            </div>
        </div>
    )
}

export default RegisterPage
