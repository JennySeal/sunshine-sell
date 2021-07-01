import React from 'react'
const axios = require('axios');



const Products = () => {

   async function getProducts() {
       let res = await axios.get('http://localhost:5500/products');
       let data = res.data;
        console.log(data);
   };

   getProducts();
    return (
        <div>
            Hello here are the things to buy
        </div>
    )
}

export default Products
