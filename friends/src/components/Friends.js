import axios from 'axios';
import { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initFriendValues = {
    name: '',
    age: '',
    email: ''
}


export default function Friends(){
    const [friends, setFriends] = useState([]);
    const [addFriend, setAddFriend] = useState(false);
    const [newFriend, setNewFriend] = useState(initFriendValues);

    useEffect(() => {
        axiosWithAuth().get('/api/friends/')
        .then(res => {
            setFriends(res.data);
        })
    }, []);

    const handleChange = e => {
        setNewFriend({...newFriend, [e.target.name]: e.target.value})
    }

    const submitFriend = e => {
        e.preventDefault();
        console.log('submitFriends triggered')
        axiosWithAuth().post('/api/friends/', newFriend)
        .then(res => {
            setFriends(res.data);
        })
    };

    return(
        <div>
            {
                friends.map(friend => {
                    return (
                        <div>
                            <p>Name: {friend.name}</p> <br />
                            <p>Age: {friend.age}</p> <br />
                            <p>Email: {friend.email}</p>
                        </div>
                    )
                })
            }
            {
                addFriend && <form onSubmit={submitFriend}>
                    <input
                    type='text'
                    name='name'
                    value={newFriend.name}
                    onChange={handleChange}></input>
                    <input
                    type='text'
                    name='age'
                    value={newFriend.age}
                    onChange={handleChange}></input>
                    <input
                    type='email'
                    name='email'
                    value={newFriend.email}
                    onChange={handleChange}></input>
                    <button>Submit</button>
                </form>
            }
            <button onClick={() => setAddFriend(true)}>Add New Friend</button>
        </div>
    )
}