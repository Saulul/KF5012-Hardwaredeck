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




export default function CarouselImages()
{
    return (
        <>
            <section className='carouselBorder imageCarousel'>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={carousel_1}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={carousel_2}
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carousel_3}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </section>
        </>
    );

}