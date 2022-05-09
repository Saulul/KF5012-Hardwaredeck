//React Components
import React from 'react';

//CSS 
import '../css/style.css';

//Video
import video from '../videos/video.mp4'

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
                    <video src={video} controls/>
                </div>

            </section>
        </>
    );
}