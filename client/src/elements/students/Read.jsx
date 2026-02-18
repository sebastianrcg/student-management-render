import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import './read.css';

function Read(){
    const [data, setData] = useState([]);
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`/get_student/${id}`)
        .then((res)=>{
            setData(res.data);
        }).catch((err)=> console.log(err))
    }, [id])
    return(
        <div className="container-fluid dvw-100 vh-100 bg-primary content">
            <h2 className="student-title">User: {id}</h2>
            <Link to="/" className="btn btn-success back-btn">Back</Link>
            {
                data.map((student)=>{
                    return (
                        <ul className="list-group student-card">
                            <li className="list-group-item">
                                <b>ID: </b>
                                {student["id"]}
                            </li>
                            <li className="list-group-item">
                                <b>Name: </b>
                                {student["name"]}
                            </li>
                            <li className="list-group-item">
                                <b>Email: </b>
                                {student["email"]}
                            </li>
                            <li className="list-group-item">
                                <b>Age: </b>
                                {student["age"]}
                            </li>
                            <li className="list-group-item">
                                <b>Gender: </b>
                                {student["gender"]}
                            </li>
                            <li className="list-group-item">
                                <b>Status: </b>
                                {student["status"] ? "Active" : "Inactive"}

                            </li>
                        </ul>
                    )
                })
            }
            
        </div>
    )
}

export default Read;