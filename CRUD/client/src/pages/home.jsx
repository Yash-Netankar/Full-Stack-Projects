import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from './Row';

const Home = () => {
    const [studData, setStudData] = useState([]);

    let getData = async () => {
        let data = await axios.get("http://localhost:3001/user/read");
        setStudData(data.data);
    }

    useEffect(() => {
        getData();
    }, [studData]);

    const DeleteFunc = async (id) => {
        let data = await axios.delete(`http://localhost:3001/user/delete/?id=${id}`);
        getData();
    }

    return (
        <>
            <div className="table_div">
                <h1>STUDENTS INFO</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th className="icons_row">Update/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studData.length >= 1 && studData.map((v, i) => <Row key={i} value={v} deletef={(id) => DeleteFunc(id)} />)
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home
