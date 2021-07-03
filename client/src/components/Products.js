import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingProducts, gotProducts, fetchingProductsFailed } from '../slice_reducers/productsSlice';
import { selectProducts } from '../slice_reducers/productsSlice';
import './../styles/products.css';
import {Link} from 'react-router-dom';

const axios = require('axios');


const API_Endpoint = 'http://localhost:5500'
  
const Products = () => {

    const [productCommand, setProductCommand] = useState('/products');
    const [urlForAxios, setUrlForAxios] = useState(`${API_Endpoint}${productCommand}`);
    const dispatch = useDispatch();

    const getProducts = useCallback(() => {
        dispatch(fetchingProducts);
        axios.get(urlForAxios).then(data => {
            dispatch(gotProducts(data)) 
          })
          .catch(() => 
          dispatch(fetchingProductsFailed));
        }, [urlForAxios, dispatch]);
       
      useEffect(() => {
          getProducts()},[getProducts])
      
          const products = useSelector(selectProducts)
          console.log(products);






   return (
        <div >
            
            {products.isLoading && <h3>Loading, loading....</h3>}
           
            {(products.data !== undefined) ?
             <div className="productDisplay">{products.data.data.map((product) =>
            <div key={product.product_id} className="productItemDisplay">
            <Link to={`/${product.product_id}`}> 
                        <p><img src={product.image} alt={product.name} className="productImg"/></p>
            <h3>{product.name}</h3>
              <h4>{product.cost_per_item}</h4></Link>
            </div>)}</div> : <h3>Nothing to buy</h3>}
              
      </div>
    )
}

export default Products
