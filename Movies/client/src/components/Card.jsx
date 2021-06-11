import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import image_not_found from "../styles/images/image-not-found.png";

const Card = ({ info, DeleteMovie }) => {

    const [movies, setMovies] = useState([]);

    const release_date = info.mrelease.slice(0, 4);

    // fetching movie data
    useEffect(() => {
        const getMoviesWithName = async () => {
            await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4e2c21912c8fe072b41307bb095128be&query=${info.mname}`)
                .then(res => setMovies(res.data.results))
                .catch(err => console.log(err));
        }
        getMoviesWithName();
    }, []);

    return (
        <div className="card">
            <div className="img_div">
                {/* searching of movie image */}
                {movies.map((movie, i) => {
                    try {

                        return (movie.release_date.slice(0, 4) == release_date) && <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} className="movie_img" key={i} />
                    }
                    catch (err) {
                        console.log("Image Not Found");
                    }

                    // OLD LOGIC (not working properly)
                    {/* (movie.release_date == release_date) && setNewDate(movie.release_date.slice(0, 4));
                    return (newDate.includes(release_date)) &&
                        (<img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} className="movie_img" key={i} />) */}
                }
                )}
            </div>
            <div className="movie_info">
                <h2 className="movie_name">{info.mname}</h2>
                <h3 className="movie_lang">Language: {info.mlanguage}</h3>
                <h3 className="movie_release">Released On: {release_date}</h3>
                <h3 className="movie_budjet">Budget: {info.mbudget} CR.</h3>
                <h3 className="movie_collection">Collection: {info.mcollection} CR.</h3>
            </div>
            <div className="actions_div">
                <Button className="btn del-btn" onClick={() => DeleteMovie(info._id)}>
                    <DeleteIcon />
                </Button>
                <NavLink to={`/edit/${info._id}`}>
                    <Button className="btn edit-btn"><EditIcon /></Button>
                </NavLink>
            </div>
        </div>
    )
}

export default Card

//image-not-found isn't used cuz useEffect is runing multiple times which causes image also to render multiple times.
