//React Components
import React, {useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import axios from 'axios';

//CSS 
import '../css/style.css';

//Page Components
import Product from '../components/Product';
import Loader from '../components/Loader';
import ProductFilter from '../components/ProductFilter';





export default function ProductList() 
{
    const [user, setUser] = useState();
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState('ascend');


    //Upon page render
    useEffect(() => {
        document.title = "Hardwaredeck | Shop";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;


        //fetch products product
        axios.get('http://localhost:1337/api/products?populate=*')
        .then(res => {
            setProducts(res.data.data);
        })


        //check if user has logged in
        const getUser = localStorage.getItem('user');
        if(getUser)
        {
            const loggedInUser = JSON.parse(getUser);
            setUser(loggedInUser);
        }

        //check if cart is not empty
        const getCart = localStorage.getItem('cart');
        if(getCart)
        {
            const storedCart = JSON.parse(getCart);
            setCartItems(storedCart);
        }
    }, []);




    //check to see if the category has changed
    useEffect(() => {
        setPage(0);
    }, [category]);






    //retrieve the category from the url
    const {catName} = useParams();
    //Upon update of catName
    //check if data is passed over the URL
    useEffect(() => {
        if(catName !== undefined)
        {
            const catSplit = catName.split('_');
            let newCategory = catSplit[0];
            
            if(catSplit.length > 1)
            {
                for(let i=1; i<catSplit.length; i++)
                {
                    newCategory += ' ';
                    newCategory += catSplit[i];
                }
            }

            setCategory(newCategory);
        }
        else
        {
            setCategory(catName);
        }
    }, [catName]);



    //retrieve passed state data
    const location = useLocation();
    useEffect(() => {
        setCategories(location.state);
    }, [location]);



    //When the cart get updated store it in localstorage
    useEffect(() => {
        if(user)
        {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems, user]);



    
    //page number changes go back to top of the screen
    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [page]);



    //Add products to cart function
    function addProductsToCart(productID)
    {
        const item = cartItems.find(item => item.id === productID);
        if(item)
        {
            item.quantity = item.quantity + 1;
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
        else
        {
            const product = products.find(product => product.id === productID);
            product.quantity = 1;
            setCartItems(existingCartItems => {
                return [...existingCartItems, product];
            });
        }
    }



    //Filter products based on category passed over URL
    function filterProducts()
    {
        sortProducts();

        if(category === undefined || category === 'All')
        {
            return products;
        }
        else
        {
            return products.filter(product => product.attributes.site_category.data.attributes.CategoryName === category);
        }
    }

    //order products
    function sortProducts()
    {
        switch(sortBy)
        {
            case 'descend':
                products.sort((a, b) => {
                    let na = a.attributes.ProductName.toLowerCase()
                    let nb = b.attributes.ProductName.toLowerCase()

                    if(na > nb)
                    {
                        return -1;
                    }
                    if(na < nb)
                    {
                        return 1;
                    }
                    return 0;
                });
                break;

            case 'hPrice':
                products.sort((a, b) => {
                    return b.attributes.ProductPrice - a.attributes.ProductPrice;
                });
                break;

            case 'lPrice':
                products.sort((a, b) => {
                    return a.attributes.ProductPrice - b.attributes.ProductPrice;
                });
                break;

            default:
                products.sort((a, b) => {
                    let na = a.attributes.ProductName.toLowerCase()
                    let nb = b.attributes.ProductName.toLowerCase()

                    if(na < nb)
                    {
                        return -1;
                    }
                    if(na > nb)
                    {
                        return 1;
                    }
                    return 0;
                });
        }
    }


    //number of products per screen
    const productsPerPage = 10;

    let totalPages;
    //Slice products array to display only a select few on screen
    function pagination()
    {
        const filteredProducts = filterProducts();
        const numberOfRecordsVisited = page * productsPerPage;

        //will get the records to be display on screen
        const displayProducts = filteredProducts.slice(numberOfRecordsVisited, numberOfRecordsVisited + productsPerPage);

        //calculate the total number of pages
        totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
                <h1 style={{display: "none"}}>Shop</h1>
                <section className='productsSection'>
                    {
                        category === undefined || category === 'All'
                        ?
                        <h2>All Products</h2>
                        :
                        <h2>{category}</h2>
                    }
                    <p><i>{filterProducts().length} Products found</i></p>
                    <ProductFilter setSortBy={setSortBy} categories={categories} setCategory={setCategory}/>
                    <div className='itemContainer'>
                        {
                            products
                            ?
                            pagination().map(product => {
                                return <Product product={product} addProductsToCart={addProductsToCart} user={user} key={product.id}/>
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