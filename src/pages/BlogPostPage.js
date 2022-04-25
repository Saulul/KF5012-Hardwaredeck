//React Components
import React, { useEffect } from 'react';

//CSS 
import '../css/style.css';

//Page Components





export default function BlogPost()
{

    useEffect(() => {
        document.title = "Hardwaredeck | Blog Post";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.body.classList.remove("stopScroll");
    }, []);

    return (
        <>
            <main>
                <h1>Blog page</h1>
            </main>
        </>
    );
}