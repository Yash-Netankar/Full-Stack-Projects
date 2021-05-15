import React from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const ActivationPage = () => {

    const t = useParams();
    const n = useParams();
    const token = t.token.slice(1);
    const name = n.name.slice(1);


    const verify = () => {
        axios.post(`http://localhost:3001/user/activateAccount`, { token, name }).then(res => {
            console.log(res)
            document.querySelector(".btn").style.display = "none";
            document.querySelector(".msg").innerText = res.data.msg
        }).
            catch(err => {
                document.querySelector(".msg").innerText = "Couldn't Verify You!!"
            })
    }

    return (
        <div>
            <h2 className="msg">Click on the following button to activate your account.</h2>
            <button className="btn" onClick={verify}>Activate</button>
        </div>
    )
}

export default ActivationPage
