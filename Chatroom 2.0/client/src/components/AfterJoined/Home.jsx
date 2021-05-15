import React from 'react';
import { withRouter } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <center>
                <marquee direction="right">
                    <h1>Welcome User</h1>
                </marquee>
            </center>
        </div>
    )
}

export default withRouter(Home)
