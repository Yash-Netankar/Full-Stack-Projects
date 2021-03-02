import React from 'react';
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
const UserInfo = (props) => {
    return (
        <div className={props.uinfo ? "user_info show" : "user_info"}>
            <Button onClick={() => props.setUinfo(false)}><CloseIcon /></Button>
            <h1>Built By: Yash Netankar</h1>
            <h1>Pune</h1>
        </div>
    )
}

export default UserInfo
