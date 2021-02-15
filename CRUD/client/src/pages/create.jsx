import React, { useState } from 'react';
import axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
// modal
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Create = ({ title }) => {
    const [info, setInfo] = useState({
        name: "",
        email: "",
        phone: ""
    });

    // modal states
    const [open, setOpen] = useState(false);
    const [modalTitle, setmodalTitle] = useState("Invalid Input");
    const listStyle = {
        listStyle: "none"
    }

    const Submit = (e) => {
        let { name, value } = e.target;
        setInfo(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const Validate = () => {
        let nameRegExp = /^[a-zA-Z\s?]{5,30}$/;
        let emailRegExp = /^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.{1}[a-zA-Z\.]{2,})$/;
        let phoneRegExp = /^\d{10}$/;
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

    const Create = async () => {
        let bool = Validate();
        if (bool) {
            let result = await axios.post("http://localhost:3001/user/create", { info });
        }
        else {
            setOpen(true);
        }
    }

    return (
        <div className="register">
            <h1>{title}</h1>
            <form id="register_form" autoComplete="off">
                <div className="ip_div">
                    <label htmlFor="uname">Enter Username</label>
                    <input type="text" id="uname" name="name" value={info.name} onChange={Submit} />
                </div>
                <div className="ip_div">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" autoComplete="false" value={info.email} onChange={Submit} />
                </div>
                <div className="ip_div">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" name="phone" autoComplete="false" value={info.phone} onChange={Submit} />
                </div>
                <Button onClick={Create} startIcon={<SaveIcon />}>
                    Create
                </Button>
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
                    <h3>Please Check</h3>
                    <li style={listStyle}>🔴Length of NAME must be between 5 to 25 characters!!</li>
                    <li style={listStyle}>🔴EMAIL must be Valid Email!!</li>
                    <li style={listStyle}>🔴PHONE NUMBER must be Valid Including 10 digits!!</li>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} color="primary" autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Create
