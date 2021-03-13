import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ChatIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import SendIcon from '@material-ui/icons/Send';
import People from '@material-ui/icons/PeopleAlt';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

import io from "socket.io-client";
const socket = io.connect("/");

let allData = {};

const Pokemon = () => {
    const { name, room } = useParams();

    const [num, setNum] = useState(1);

    const [pname, setName] = useState();
    const [moves, setMoves] = useState();
    const [image, setImage] = useState("");

    const [sidebar1, setSidebar1] = useState(false);
    const [sidebar2, setSidebar2] = useState(false);

    const [msg, setMsg] = useState("");
    const [list_of_users, setList_of_users] = useState([]);

    // get all data
    const getAllData = async () => {
        let data = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=691');
        data.data.results.forEach(item => {
            axios.get(item.url).then(data => {
                allData[data.data.name] = [data.data.moves.length, data.data.sprites.front_default];
            });
        })
    }

    useEffect(() => {
        getAllData();
        /*****************SOCKET HANDLING****************** */
        let msg_box = document.querySelector(".msg_box");

        socket.emit("join", room);
        socket.on("list_of_users", list_of_users => {
            setList_of_users(list_of_users);
        });

        socket.on("chat-msg-send", data => {
            let msg_div = document.createElement("div");
            msg_div.classList.add("msg_div");
            let h4 = document.createElement("h4");
            h4.classList.add("name");
            h4.innerText = data.name;
            let p = document.createElement("p");
            p.classList.add("msg");
            p.innerText = data.msg;
            msg_div.append(h4);
            msg_div.append(p);
            msg_box.append(msg_div);
        });


        // updating winner's score
        socket.on("winner", (data) => {
            let score_div = document.querySelector(`.${data.winner}-score`);
            score_div.innerText = data.score;
            document.querySelector(".play_btn").disabled = false;
            // document.querySelector(".play_btn").style.display = "block"
        });

        // user leaving
        socket.on("disconnect_user", list => {
            setList_of_users(list)
        })
        // eslint-disable-next-line
    }, [])


    // form submit for chat
    const Submit = (e) => {
        e.preventDefault();
        if (msg.length >= 100) {
            alert("Message should contain only 100 chars.");
        }
        else {
            socket.emit("chat-msg", { room, name, msg });
            setMsg("");
            document.querySelector("#standard-basic").focus();
        }
    }

    //GAME
    const play = async (e) => {
        e.preventDefault();
        let access = allData[Object.keys(allData)[num]];
        if (num >= 1 && num <= 690) {
            setName(Object.keys(allData)[num]);
            setMoves(access[0]);
            setImage(access[1]);
            // now playing the game with other players in room
            document.querySelector(".play_btn").disabled = true;
            // document.querySelector(".play_btn").style.display = "none"
            socket.emit("play", { name, room, moves: access[0] });
        }
        else
            alert("Number Should be greater than 0 and less than 690");
    }

    const style = {
        color: "#ff4757"
    }
    return (
        <div className="game_container">
            <header className="game_header">
                <div className="logo">
                    <Button className="chat_btn"
                        onClick={() => {
                            setSidebar1(true)
                            setSidebar2(false)
                        }}>
                        <ChatIcon />
                    </Button>
                    <h1>Pokemon</h1>
                </div>
                <Button onClick={() => {
                    setSidebar1(false)
                    setSidebar2(true)
                }}>
                    <People />
                </Button>
            </header>
            {/* sidebars */}
            <div className={sidebar1 ? "sidebar1 show" : "sidebar1"}>
                <section className="sidebar1_head">
                    <h1>Chats</h1>
                    <Button onClick={() => setSidebar1(false)}>
                        <Close />
                    </Button>
                </section>
                {/* chat box */}
                <main className="chat_body">
                    <div className="msg_box"></div>
                    <form className="msg_input_box" onSubmit={Submit} autoComplete="off">
                        <TextField id="standard-basic" label="Your Message" onChange={(e) => setMsg(e.target.value)} value={msg} style={{ width: '85%' }} />
                        <Button type="submit" className="send-btn">
                            <SendIcon />
                        </Button>
                    </form>
                </main>
            </div>
            <div className={sidebar2 ? "sidebar2 show" : "sidebar2"}>
                <section className="sidebar2_head">
                    <h1>Users</h1>
                    <Button onClick={() => setSidebar2(false)}>
                        <Close />
                    </Button>
                </section>
                <ul className="users_list">
                    {
                        list_of_users.map((user, i) => {
                            return (
                                <li key={i}>{user}</li>
                            )
                        })
                    }
                </ul>
            </div>
            {/* leaderboard */}
            <div className="leaderboard">
                <h1>LEADERBOARD</h1>
                <table>
                    <thead>
                        <tr>
                            {
                                list_of_users.map((user, i) => {
                                    return (
                                        <th key={i}>{user}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                list_of_users.map((user, i) =>
                                    <td key={i} className={`${user}-score`}>0</td>
                                )
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* gameCard */}
            <div className="card-container">
                <form autoComplete="off" className="card_input" onSubmit={play}>
                    <input
                        type="number"
                        onChange={(e) => { setNum(e.target.value) }}
                        value={num}
                        placeholder="Enter Card no"
                        className="num_input"
                    />
                    <Button type="submit" className="play_btn">Play</Button>
                </form>
                <div className="card" style={{ background: `linear-gradient(to left top, #ffffff52, black), url(${image})` }}>
                    <div className="img-div">
                        <img src={image} alt={pname} />
                    </div>
                    <h1>You Select <span style={style}>{pname}</span></h1>
                    <h3>{pname} has <span style={style}>{moves}</span> moves</h3>
                </div>
            </div>
        </div>
    )
}

export default Pokemon;