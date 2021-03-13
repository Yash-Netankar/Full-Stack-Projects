import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Pokemon from "../game/Pokemon";
import MainMenu from "./MainMenu";
import "../styles/main.css";

const App = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact render={() => <MainMenu />} />
            <Route path="/game/:name/:room" exact render={() => <Pokemon />} />
        </BrowserRouter>
    )
}

export default App
