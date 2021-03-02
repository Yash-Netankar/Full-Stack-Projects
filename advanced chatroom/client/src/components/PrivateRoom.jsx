import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ThreeDots from "./ThreedotsMenu";
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3001");

const options2 = [
    'Exit',
    'Delete All'
];
const style = {
    margin: '0 auto',
    border: '2px solid black',
    width: '100%'
}


const PrivateRoom = () => {

    const [msg, setMsg] = useState("");
    const { name } = useParams();

    useEffect(() => {
        document.querySelector(".uname").innerText = `Chatting Privately With ${name}`;

        // socket.emit("pvt_msg", name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const AppendMsg = (msg, name, clas) => {
        let chat_screen = document.querySelector(".chat_screen");
        let div = document.createElement("div");
        div.classList.add("msg");
        div.classList.add(clas);
        let span = document.createElement("span");
        // span.addEventListener("click", () => setUinfo(!uinfo));
        span.innerText = name;
        div.append(span);
        let p = document.createElement("p");
        p.innerText = msg;
        div.append(p);
        chat_screen.append(div);
        // scroll to bottom always in chat screen
        chat_screen.scrollTop = chat_screen.scrollHeight;
    }

    const Submit = (e) => {
        e.preventDefault();
        AppendMsg(msg, "You", "me");
        // socket.emit('send', msg);
        setMsg("");
        document.querySelector("#msg_input").focus();
    }

    return (
        <div className="chatroom_container">
            <section className="sec2" style={style}>
                <header>
                    <h1>Private Chat</h1>
                    <p className="typing"></p>
                    <ThreeDots options={options2} />
                </header>
                <div className="chat_screen">
                    <div className="msg me">
                        <span>Private Chat</span>
                        <p className="uname"></p>
                        <h1 style={{ color: "red", fontSize: "2rem" }}>This page is under Development</h1>
                    </div>
                </div>
                <form className="msg_box" onSubmit={Submit}>
                    <TextField
                        id="msg_input"
                        label="Your Message"
                        placeholder="Message"
                        onChange={(e) => setMsg(e.target.value)}
                        value={msg}
                        multiline
                    />
                    <Button className="send_btn" type="submit">
                        <SendIcon />
                    </Button>
                </form>
            </section>
        </div>
    )
}

export default PrivateRoom
