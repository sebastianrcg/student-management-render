import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true);

    useEffect(() => {

        document.title = "Student Management";
        if (deleted) {
            setDeleted(false)

            axios.get('/students')
                .then((res) => {
                    setData(res.data);
                }).catch((err) => console.log(err))
        }
    }, [deleted])

    const handleDelete = (id) => {
        axios.delete(`/delete_user/${id}`).then((res) => {
            console.log(res);
            setDeleted(true)
        }).catch((err) => { console.log(err) })
    }
    return (
        <div className="container-fluid bg-primary vh-100 vw-100">
            <h3>Students</h3>
            <div className="d-flex justify-content-end">
                <Link className="btn btn-success" to="/create">Add Student</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((student) => {
                            return (<tr>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>
                                <td>{student.gender}</td>
                                <td>
                                    <Link className="btn mx-2 btn-success" to={`/read/${student.id}`}>Read</Link>
                                    <Link className="btn mx-2 btn-success" to={`/edit/${student.id}`}>Edit</Link>
                                    <button className="btn mx-2 btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Home;