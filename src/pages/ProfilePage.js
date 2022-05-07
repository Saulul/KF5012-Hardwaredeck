//React Components
import React, {useEffect, useState} from 'react';

//CSS 
import '../css/style.css';

//Page Components
import ProfileInfo from '../components/ProfileInfo';
import Orders from '../components/ProfileOrders';
import DeliveryAddress from '../components/DeliveryAddress';
import UpdateProfile from '../components/UpdateProfile'
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import YourBlogs from '../components/UserBlogs';
import Loader from '../components/Loader';


export default function Profile() 
{
    const [user, setUser] = useState();



    //upon first render
    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        //check if user has logged in
        const getUser = localStorage.getItem('user');
        if(getUser)
        {
            const loggedInUser = JSON.parse(getUser);
            setUser(loggedInUser);
        }
    }, []);


    //when user state is updated
    useEffect(() => {
        if(user)
        {
            document.title = "Your Account | " + user.fname + " " + user.lname;
        }
        else
        {
            document.title = "Your Account";
        }
    }, [user]);



    return (
        <>
            <main className='accountPage'>
                <h1>My Account</h1>
                <div className='itemContainer'>
                    {
                        user
                        ?
                        <>
                            <ProfileInfo user={user}/>
                            {
                                user.type === "admin"
                                ?
                                <>
                                    <AddProduct/>
                                    <EditProduct/>
                                </>
                                :
                                null
                            }
                            <Orders/>
                            <DeliveryAddress/>
                            <YourBlogs/>
                            <UpdateProfile/>
                        </>
                        :
                        <Loader/>
                    }
                </div>
            </main>
        </>
    );
}