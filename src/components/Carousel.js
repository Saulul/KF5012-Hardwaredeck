//React Components
import React from 'react';

//CSS 
import '../css/style.css';

//Bootstrap
import Carousel from 'react-bootstrap/Carousel';

//Images
import carousel_1 from '../images/carousel-1.jpg';
import carousel_2 from '../images/carousel-2.jpg';
import carousel_3 from '../images/carousel-3.jpg';
import carousel_4 from '../images/carousel-1-mob.jpg';
import carousel_5 from '../images/carousel-2-mob.jpg';
import carousel_6 from '../images/carousel-3-mob.jpg';



export default function CarouselImages()
{
    return (
        <>
            <section className='carouselBorder imageCarousel'>
                <Carousel>
                    <Carousel.Item>
                        <picture>
                            <source media="(min-width: 768px)" srcSet={carousel_1} />
                            <img src={carousel_4} className="d-block w-100" alt="First slide"/>
                        </picture>
                    </Carousel.Item>
					
                    <Carousel.Item>
                        <picture>
                            <source media="(min-width: 768px)" srcSet={carousel_2} />
                            <img src={carousel_5} className="d-block w-100" alt="Second slide"/>
                        </picture>
                    </Carousel.Item>
					
                    <Carousel.Item>
                        <picture>
                            <source media="(min-width: 768px)" srcSet={carousel_3} />
                            <img src={carousel_6} className="d-block w-100" alt="Third slide"/>
                        </picture>
                    </Carousel.Item>
                </Carousel>
            </section>
        </>
    );

}