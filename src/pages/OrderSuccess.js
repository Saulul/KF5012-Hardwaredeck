//React Components
import React, { useEffect } from 'react';

//CSS
import '../css/style.css';

export default function OrderSuccess()
{

    useEffect(() => {
        document.title = "Hardwaredeck | Payment Success";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    return (
        <>
            <main>
                <h1 style={{display: "none"}}>Order Success</h1>

            </main>
        </>
    );
}
