//React Components
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

//CSS 
import '../css/style.css';

//Page Components
import MenuBtn from './MenuBtn';

//Images
import logo from '../images/logoA.png';

//font Awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';



export default function Header({displayNavMethod, user, setUser})
{

    const navigate = useNavigate();
    //Logout
    function logout()
    {
        setUser();
        localStorage.clear();
        navigate('/');
    }

    return (
        <>
            <header>
                <div className='headerInner'>
                    <Link to='/' className='logo'>
                        <img src={logo} alt='Logo'/>
                    </Link>

                    <div className='icons'>
                        {
                            user
                            ?
                            <div className='icon dropdownContainer'>
                                <FontAwesomeIcon icon={faUser}/>

                                <div className='profileDropdownContent'>
                                    <div className='dropdownPointer'></div>
                                    <ul>
                                        <li><Link to={'/my_account/' + user.user.firstName + '_' + user.user.lastName}>Your account</Link></li>
                                        <hr/>
                                        <li onClick={logout}>Logout</li>
                                    </ul>
                                </div>
                            </div>
                            :
                            <Link to='/signin' className='icon'>
                                <FontAwesomeIcon icon={faUser}/>
                            </Link>
                        }

                        <Link to={user ? '/cart' : '/signin'} className='icon'>
                            <FontAwesomeIcon icon={faCartShopping}/>
                        </Link>

                        <MenuBtn displayNavMethod={displayNavMethod}/>
                    </div>
                </div>

                <div className='spacer headerBorder'></div>

            </header>
        </>
    );
}