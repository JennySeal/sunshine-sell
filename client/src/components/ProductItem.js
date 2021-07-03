import React from 'react'
import {useParams} from 'react-router-dom';
import {useSelector } from 'react-redux';
import { selectProducts } from '../slice_reducers/productsSlice';


const ProductItem = (id) => {
    const product_no = useParams();
    product_no.id--;
    console.log(product_no);

    const products = useSelector(selectProducts)
    const productSelected = products.data.data[product_no.id];
    console.log(products)

    return (
        <div>
        {(products.data !== undefined) ?
            <div id="productContainer">  
            <div id="productText">                    
            <h3>{productSelected.name}</h3><br/>
            <h4>{productSelected.description}</h4><br/>
            
            <h4>{productSelected.cost_per_item} <br/>Items in stock: {productSelected.items_in_stock}</h4><br/>            
            <label>Quantity<input type="number" placeholder="1" min="1" max={productSelected.items_in_stock}/></label>
            <button>Add to Cart</button></div>            
            <img src={productSelected.image} alt={productSelected.name} className="productImg"/>
            </div>
            : <p>nothing</p>}
            
        </div>
    )
}

export default ProductItem;