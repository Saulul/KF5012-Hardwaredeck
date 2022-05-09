//React Components
import React from 'react';

//CSS 
import '../css/style.css';

//Images
import img from '../images/motherboard.jpg';

//font Awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';



export default function CartItem({item, changeQuantity, removeItem})
{
    return (
        <>
            <div className='cartItem'>
                <div className='cartImg'>
                    <img src={img} alt='placeholder'/>
                </div>

                <div className='cartName'>
                    <strong>{item.name}</strong>
                </div>

                <div className='cartPrice'>
                    <i>£{item.price}</i>
                </div>

                <div className='cartQuantity'>Qty: 
                    <input id='quantity' onChange={(event) => changeQuantity(item.id, event.target.value)} defaultValue={item.quantity}/>
                </div>

                <div className='cartRemove'>
                    <FontAwesomeIcon icon={faXmark} onClick={() => removeItem(item.id)}/>
                </div>
            </div>
        </>
    );
}