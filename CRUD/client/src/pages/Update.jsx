import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// modal
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Update = () => {
    // url parameters
    let { id, name, email, phone } = useParams();
    let uid = id > 0 ? id : 1;
    let uname = name !== "" ? name : "";
    let uemail = email != "" ? email : "";
    let uphone = phone != "" ? phone : "";
    // history
    let history = useHistory();

    // modal states
    const [open, setOpen] = useState(false);
    const [modalTitle, setmodalTitle] = useState("Invalid Input");

    // input state
    const [info, setInfo] = useState({
        id: parseInt(uid),
        name: uname,
        email: uemail,
        phone: uphone
    })

    const listStyle = {
        listStyle: "none"
    }
    const Input = (e) => {
        let { name, value } = e.target;
        setInfo(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const Validate = () => {
        let idRegExp = /^[1-9]+$/;
        let nameRegExp = /^[a-zA-Z\s?]{5,30}$/;
        let emailRegExp = /^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.{1}[a-zA-Z\.]{2,})$/;
        let phoneRegExp = /^\d{10}$/;
        if (idRegExp.test(info.id)) {
            if (nameRegExp.test(info.name)) {
                if (emailRegExp.test(info.email)) {
                    if (phoneRegExp.test(info.phone)) {
                        return true;
                    }
                    else {
                        setmodalTitle("Invalid Phone Number");
                        return false;
                    }
                }
                else {
                    setmodalTitle("Invalid Email");
                    return false;
                }
            }
            else {
                setmodalTitle("Invalid Name Input");
                return false;
            }
        }
        else {
            setmodalTitle("Check Student ID")
            return false;
        }
    }

    const Submit = async () => {
        let bool = Validate();
        if (bool) {
            await axios.patch("http://localhost:3001/user/update", { info });
            history.push("/");
        }
        else {
            setOpen(true);
        }
    }

    return (
        <div className="update_div">
            <h1>Update</h1>
            <form autoComplete="off">
                <TextField id="standard-basic" label="Student ID" name="id" onChange={Input} value={info.id} />
                <TextField id="standard-basic" label="Name" name="name" onChange={Input} value={info.name} />
                <TextField id="standard-basic" label="Email" name="email" onChange={Input} value={info.email} />
                <TextField id="standard-basic" label="Phone" name="phone" onChange={Input} value={info.phone} />
                <Button variant="contained" color="primary" onClick={Submit}>Update</Button>
            </form>
            {/* ERROR MODAL*/}
            <Dialog
                className="modal"
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{modalTitle}</DialogTitle>
                <DialogContent>
                    <>
                        <h3>Please Check</h3>
                        <li style={listStyle}>🔴Enter Correct Student ID!!</li>
                        <li style={listStyle}>🔴Length of NAME must be between 5 to 25 characters!!</li>
                        <li style={listStyle}>🔴EMAIL must be Valid Email!!</li>
                        <li style={listStyle}>🔴PHONE NUMBER must be Valid Including 10 digits!!</li>
                    </>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} color="primary" autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Update
