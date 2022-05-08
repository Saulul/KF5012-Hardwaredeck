//React Components
import React from 'react';

//CSS 
import '../css/style.css';

//Video

//images
import banner_1 from '../images/banner-1.jpg';
import banner_2 from '../images/banner-2.jpg';


export default function Banners()
{
    return (
        <>
            <section className='bannerSection'>
                <div className='bannersSectionInnerContainer'>
                    <div className='banners'>
                        <div className='banner'>
                            <img alt="banner" src={banner_1}/>
                        </div>
                        <div className='banner'>
                            <img alt="banner" src={banner_2}/>
                        </div>
                    </div>
                    <div className='video'><strong>Video Placeholder</strong></div>
                </div>

            </section>
        </>
    );
}