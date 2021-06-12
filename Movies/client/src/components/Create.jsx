import React, { useState, useEffect } from 'react';
import axios from "axios";
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';

const Create = () => {
    const history = useHistory();

    const [movieInfo, setMovieInfo] = useState({
        mname: "",
        mlanguage: "",
        mrelease: "",
        mbudget: 0,
        mcollection: 0
    });


    // managing states
    const Input = (e) => {
        let { name, value } = e.target;
        setMovieInfo(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // submit
    const SubmitForm = async (e) => {
        e.preventDefault();
        // sending movie to backend
        await axios.post("http://localhost:3001/movie/add", movieInfo).
            then(res => {
                window.alert(res.data);
                history.push("/");
            }).
            catch(err => console.log(err));
    }

    return (
        <div className="CreatePage">
            <div className="form_div">
                <h1>Add a Movie</h1>
                {/* form */}
                <form autoComplete="off" onSubmit={SubmitForm}>
                    {/* movie name */}
                    <input type="text" placeholder="Movie Name" name="mname" value={movieInfo.mname} onChange={Input} required />
                    {/* movie language */}
                    <input type="text" placeholder="Movie Language" name="mlanguage" value={movieInfo.mlanguage} onChange={Input} required />
                    {/* movie Release date */}
                    <input type="Date" placeholder="Release Date" name="mrelease" value={movieInfo.mrelease} onChange={Input} required />
                    {/* economy of movie */}
                    <div className="money">
                        <input type="number" placeholder="Movie Budget(rs/-)" name="mbudget" value={movieInfo.mbudget} onChange={Input} required />
                        <input type="number" placeholder="Movie Collection(rs/-)" name="mcollection" value={movieInfo.mcollection} onChange={Input} required />
                    </div>
                    <Button className="submit-btn" type="submit">Add Movie</Button>
                </form>
            </div>
        </div>
    )
}

export default Create
