import React from 'react'
import Button from '@material-ui/core/Button';
const JoinGame = ({ showTabs, Validate }) => {
    return (
        <form onSubmit={Validate} className={showTabs.tab2 ? "tab2 show" : "tab2"} autoComplete="off">
            <p>Enter Your Game ID here to join the game</p>
            <p className="error_div_join error"></p>
            <input type="text" placeholder="Enter Your NickName" className="input_player" required />
            <input type="text" placeholder="Enter Room Name" className="input_room input_room_join" required />
            <Button type="submit" className="join">Join</Button>
        </form>
    )
}

export default JoinGame
