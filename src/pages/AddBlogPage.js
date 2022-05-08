//React Components
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//CSS 
import '../css/style.css';



export default function AddBlogPage()
{
    const [title, setTitle] = useState();
    const [content, setContent] = useState([]);
    const [user, setUser] = useState();

    const [showMessage, setShowMessage] = useState(false);
    const [toxicityCheck, setToxicityCheck] = useState("default");


    //to navigate back to a specified page
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Hardwaredeck | Add blog";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        //check if user has logged in
        const getUser = localStorage.getItem('user');
        if(getUser)
        {
            const loggedInUser = JSON.parse(getUser);
            setUser(loggedInUser);
        }
        else
        {
            //redirect
            navigate('/');
        }
    }, [navigate]);




    //onchange to the toxicity check
    useEffect(() => {
        const submit = document.getElementById('submit');

        if(toxicityCheck === true)
        {
            setShowMessage(true);
            submit.disabled = true;
        }
        else if(toxicityCheck === "default")
        {
            setShowMessage(false);
            submit.disabled = true;
        }
        else
        {
            setShowMessage(false);
            submit.disabled = false;
        }
    }, [toxicityCheck]);






    //on change to the blog content
    useEffect(() => {
        setToxicityCheck("default");
    }, [content]);





    //add new blog to the database
    async function addNewBlog(event)
    {
        event.preventDefault();

        if(!toxicityCheck)
        {
            setShowMessage(false);
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const fullDate = day + '/' + month + '/' + year;

            document.getElementById("confirmMessage").innerHTML = "Blog posted, please wait 5 seconds";

            //after 5 seconds before redirect
            setTimeout(() => navigate('/blogs'), 5000);
        }
    }


    //import tensorflow toxicity
    const toxicity = require('@tensorflow-models/toxicity');
    //checks the toxicity of the blogs content
    function checkForToxicity()
    {
        //Tensorflow toxicity
        // The minimum prediction confidence.
        const threshold = 0.9;

        //setToxicityCheck("default");

        // Load the model. Users optionally pass in a threshold and an array of
        // labels to include.
        toxicity.load(threshold).then(model => {
        //const sentences = ['you suck'];

            model.classify(content).then(predictions => {
                // `predictions` is an array of objects, one for each prediction head,
                // that contains the raw probabilities for each input along with the
                // final prediction in `match` (either `true` or `false`).
                // If neither prediction exceeds the threshold, `match` is `null`.

                for(let i=0; i<predictions.length; i++)
                {
                    const match = predictions[i].results[0].match;
                    
                    if(match === true)
                    {
                        setToxicityCheck(true);
                    }
                    else
                    {
                        setToxicityCheck(false);
                    }

                }
            });
        });
    }


    return (
        <>
            <main>
                <h1>Add Blog</h1>
                <section className='addBlog'>
                    <h2>Create new Blog post</h2>

                    <form onSubmit={addNewBlog}>

                        <label>Title</label>
                        <input type='text' onChange={(event) => setTitle(event.target.value)} name='title' required/>
                    
                        <label>Content</label>
                        <textarea type='text' onChange={(event) => setContent(event.target.value)} name='content' required/>

                        {
                            showMessage
                            ?
                            <p style={{color: "red"}}>Innapropriate language</p>
                            :
                            null
                        }

                        <p id='confirmMessage' style={{color: "green"}}></p>

                        <div className='button' onClick={checkForToxicity}>Check contents</div>
                        <input type='submit' id='submit' value='Create blog'/>
                    </form>

                </section>
            </main>
        </>
    );
}