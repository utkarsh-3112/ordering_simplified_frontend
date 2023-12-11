import React, {useState} from 'react'
import './CSS/Signup.css'
import axios from "axios";
import {Link} from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(confirmPassword !== password) {
            alert('Passwords do not match')
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/users/signup', {
                name,
                number,
                email,
                password,
            });
            console.log(response)
            if(response.data.err){
                alert(response.data.err)
                return;
            }
            console.log('Account Created');
            // Perform any additional actions, such as redirecting to another page
        } catch (error) {
            console.error('Error during Signup:', error);
        }
    };

    return (
        <div className='signup'>
            <div className="signup-container">
                <h1>Sign Up</h1>
                <div>
                    <form method='post' className="signup-fields" onSubmit={handleSubmit}>
                        <label className='form-label'>Name</label>
                        <input type="text" value={name} placeholder="abcd@example.com" onChange={(e) => setName(e.target.value)} />
                        <label className='form-label'>Email</label>
                        <input type="text" value={email} placeholder="abcd@example.com" onChange={(e) => setEmail(e.target.value)} />
                        <label className='form-label'>Mobile No.</label>
                        <input type="text" value={number} placeholder="abcd@example.com" onChange={(e) => setNumber(e.target.value)} />
                        <label className='form-label'>Password</label>
                        <input type="password" value={password} placeholder="abcd@43" onChange={(e) => setPassword(e.target.value)} />
                        <label className='form-label'>Confirm Password</label>
                        <input type="password" value={confirmPassword} placeholder="abcd@43" onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type="submit">Login</button>
                        <div className="signup-agree">
                            <input type="checkbox" name='' id='' required />
                            <p>By continuing, i agree to the terms of use & privacy policy.</p>
                        </div>
                    </form>
                </div>
                <p className="signup-login">Already have an account?<Link to='/login'><span>Login</span></Link></p>
            </div>
        </div>
    )
}

export default Signup
