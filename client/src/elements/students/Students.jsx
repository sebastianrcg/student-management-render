import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './students.css';

const Students = () => {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true);

    useEffect(() => {
        if (deleted) {
            setDeleted(false)

            axios.get('/students')
                .then((res) => {
                    setData(res.data);
                }).catch((err) => console.log(err))
        }
    }, [deleted])

    const handleDelete = (id) => {
        axios.delete(`/delete_student/${id}`).then((res) => {
            console.log(res);
            setDeleted(true)
        }).catch((err) => { console.log(err) })
    }
    return (
        <div className="container1 bg-primary dvh-100 dvw-100">
            <h2 className="students-title">Students</h2>
            <div className="d-flex justify-content-end add-student">
                <Link className="btn btn-success" to="/create">Add Student</Link>
            </div>
            <table className="students-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Status</th>
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
                                <td>{student.status ? "Active" : "Inactive"}</td>
                                <td className="actions">
                                    <Link className="btn mx-2 btn-success" to={`/read/${student.id}`}>Read</Link>
                                    <Link className="btn mx-2 btn-secondary" to={`/edit/${student.id}`}>Edit</Link>
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

export default Students;