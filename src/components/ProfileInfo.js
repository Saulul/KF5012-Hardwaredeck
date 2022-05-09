//React Components
import React from 'react';

//CSS 
import '../css/style.css';

//Images
import profileImg from '../images/profileImg.png';



export default function ProfileInfo({user})
{
    return (
        <>
            <section className='accountSection userInfo'>
                <h2>My Details</h2>
                <img className='profileImg' src={profileImg} alt='profile'/>
                <div className='userText'>
                    <p><strong>{user.user.firstName} {user.user.lastName}</strong></p>
                    <p><i>Username </i> {user.user.username}</p>
                    <p><i>Email: </i> {user.user.email}</p>
                </div>
            </section>
        </>
    );
}