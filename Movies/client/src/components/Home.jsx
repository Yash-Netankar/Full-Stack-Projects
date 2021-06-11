import React, { useState, useEffect } from 'react';
import axios from "axios";
import moviesList from "../data";
import Card from "./Card";

const Home = () => {

    const [search_term, setSearch_term] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getData = async () => {
            await axios.get("http://localhost:3001/movie")
                .then(res => setMovies(res.data))
                .catch(err => console.log(err));
        }
        getData();
    }, []);

    // delete a movie
    const DeleteMovie = async (id) => {
        const del = window.confirm("Are You sure you want to delete this movie");
        if (del) {
            await axios.delete(`http://localhost:3001/movie/delete/${id}`)
                .then(res => setMovies(res.data))
                .catch(err => console.log(err));
        }
    }

    return (
        <main className="homePage">
            <div className="search_box">
                <input type="text" className="search_ip" placeholder="Search For a Movie" value={search_term} onChange={(e) => setSearch_term(e.target.value)} />
            </div>
            <div className="list_of_movies">
                {
                    movies.map((obj, index) => {
                        return <Card info={obj} key={index} DeleteMovie={DeleteMovie} />
                    })
                }
            </div>
        </main>
    )
}

export default Home
