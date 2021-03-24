import { useState } from 'react';
import axios from 'axios';

const initialValues = {
    username: '',
    password: ''
};


export default function Login(props){
    const [creds, setCreds] = useState(initialValues);

    const login = e => {
        e.preventDefault();
        console.log(creds);
        axios.post('http://localhost:5000/api/login', creds)
        .then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.payload));
            props.history.push('/friends');
        })
    };

    const onChange = event => {
        setCreds(
            {...creds, [event.target.name]: event.target.value}
            );
    };

    return(
        <div>
            <form onSubmit={login}>
                <input 
                type=''
                value={creds.username}
                name='username'
                onChange={onChange} />

                <input 
                type=''
                value={creds.password}
                name='password'
                onChange={onChange} />
                <button>Login</button>
            </form>
        </div>
    )
}