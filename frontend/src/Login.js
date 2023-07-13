import React, { useState } from "react"
import { Link } from "react-router-dom"

function Login () {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleInput = (event) => {
        setValues({...values, [event.target.name]: [event.target.value]})
    }

    return (
        <div className="formBox">
            <div className="bg-white p-3 rounded w-25">
                <form action="http://localhost:5001/login" method="POST">
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter Email" name="email"
                        onChange={handleInput} className="form-control rounded-0"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" name="password"
                        onChange={handleInput} className="form-control rounded-0"/>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Log in</button>
                    <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login