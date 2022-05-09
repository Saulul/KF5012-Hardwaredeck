//React Components
import React from 'react';

//CSS 
import '../css/style.css';

//Images
import img from '../images/motherboard.jpg';



export default function CheckoutItem({item})
{
    return (
        <>
            <div className='cartItem'>
                <div className='cartImg'>
                    <img src={item.attributes.ProductImage.data.attributes.formats.medium.URL} alt='test'/>
                </div>

                <div className='cartName'>
                    <strong>{item.attributes.ProductName}</strong>
                </div>

                <div className='cartPrice'><i>£{item.attributes.ProductPrice}</i></div>

                <div className='cartQuantity'>
                    Qty: {item.quantity}
                </div>
            </div>
        </>
    );
}