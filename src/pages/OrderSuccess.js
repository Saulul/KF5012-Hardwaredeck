//React Components
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//CSS
import '../css/style.css';

export default function OrderSuccess()
{
    const navigate = useNavigate();
    //One page render
    useEffect(() => {
        document.title = "Hardwaredeck | Payment Success";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        //check if user has logged in
        const getUser = localStorage.getItem('user');
        if(!getUser)
        {
            navigate('/');
        }
        else
        {
            setTimeout(() => navigate('/shop'), 5000);
        }
    }, [navigate]);

    return (
        <>
            <main>
                <section className='success'>
                    <h1>Order Success</h1>
                    <p>Please wait 5 seconds, to continue shopping</p>
                </section>
            </main>
        </>
    );
}
