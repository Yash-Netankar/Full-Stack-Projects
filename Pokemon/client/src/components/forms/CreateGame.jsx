import React from 'react'
import Button from '@material-ui/core/Button';
const CreateGame = ({ showTabs, Validate }) => {
    return (
        <form onSubmit={Validate} className={showTabs.tab1 ? "tab1 show" : "tab1"} autoComplete="off">
            <p>NOTE: Only 7 players can join one Gameroom.</p>
            <p className="error_div_create error"></p>
            <input type="text" placeholder="Create Room Name" className="input_room" min="2" max="7" required />
            <input type="Number" placeholder="Enter Number of players joining" className="input_player_create" min="2" max="7" required />
            <Button type="submit" className="create">Create</Button>
            <p className="gameID"></p>
        </form>
    )
}

export default CreateGame
