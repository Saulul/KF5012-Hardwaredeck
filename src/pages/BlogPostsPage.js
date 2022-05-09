//React Components
import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';

import axios from 'axios';

//CSS 
import '../css/style.css';

//Page Components
import BlogPost from '../components/BlogPost';
import Loader from '../components/Loader';
import SortBy from '../components/BlogFilter';



export default function BlogPostList() 
{
    const [user, setUser] = useState();
    const [page, setPage] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [sortBy, setSortBy] = useState('ascend');


    //Upon page render
    useEffect(() => {
        document.title = "Hardwaredeck | Blog posts";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;


        //fetch products product
        axios.get('http://localhost:1337/api/blogposts?populate=*')
        .then(res => {
            console.log(res.data.data);
            setBlogs(res.data.data);
        })





        //check if user has logged in
        const getUser = localStorage.getItem('user');
        if(getUser)
        {
            const loggedInUser = JSON.parse(getUser);
            setUser(loggedInUser);
        }
    }, []);




    //page number changes go back to top of the screen
    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [page]);




    //Sort products alphabetically and by price and return the array
    function sortBlogs()
    {
        switch(sortBy)
        {
            case 'descend':
                blogs.sort((a, b) => {
                    let na = a.attributes.BlogTitle.toLowerCase()
                    let nb = b.attributes.BlogTitle.toLowerCase()

                    return na > nb ? -1 : na < nb ? 1 : 0
                });
                return blogs;

            case 'newest':
                blogs.sort((a, b) => {
                    a = a.attributes.publishedAt.slice(0, 10).split('-').join('');
                    b = b.attributes.publishedAt.slice(0, 10).split('-').join('');
                    return a < b ? 1 : a > b ? -1 : 0;
                });
                return blogs;

            case 'oldest':
                blogs.sort((a, b) => {
                    a = a.attributes.publishedAt.slice(0, 10).split('-').join('');
                    b = b.attributes.publishedAt.slice(0, 10).split('-').join('');
                    return a > b ? 1 : a < b ? -1 : 0;
                });
                return blogs;

            default:
                blogs.sort((a, b) => {
                    let na = a.attributes.BlogTitle.toLowerCase()
                    let nb = b.attributes.BlogTitle.toLowerCase()

                    return na < nb ? -1 : na > nb ? 1 : 0
                });
                return blogs;
        }
    }


    //number of products per screen
    const blogsPerPage = 10;

    let totalPages;
    //Slice products array to display only a select few on screen
    function pagination()
    {
        const sortedBlogs = sortBlogs();
        const numberOfRecordsVisited = page * blogsPerPage;

        //will get the records to be display on screen
        const displayProducts = sortedBlogs.slice(numberOfRecordsVisited, numberOfRecordsVisited + blogsPerPage);

        //calculate the total number of pages
        totalPages = Math.ceil(sortedBlogs.length / blogsPerPage);

        return displayProducts;
    }



    //change the page number
    function changePage({selected})
    {
        setPage(selected);
    }





    return (
        <>
            <main>
                <h1>Blogs</h1>
                <section className='blogsSection'>
                    <SortBy setSortBy={setSortBy} user={user}/>
                    <div className='itemContainer'>
                        {
                            blogs
                            ?
                            pagination().map(blog => {
                                return <BlogPost blog={blog} key={blog.id}/>
                            })
                            :
                            <Loader/>
                        }
                    </div>
                </section>

                {
                    totalPages > 1
                    ?
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={totalPages}
                        onPageChange={changePage}

                        containerClassName={"navigationButtons"}
                        previousLinkClassName={"previousButton"}
                        nextLinkClassName={"nextButton"}
                        disabledClassName={"navigationDisabled"}
                        activeClassName={"navigationActive"}
                    />
                    :
                    null
                }
            </main>
        </>
    );
}