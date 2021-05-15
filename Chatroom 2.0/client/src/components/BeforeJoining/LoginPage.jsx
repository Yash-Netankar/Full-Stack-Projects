import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../Redux/actions";
import axios from "axios";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    // reference  of error msg (not working saying can't read null but worked in registration page)
    const error = useRef(null);

    // states
    const [user, setUser] = useState({
        name: "",
        pass: ""
    })

    // toggle password see & unsee
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const ip_pass = document.querySelector(".pass");
        visible ? ip_pass.type = "text" : ip_pass.type = "password";
    }, [visible])


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


    // dispatch the login action
    const DispatchLoginAction = (login) => {
        dispatch(loggedIn(login));
    }

    // the API
    const Login = async () => {
        await axios.post("http://localhost:3001/login/user", user).
            then(res => {
                if (res.data.msg === true) {
                    document.querySelector("#login_error").innerText = "Logged In Successfully";
                    // making login now (setting true in redux to login to home)
                    DispatchLoginAction(true);
                    history.push("/home");
                }
                else if (res.data.msg === false) {
                    document.querySelector("#login_error").innerText = "Invalid Password or Username";
                    DispatchLoginAction(false);
                }
                else {
                    document.querySelector("#login_error").innerText = res.data.msg;
                    DispatchLoginAction(false);
                }
            }).
            catch(err => console.log(err));
        // error.current.innerText = "Some Technical Error Occurred 🔴"
    }

    // validate info
    const Validate = () => {
        let name_regexp = /^[a-zA-Z]{3,7}\s?\d{0,2}\s?[a-zA-Z]{0,4}$/;
        if (user.name.length <= 15 && user.name.length >= 3) {
            if (name_regexp.test(user.name)) {
                if (user.pass.length >= 4 && user.pass.length <= 8) {
                    // see if user exists (db & other stuff)
                    Login();
                }
                else document.querySelector("#login_error").innerText = "Password should be less than 8 and greater than 3 characters!!"
            }
            else document.querySelector("#login_error").innerText = "Invalid Username!! Check: no special Characters, no digits in beginning, first word between 3-7 digits, only 2 digits in middlename, last name between 4 characters!!";
        }
        else document.querySelector("#login_error").innerText = "Username must be atleast 3 characters long & atmost 14!!";
    }

    // JSX
    return (
        <div className="login_container">
            <div className="login_box">
                <h1>Login</h1>

                <section className="formBox">
                    <form className="loginForm" onSubmit={e => e.preventDefault()}>
                        {/* error msg */}
                        <p id="login_error" ref={error}></p>

                        {/* username */}
                        <div className="input_box">
                            <TextField id="standard-basic" label="Username" type="text" value={user.name} name="name" onChange={input} placeholder="Ex: yash 20 Ind" autoComplete="true" />
                            <PersonIcon />
                        </div>

                        {/* password */}
                        <div className="input_box">
                            <input placeholder="Password" type="password" className="pass" value={user.pass} name="pass" onChange={input} autoComplete="true" />
                            {visible ?
                                <VisibilityIcon onClick={() => setVisible(!visible)} /> :
                                <VisibilityOffIcon onClick={() => setVisible(!visible)} />}
                        </div>

                        {/* submit button */}
                        <Button onClick={() => { Validate(); }} className="login_btn">
                            Login
                        </Button>

                        {/* redirect page */}
                        <div className="redirectLinks">
                            <NavLink to="/register" className="rLink">Sign-Up</NavLink>
                            <NavLink to="/forget" className="rLink">Forget-Password</NavLink>
                            <NavLink to="forgetUsername" className="rLink">Forget-Username</NavLink>
                        </div>
                    </form>

                    {/* second part background div */}
                    <div className="login_bg"></div>
                </section>
            </div>
        </div>
    )
}

export default LoginPage
