import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ThreeDots from "./ThreedotsMenu";
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import LockIcon from '@material-ui/icons/Lock';
import UserInfo from "./UserInfo";
import Arrow from '@material-ui/icons/ArrowForwardIos';

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");


const ChatRoom = () => {

    const [uinfo, setUinfo] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [msg, setMsg] = useState("");
    const [pvt_uname, setPvt_uname] = useState("");

    const options = [
        <Button onClick={() => setSidebar(false)}>Close</Button>,
        'Home',
        'Create Room'
    ];
    const options2 = [
        'Exit',
        'Delete All'
    ];

    const { name } = useParams();

    useEffect(() => {
        socket.emit("new_user_joined", name);

        socket.on('user_joined', name => {
            let chat_screen = document.querySelector(".chat_screen");
            let joined_div = document.createElement("div");
            joined_div.classList.add("msg");
            joined_div.classList.add("joined");
            joined_div.innerText = `${name} joined the chat`;
            chat_screen.append(joined_div);
        });

        socket.on('receive', data => {
            AppendMsg(data.msg, data.name, "they");
        });

        socket.on('left', data => {
            let chat_screen = document.querySelector(".chat_screen");
            let joined_div = document.createElement("div");
            joined_div.classList.add("msg");
            joined_div.classList.add("joined");
            joined_div.innerText = `${data.name} Left the chat`;
            chat_screen.append(joined_div);
            socket.emit('user_left', data.name);
        });

        // whisper
        socket.on("pvt_msg_emit", (data) => {
            AppendMsg(data.msg, data.name, 'their_privateMSG', true);
        });

        // list of users
        socket.on('list_of_users', arr => {
            displayUsersJoined(arr);
        });

        // user is typing
        let timerID = null;
        const debounce = (func, timer) => {
            if (timerID) {
                clearTimeout(timerID)
            }
            timerID = setTimeout(() => {
                func();
            }, timer);
        }
        socket.on('typing', data => {
            if (document.querySelector(".typing")) {
                document.querySelector(".typing").innerText = data.msg
            }
            debounce(function () {
                document.querySelector(".typing").innerText = "";
            }, 1000);
        })
        document.getElementById("msg_input").addEventListener("keyup", (e) => {
            socket.emit("typing", { name: name });
        });
        // user is typing end
        //to avoid warning of useeffect
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const displayUsersJoined = (arr) => {
        document.querySelector(".users_div").innerHTML = `
        ${arr.map(item => `
            <li className="ulist_uname">${item}</li>`
        )}`
    }

    const AppendMsg = (msg, name, clas, pvt = false) => {
        let chat_screen = document.querySelector(".chat_screen");
        let div = document.createElement("div");
        div.classList.add("msg");
        div.classList.add(clas);
        let span = document.createElement("span");
        pvt ? span.innerHTML = `${name} (Private)` : span.innerText = name;
        span.addEventListener("click", (e) => setPvt_uname(e.target.innerText));
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
        socket.emit('send', msg);
        setMsg("");
        document.querySelector("#msg_input").focus();
    };

    const PVT_Msg = () => {
        if (pvt_uname !== "") {
            socket.emit("pvt_msg", { msg, pvt_uname });
            AppendMsg(msg, "You", 'my_privateMSG');
            setMsg("");
            document.querySelector("#msg_input").focus();
        }
        else {
            alert("Please Select A username by clicking on the names you can see in chatscreen to send a private message");
        }
    }


    return (
        <div className="chatroom_container">
            <section className={sidebar ? "sec1 show" : "sec1"}>
                <header>
                    <h1>Ny chatroom</h1>
                    <ThreeDots options={options} setSidebar={setSidebar} />
                </header>
                <ul className="users_div"></ul>
            </section>
            <section className="sec2">
                <header>
                    <h1>
                        <Button className="arrow_btn" onClick={() => setSidebar(true)}><Arrow /></Button>
                        All Chat
                    </h1>
                    <UserInfo setUinfo={setUinfo} uinfo={uinfo} />
                    <p className="typing"></p>
                    <ThreeDots options={options2} />
                </header>
                <div className="chat_screen">
                    <div className="msg me">
                        <span onClick={() => setUinfo(!uinfo)}>Owner</span>
                       Welcome To The Ny's Chatroom!!
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
                    <Button className="send_btn" type="button" onClick={PVT_Msg} title="Private Message">
                        <AccountCircleIcon />
                    </Button>
                    <Button className="send_btn" type="submit" title="Send to All">
                        <SendIcon />
                    </Button>
                </form>
            </section>
        </div>
    )
}

export default ChatRoom
