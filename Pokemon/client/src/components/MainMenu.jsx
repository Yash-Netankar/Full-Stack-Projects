import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CreateGame from "./forms/CreateGame";
import JoinGame from "./forms/JoinGame";

import io from "socket.io-client";
const socket = io.connect("/");

let error_div_create, error_div_join, input_room, input_player, input_player_create, input_room_join;

const MainMenu = () => {
    const history = useHistory();
    const [no_of_players, setNo_of_players] = useState(2);

    useEffect(() => {
        input_room = document.querySelector(".input_room");
        input_player_create = document.querySelector(".input_player_create");
        error_div_create = document.querySelector(".error_div_create");
        error_div_create.innerText = ""

        input_room_join = document.querySelector(".input_room_join");
        input_player = document.querySelector(".input_player");
        error_div_join = document.querySelector(".error_div_join");
        error_div_join.innerText = "";

        socket.on("room_created_error", msg => {
            error_div_create.innerText = `${msg.msg}`;
        });
        socket.on("room_joined_error", msg => {
            error_div_join.innerText = msg.msg;
        })
    }, [])


    /**************TOOGLING TABS*******************/
    const [showTabs, setShowTabs] = useState({
        tab1: true,
        tab2: false
    });

    /********VALIDATING INFORMATION****************/
    //validating create room info
    const ValidateCreateInfo = (e) => {
        e.preventDefault();
        let room_regexp = /^([a-zA-Z]{3,12})\d{0,4}$/;
        if (input_room.value.length <= 12 && input_room.value.length >= 3) {
            if (room_regexp.test(input_room.value)) {
                socket.emit("create_room", { room: input_room.value, players: input_player_create.value });
                socket.on("room_created", (obj) => {
                    if (obj.room) {
                        error_div_create.innerText = `Game Room '${obj.room}' 
                        Created`;
                        setNo_of_players(obj.players);
                    }
                })
            }
            else
                error_div_create.innerText = "Enter A Room name that Starts with alphabets & can only have 4 digits!!"
        }
        else
            error_div_create.innerText = "Room name should have atleast 3 characters & atmost 12 characters!!"
    }
    //validating join room info
    const ValidateJoinInfo = (e) => {
        e.preventDefault();
        let name_regexp = /^([a-zA-Z]){3,12}([@\s-_.]?)\d{0,2}$/;
        let room_regexp = /^([a-zA-Z]{3,12})\d{0,4}$/;
        if (input_player.value.length <= 12 && input_player.value.length >= 3) {
            if (name_regexp.test(input_player.value)) {
                if (room_regexp.test(input_room_join.value)) {
                    socket.emit("join_room", { room: input_room_join.value, name: input_player.value, players: no_of_players })
                    socket.on("room_joined", (obj) => {
                        if (obj.joined) {
                            error_div_join.innerText = "Joined!!"
                            history.push(`/game/${input_player.value}/${input_room_join.value}`);
                        }
                        else {
                            history.push("/");
                        }
                    })
                }
                else
                    error_div_join.innerText = "Invalid Room Name!! Check what name you've got and correct."
            }
            else
                error_div_join.innerText = "Name should begin with Alphabets, can have 2 digits & only '@', '-'m, '_' as spacial characters.";
        }
        else
            error_div_join.innerText = "Name should have atleast 3 characters & atmost 12 characters!!"
    }

    /**********JSX*************/
    return (
        <div className="menu_container">
            <div className="tabs_div">
                {/* head */}
                <header className="tab_head">
                    <Button className="head_btn create_btn" onClick={() => { setShowTabs({ tab1: true, tab2: false }) }}>Create Game
                    </Button>
                    <Button className="head_btn join_btn" onClick={() => { setShowTabs({ tab1: false, tab2: true }) }}>Join Game
                    </Button>
                </header>
                <CreateGame showTabs={showTabs} Validate={ValidateCreateInfo} />
                <JoinGame showTabs={showTabs} Validate={ValidateJoinInfo} />
            </div>
        </div>
    )
}

export default MainMenu
