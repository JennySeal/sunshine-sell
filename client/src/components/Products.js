import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingProducts, gotProducts, fetchingProductsFailed } from '../slice_reducers/productsSlice';
import { selectProducts } from '../slice_reducers/productsSlice';
import './../styles/products.css';
import {Link} from 'react-router-dom';
import LoadingIcon from './LoadingIcon';
import API_Endpoint from './../config/server';

const axios = require('axios');

  
const Products = () => {

    const productCommand = '/products';
    const dispatch = useDispatch();

    const getProducts = useCallback(() => {
        dispatch(fetchingProducts);
        axios.get(`${API_Endpoint}${productCommand}`).then(data => {
            dispatch(gotProducts(data)) 
          })
          .catch(() => 
          dispatch(fetchingProductsFailed));
        }, [productCommand, dispatch]);
       
      useEffect(() => {
          getProducts()},[getProducts])
      
          const products = useSelector(selectProducts)

   return (
        <div >
            
            {products.isLoading && <LoadingIcon/>}
           
            {(products.data !== undefined) ?
              <div className="productDisplay">
                  {products.data.data.map((product) =>
                    <div key={product.product_id} className="productItemDisplay">
                    <Link to={{
                      pathname: `/products/${product.product_id}`,
                      state: {product},
                    }}>
                    <img src={product.image} alt={product.name} className="productImg" props={product.product_id}/>
                    <h3>{product.name}</h3>
                    <p>{product.cost_per_item}</p></Link>
            </div>)}</div> : <h3 id="LoadingIcon">It's worth waiting for!</h3>}
              
      </div>
    )
}

export default Products
