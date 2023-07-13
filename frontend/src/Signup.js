import React, { useState } from "react"
import { Link } from "react-router-dom"

function Signup (){

    const [values, setValues] = useState({
        name: '', 
        email: '',
        password: ''
    })

    const [errors] = useState({});

    const handleInput = (event) => {
        setValues({...values, [event.target.name]: [event.target.value]})
    }

    return (
        <div className="formBox">
            <div className="bg-white p-3 rounded w-25">
                <form action="http://localhost:5001/signup" method="POST">
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="name" placeholder="Enter Name" name="name"
                        onChange={handleInput} className="form-control rounded-0" />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter Email" name="email"
                        onChange={handleInput} className="form-control rounded-0" />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" name="password"
                        onChange={handleInput} className="form-control rounded-0" />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Sign Up</button>
                    <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Log In</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup