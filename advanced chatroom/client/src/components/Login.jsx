import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

const Login = () => {
    let history = useHistory();
    const [info, setInfo] = useState({
        name: "",
        age: 18,
        location: ""
    });

    const input = (e) => {
        let { name, value } = e.target;
        setInfo(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const SubmitForm = async (e) => {
        e.preventDefault();
        let error = document.querySelector(".error_div");
        let regexp_name = /^[a-zA-Z]{2,8}([0-9]?){2}$/;
        let regexp_age = /^[\d]{2}$/;
        let regexp_location = /^[a-zA-Z]{2,20}$/;
        if (regexp_name.test(info.name)) {
            if (regexp_age.exec(info.age)) {
                if (regexp_location.exec(info.location)) {
                    history.push(`/chatroom/${info.name}`);
                }
                else error.innerHTML = "Invalid Location!!<br>Can't be greater than 20 and no spaces or special characters allowed.";
            }
            else error.innerHTML = "Invalid Age!!<br>Should be greater than 18 and less than 100.";
        }
        else error.innerHTML = "Invalid Name!!<br>Spaces, more than 2 digits, special characters, starting with digit not allowed.";
    }

    return (
        <>
            <div className="login_container">
                <h1>Sign In For Free</h1>
                <div className="login_form">
                    <div className="error_div"></div>
                    <form onSubmit={SubmitForm}>
                        <input type="text" name="name" onChange={input} value={info.name} placeholder="Enter Username" />
                        <input type="number" name="age" min={18} onChange={input} value={info.age} placeholder="Enter Age" />
                        <input type="text" name="location" onChange={input} value={info.location} placeholder="Enter Location" />
                        {/* <NavLink to="/chatroom" exact> */}
                        <Button type="submit">Enter Chatroom</Button>
                        {/* </NavLink> */}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
