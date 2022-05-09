//React Components
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import axios from 'axios';

//CSS 
import '../css/style.css';

//Images
import logo from '../images/logoA.png';

//font Awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';

//Page components
import Loader from './Loader';


export default function NavMenu({displayNav, displayNavMethod, user, setUser, categoryDropdown})
{
    const [categories, setCategories] = useState();

    useEffect(() => {
        //fetch products product
        axios.get('http://localhost:1337/api/site-categories')
        .then(res => {
            setCategories(res.data.data);
       })
    }, [])



    const navigate = useNavigate();
    //Logout
    function logout()
    {
        setUser();
        localStorage.clear();
        navigate('/');
    }



    /*
        Function to split the products name then put back
        together with no breaks to be put in the URL
    */
    function categorySplit(cat)
    {
        const splitCat = cat.split(' ');
        let urlName = splitCat[0];
        
        if(splitCat.length > 1)
        {
            for(let i=1; i<splitCat.length; i++)
            {
                urlName += '_';
                urlName += splitCat[i];
            }
        }
        return urlName;
    }



    return (
        <>

            {displayNav && <div className='sidebarBackground' onClick={displayNavMethod}></div>}

            <nav id='navBar' className={displayNav ? 'activeSidebar' : ''}>
                <div className='innerNav'>
                    <Link to='/'>
                        <img src={logo} className='pageLogo' alt='Logo'/>
                    </Link>
                    <ul>
                        <li><NavLink activeClassName="active" to="/">Home</NavLink></li>
                        
                        <hr/>
                        <li>
                            <div className='navButton shopButton' onClick={categoryDropdown}>
                                Shop<FontAwesomeIcon id='shopBtnArrow' icon={faCaretDown}/>
                            </div>
                            <div className='categoryDropdown'>
                                <ul>
                                    <li><Link to="/shop" state={categories}>All</Link></li>
                                    {
                                        categories
                                        ?
                                        categories.map(category => {
                                            return <li key={category.attributes.CategoryName}><Link to={"/shop/cat/" + categorySplit(category.attributes.CategoryName)}>{category.attributes.CategoryName}</Link></li>
                                        })
                                        :
                                        <Loader/>
                                    }
                                </ul>
                            </div>
                        </li>
                        
                        <hr/>
                        <li><NavLink activeClassName="active" to="/blogs">Blog</NavLink></li>
                        
                        <hr/>
                        <li>
                            {
                                user
                                ?
                                <NavLink activeClassName="active" to={"/my_account/" + user.user.firstName + "_" + user.user.lastName}>Your Account</NavLink>
                                :
                                <NavLink activeClassName="active" to='/signin'>Sign in</NavLink>
                            }
                        </li>
                        {
                            user
                            &&
                            <>
                                <hr/>
                                <li><div className="navButton" onClick={logout}>Log out</div></li>
                            </>
                        }
                    </ul>
                </div>

                <div className='spacer2 navBorder'></div>

            </nav>
        </>
    );
}