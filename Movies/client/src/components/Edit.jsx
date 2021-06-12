import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

const Create = () => {

    const { id } = useParams("id");
    const history = useHistory();

    const [movieInfo, setMovieInfo] = useState({
        mname: "",
        mlanguage: "",
        mrelease: "",
        mbudget: 0,
        mcollection: 0
    });

    useEffect(() => {
        const getMovieById = async () => {
            await axios.get(`http://localhost:3001/movie/${id}`)
                .then(res => setMovieInfo(res.data))
                .catch(err => console.log(err))
        }
        getMovieById();
    }, []);

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
        await axios.put("http://localhost:3001/movie/update", movieInfo)
            .then(res => {
                window.alert(res.data);
                history.push("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="EditPage">
            <div className="form_div">
                <h1>Update Your Movie</h1>
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
                    <Button className="submit-btn" type="submit">Update Movie</Button>
                </form>
            </div>
        </div>
    )
}

export default Create
