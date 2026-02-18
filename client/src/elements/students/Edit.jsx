import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./edit.css";

const Edit = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();


    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/get_student/${id}`)
            .then((res) => {
                setData(res.data);
                console.log(res)
            }).catch((err) => console.log(err))
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prev => ([{
            ...prev[0], [name]: value
        }]
        ))
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios.put(`/update_student/${id}`, data[0]).then((res) => {

            navigate('/');
            console.log(res);
        }).catch((err) => console.log(err));

    }

    return (
        <div className="container-fluid dvw-100 vh-100 bg-primary content">
            <h2 className="student-id">User {id}</h2>
            <Link to="/" className="btn btn-success back-btn">Back</Link>
            {
                data.map((student) => {
                    return (
                        <form className="edit-form"onSubmit={handleSubmit}>
                            <div className="form-group my-3">
                                <label htmlFor="name">Name:     </label>
                                
                                <input type="text" name="name" value={data[0].name} onChange={handleChange} />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="email">Email: </label>
                                
                                <input type="text" name="email" value={data[0].email} onChange={handleChange} />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="age">Age: </label>
                                
                                <input type="number" name="age" value={data[0]["age"]} onChange={handleChange} />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="gender">Gender: </label>
                                
                                <input type="text" name="gender" value={data[0]["gender"]} onChange={handleChange} />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="status">Status: </label>
                                <select name="status" value={data[0]["status"]} onChange={handleChange}>
                                    <option value={true}>Active</option>
                                    <option value={false}>Inactive</option>
                                </select>
                            </div>
                            <div className="form-group my-3">
                                <button type="submit" className="btn btn-success">Save</button>
                            </div>
                        </form>
                     )
                })
            } 

        </div>
    )
}

export default Edit;