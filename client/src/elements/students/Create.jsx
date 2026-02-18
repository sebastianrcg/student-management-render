import React from "react";
import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './create.css';


function Create() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        age: "",
        gender: ""
    })

    const navigate = useNavigate();

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setValues(prev=> ({
            ...prev, [name]: value
        }          
        ))
    }

    function handleSubmit(event){
        event.preventDefault();

        axios.post('/add_student', values).then((res)=> {
            
            navigate('/');
            console.log(res);
        }).catch((err)=> console.log(err));

    }

    return(
        <div className="container-fluid dvw-100 bg-primary vh-100 content">
            <div> 
                <h2 className="section-title">Add Student</h2>
                <div className="d-flex justify-content-end"> 
                    <Link to="/" className="btn btn-success btn-students">Students</Link>
                </div>
                <form className="create-form" onSubmit={handleSubmit}>
                    <div className="form-group my-3">
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" value={values.name} onChange={handleChange}/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="email">Email: </label>
                        <input type="text" name="email" value={values.email} onChange={handleChange}/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="age">Age: </label>
                        <input type="number" name="age" value={values.age} onChange={handleChange}/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="gender">Gender: </label>
                        <input type="text" name="gender" value={values.gender} onChange={handleChange}/>
                    </div>
                    <div className="form-group my-3">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Create;